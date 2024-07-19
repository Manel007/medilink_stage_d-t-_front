import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, Card } from "@mui/material";
import axios from "axios";
import general from "./images_doctors/general.jpg";
import cardiologist from "./images_doctors/cardiologist.jpg";
import dentist from "./images_doctors/dentist.jpg";
import neurologist from "./images_doctors/neurologist.jpg";
import pediatrician from "./images_doctors/pediatrician.jpg";
import Calendar from "./Interview"; // Assuming Calendar is another component

const Doctors = ({ token, userId }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationData, setConsultationData] = useState({
    IdMedecin: "",
    IdPatient: userId,
    DateConsultation: "",
    NomMedecin: "",
    description: "",
    Speciality: "",
  });
  const [searchCriteria, setSearchCriteria] = useState({
    specialite: "",
    adresse: "",
    gouvernorat: "",
    disponibilite: "",
    Name: "" // Add name to search criteria
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/schedule/medecins`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, [apiUrl]);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.get(`${apiUrl}/schedule/search`, {
          params: searchCriteria
        });
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors based on criteria:", error);
      }
    };

    handleSearch();
  }, [searchCriteria, apiUrl]);

  const handleScheduleClick = (doctor) => {
    setSelectedDoctor(doctor);
    setConsultationData({
      ...consultationData,
      IdMedecin: doctor._id,
      NomMedecin: doctor.Name, // Assurez-vous que l'objet doctor a une propriété Name
      Speciality: doctor.specialite,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConsultationData({
      ...consultationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/schedule/consultation`, consultationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Consultation created successfully");
      // Reset form
      setConsultationData({
        IdMedecin: "",
        IdPatient: userId,
        DateConsultation: "",
        NomMedecin: "",
        description: "",
        Speciality: "",
      });
      setSelectedDoctor(null);
    } catch (error) {
      console.error("Error creating consultation:", error);
      alert("Failed to create consultation");
    }
  };

  const handleClearCriteria = () => {
    setSearchCriteria({
      specialite: "",
      adresse: "",
      gouvernorat: "",
      disponibilite: "",
      Name: "" // Reset the name criteria
    });
  };

  const doctorImages = [
    { src: general, speciality: "General" },
    { src: cardiologist, speciality: "Cardiologist" },
    { src: dentist, speciality: "Dentist" },
    { src: neurologist, speciality: "Neurologist" },
    { src: pediatrician, speciality: "Pediatrician" },
  ];

  return (
    <>
      <Box textAlign="center" mt={4}>
        <Typography variant="h4">TOP SPECIALITIES</Typography>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap">
        {doctorImages.map((doctor) => (
          <Box
            key={doctor.speciality}
            textAlign="center"
            m={2}
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "30%",
              "&:hover img": {
                transform: "scale(1.1)",
                transition: "transform 0.3s ease-in-out",
              },
            }}
          >
            <img
              src={doctor.src}
              alt={doctor.speciality}
              style={{ width: "150px", height: "150px", borderRadius: "20%" }}
              onClick={() => setSearchCriteria({ ...searchCriteria, specialite: doctor.speciality })}
            />
            <Typography variant="body1">{doctor.speciality}</Typography>
          </Box>
        ))}
      </Box>

      <Box className="container mx-auto pt-8 flex">
      <div className="w-1/4 pr-4">
          <Card shadow="xl" className="p-4 bg-gray-50">
            <div className="mb-4">
              <Typography variant="title" color="gray">Search Filters:</Typography>
              <div className="flex flex-wrap mt-2">
                {Object.entries(searchCriteria).map(([key, value]) => {
                  if (value) {
                    return (
                      <span
                        key={key}
                        className="inline-block text-gray-800 rounded-full px-3 py-1 text-sm font-semibold cursor-pointer my-4"
                        style={{ backgroundColor: "#B0E0E6" }}
                        onClick={() => setSearchCriteria({ ...searchCriteria, [key]: "" })}
                      >
                        {value} &times;
                      </span>
                    );
                  }
                  return null;
                })}
              </div>
              <Button className="mt-2 bg-gray-500" title="Clear Filters" onClick={handleClearCriteria}>
                Clear
              </Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
  <div className="mb-4" style={{ flex: '1 1 20%' }}>
    <Typography variant="paragraph" color="gray">Name:</Typography>
    <TextField
      type="text"
      placeholder="Name"
      value={searchCriteria.Name}
      onChange={(e) => setSearchCriteria({ ...searchCriteria, Name: e.target.value })}
      fullWidth
    />
  </div>
  <div className="mb-4" style={{ flex: '1 1 20%' }}>
    <Typography variant="paragraph" color="gray">Speciality:</Typography>
    <TextField
      type="text"
      placeholder="Speciality"
      value={searchCriteria.specialite}
      onChange={(e) => setSearchCriteria({ ...searchCriteria, specialite: e.target.value })}
      fullWidth
    />
  </div>
  <div className="mb-4" style={{ flex: '1 1 20%' }}>
    <Typography variant="paragraph" color="gray">Address:</Typography>
    <TextField
      type="text"
      placeholder="Address"
      value={searchCriteria.adresse}
      onChange={(e) => setSearchCriteria({ ...searchCriteria, adresse: e.target.value })}
      fullWidth
    />
  </div>
  <div className="mb-4" style={{ flex: '1 1 20%' }}>
    <Typography variant="paragraph" color="gray">Governorate:</Typography>
    <TextField
      type="text"
      placeholder="Governorate"
      value={searchCriteria.gouvernorat}
      onChange={(e) => setSearchCriteria({ ...searchCriteria, gouvernorat: e.target.value })}
      fullWidth
    />
  </div>
</div>

          </Card>
        </div>
        <div className="w-3/4">
          <Box>
            {doctors.map((doctor) => (
              <Grid container spacing={2} key={doctor._id} mb={5} alignItems="center" sx={{ backgroundColor: '#FFFFFF', p: 2, borderRadius: 8 }}>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" onClick={() => handleScheduleClick(doctor)} fullWidth sx={{ backgroundColor: '#ADD8E6' }}>
                    Schedule
                  </Button>
                </Grid>
                <Grid item xs={12} sm={9} mb={2} sx={{ backgroundColor: '#FFFFFF', p: 2, borderRadius: 8 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {doctor.Name} {doctor.SurName}
                  </Typography>
                  <Typography variant="body1" color="green">
                    Speciality: {doctor.specialite}
                  </Typography>
                  <Typography variant="body1">Address: {doctor.adresse}</Typography>
                  <Typography variant="body1">City: {doctor.ville}</Typography>
                  <Typography variant="body1">Governorate: {doctor.gouvernorat}</Typography>
                  {selectedDoctor && selectedDoctor._id === doctor._id && (
                                 <Box component="form" onSubmit={handleSubmit} mt={2} mb={2} sx={{ backgroundColor: '#FFFFFF', p: 2, borderRadius: 8 }}>
                                 <TextField
                                   label="Date of Consultation"
                                   type="date"
                                   name="DateConsultation"
                                   value={consultationData.DateConsultation}
                                   onChange={handleInputChange}
                                   fullWidth
                                   required
                                   sx={{ mb: 2, backgroundColor: 'lightgray' }}
                                 />
                                 <FormControl fullWidth required sx={{ mb: 2 }}>
                                   <InputLabel id="description-label">Description</InputLabel>
                                   <Select
                                     id="description"
                                     name="description"
                                     value={consultationData.description}
                                     onChange={handleInputChange}
                                     sx={{ backgroundColor: 'lightgray' }}
                                   >
                                     <MenuItem value="Urgent">Urgent</MenuItem>
                                     <MenuItem value="Routine">Routine</MenuItem>
                                     <MenuItem value="Follow-up">Follow-up</MenuItem>
                                     <MenuItem value="Initial">Initial</MenuItem>
                                     <MenuItem value="Check-up">Check-up</MenuItem>
                                     <MenuItem value="Emergency">Emergency</MenuItem>
                                     <MenuItem value="Review">Review</MenuItem>
                                   </Select>
                                 </FormControl>
                                 <Button type="submit" variant="contained" color="error" sx={{ mt: 2 }}>
                                   Confirm
                                 </Button>
                               </Box>
                 
                  )}
                </Grid>
              </Grid>
            ))}
          </Box>
        </div>
        
      <Calendar userId={userId} />

      </Box>
    </>
  );
};

export default Doctors;
