import React, { useEffect, useState } from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import MedicalRecordsIcon from '@mui/icons-material/Description';
import DiseaseScreeningIcon from '@mui/icons-material/HealthAndSafety';
import MedicineIcon from '@mui/icons-material/MedicalServices';
import AnalysesRecordsIcon from '@mui/icons-material/Assessment';
import EditIcon from '@mui/icons-material/Edit';
import Dropzone from 'react-dropzone';
import { Formik, Form } from 'formik';
import { Button, Modal } from 'antd';
import { Edit } from '@mui/icons-material';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { apiUrl } from 'index';
import { AiFillPhone } from "react-icons/ai";

const ProfileWidget = ({ user, userId }) => {
  console.log("user from profile widget ", user.role);

  const [upload, setUpload] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false); // State to trigger rerender

  const fullName = `${user.firstname} ${user.lastname}`;
console.log("wawa",userId);
  useEffect(() => {
    // Use this effect to rerender when profileUpdated state changes
    if (profileUpdated) {
      // You can fetch updated user data or perform any necessary actions here
      console.log('Profile updated, rerendering...');
      setProfileUpdated(false); // Reset state after rerender
    }
  }, [profileUpdated]);

  const handleUpdate = async (values) => {
    const formData = new FormData();
    formData.append('picture', values.picture);

    try {
      const response = await fetch(`${apiUrl}/users/${userId}/update`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        setProfileUpdated(true); // Trigger rerender
        setUpload(false);
      } else {
        console.error('Failed to update profile');
        // Handle update failure
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle error
    }
  };

  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`${apiUrl}/patients/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        const data = await response.json();
        setPatientData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatientData();
  }, [userId]); // Déclencher le fetch chaque fois que userId change

  if (loading) {
    return <div>Loading...</div>; // Affichage en cas de chargement
  }
  // Function to format phone number to "216 999 999 99" format
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return phoneNumber; // return original if not matched
  };
  // Function to format birthdate from ISO format to "DD Month YYYY" format
const formatBirthdate = (birthdate) => {
  if (!birthdate) return ''; // Return empty string if birthdate is falsy

  const dateObj = new Date(birthdate); // Create a Date object from the birthdate string

  // List of month names for formatting
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const day = dateObj.getDate(); // Get day of the month
  const monthIndex = dateObj.getMonth(); // Get month index (0-based)
  const year = dateObj.getFullYear(); // Get full year

  // Format the date as "DD Month YYYY"
  return `${day} ${monthNames[monthIndex]} ${year}`;
};

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%' }} />
      <Box
        sx={{
          width: '100%',
          boxShadow: 1,
          p: 2,
          borderRadius: 2,
          marginTop: 1,
          textAlign: 'center',
          backgroundColor: "white"
        }}
      >
        <Avatar
          src={`http://localhost:3005/assets/${user.picturePath}`}
          sx={{ width: 180, height: 180, marginBottom: 2, marginLeft: 6 }}
        />
        <Edit style={{ cursor: 'pointer', color: 'blue', position: "relative", right: "540px", bottom: "40px" }} onClick={() => setUpload(true)} />

        <Typography variant="h1" component="h1" fontSize={30} gutterBottom position="relative" top={"-150px"} textAlign={'center'} right={"300px"}>
       {patientData?.firstname}  {patientData?.lastname}    </Typography>
        <Typography variant="h1" component="h1" fontSize={25} gutterBottom position="relative" top={"-150px"} textAlign={'center'} right={"300px"}>
        <AiFillPhone />  + {formatPhoneNumber(patientData.PhoneNumber)}      </Typography>
        <Typography color="blue-gray"  variant="h1" component="h1" fontSize={30} gutterBottom  sx={{ marginTop: '-70px' }} >
      <b style={{ color: '#778899' }}> Personal informations</b>
      </Typography>
      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Email: {patientData.email}
      </Typography>
    {/*     <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Password: {patientData.password}
      </Typography>
   <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Medical Record: {patientData.dossierMedical}   
      </Typography>*/}

      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Gender: {patientData.Gender}
      </Typography>
      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Height: {patientData.Height} cm
      </Typography>
      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Weight: {patientData.Weight} kg
      </Typography>
      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Blood Type: {patientData.BloodType}
      </Typography>
      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Address: {patientData.Address}
      </Typography>
      <Typography variant="h1" component="h1" fontSize={30} gutterBottom>
        Birthdate: {formatBirthdate(patientData.Birthdate)}
      </Typography>
      </Box>
      {user.role === "patient" &&
        <Box>
          <FlexBetween gap="1rem" mb="0.5rem" position={'absolute'} left={"30%"} alignItems={'center'} color={"black"}>
            <Typography variant="h5" component="h4" gutterBottom>
              <a sx={{ fontSize: "25px", color: "black" }} href="#"><MedicalRecordsIcon /> My Medical records</a>
            </Typography>
            <Typography variant="h5" component="h4" gutterBottom>
              <a sx={{ fontSize: "25px", color: "black" }} href="#"><DiseaseScreeningIcon /> Disease screening</a>
            </Typography>
            <Typography variant="h5" component="h4" gutterBottom>
              <a sx={{ fontSize: "25px", color: "black" }} href="#"><MedicineIcon /> My Medicine</a>
            </Typography>
            <Typography variant="h5" component="h4" gutterBottom>
              <a href="#"><AnalysesRecordsIcon /> My analyses records</a>
            </Typography>
          </FlexBetween>
        </Box>
      }

      <Formik
        initialValues={{ picture: null }}
        onSubmit={handleUpdate}
      >
        {({
          values,
          setFieldValue,
          handleSubmit,
        }) => (
          <Modal
            open={upload}
            onOk={handleSubmit}
            onCancel={() => setUpload(false)}
          >
            <Form>
              <Dropzone
                acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                multiple={false}
                onDrop={(acceptedFiles) => setFieldValue('picture', acceptedFiles[0])}
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed `}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <Button>Importer une photo</Button>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        Importer une photo
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Form>
          </Modal>
        )}
      </Formik>
    </Box>
  );
};

export default ProfileWidget;
