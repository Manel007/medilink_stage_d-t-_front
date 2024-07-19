import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";
import "./Calendar.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Calendar({ userId }) {
  const [consultations, setConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const modalRef = useRef();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(`${apiUrl}/schedule/consultations/patient/${userId}`);
        setConsultations(response.data);
      } catch (error) {
        console.error("Error fetching consultations:", error);
      }
    };

    fetchConsultations();
  }, [userId]);
console.log("khraaaa",userId)
  const handleEventClick = (clickInfo) => {
    setSelectedConsultation(clickInfo.event);
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

 


  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: "today prev,next",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height="90vh"
          events={consultations.map(consultation => ({
            title: consultation.Speciality, // Display doctor's name as title
            start: consultation.DateConsultation, // Display consultation date
            extendedProps: consultation, // Pass all consultation data as extendedProps
          }))}
          eventClick={handleEventClick}
        />
  
        {selectedConsultation && (
          <dialog className="modal" ref={modalRef}>
            <div className="modal-content">
              <span className="close" onClick={() => modalRef.current.close()}>&times;</span>
              <h2 className="modal-title mb-4">{selectedConsultation.Speciality} appointmemnt</h2>
              <p className="modal-text mb-4">Date: {new Date(selectedConsultation.start).toLocaleString()}</p>
              <p className="modal-text mb-4">Description: {selectedConsultation.extendedProps.description}</p>
              <div className="button-container">
                <button className="modal-button close" onClick={() => modalRef.current.close()}>Close</button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}

export default Calendar;
