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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ProfileWidget = ({ user, userId }) => {
  console.log("user from profile widget ", user.role);

  const [upload, setUpload] = useState(false);
  const [profileUpdated, setProfileUpdated] = useState(false); // State to trigger rerender
  const [alignment, setAlignment] = useState('personal'); // State for toggling content

  const fullName = `${user.firstname} ${user.lastname}`;
  console.log("wawa", userId);

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

  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
    if (match) {
      return match[1] + ' ' + match[2] + ' ' + match[3] + ' ' + match[4];
    }
    return phoneNumber; // return original if not matched
  };

  const formatBirthdate = (birthdate) => {
    if (!birthdate) return ''; // Return empty string if birthdate is falsy

    const dateObj = new Date(birthdate); // Create a Date object from the birthdate string

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

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  return (
    <>
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
                <Edit  style={{ cursor: 'pointer', color: 'blue', position: "relative", left: "300px", bottom: "15px" }} onClick={() => setUpload(true)} />
          <Avatar
            src={`http://localhost:3005/assets/${user.picturePath}`}
            sx={{ width: 100, height: 100, marginBottom: 6 }}
          /> 
          <Typography variant="h1" component="h1" fontSize={30} gutterBottom position="relative" top={"-120px"} textAlign={'center'} right={"80px"}>
          {patientData?.firstname}  {patientData?.lastname}    </Typography>
          <Box sx={{ display: 'flex', position: 'relative', left: "8px", bottom: "40px" }}>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="Platform"
          >
            <ToggleButton value="personal" sx={{ fontSize: '20px', padding: '10px 20px',bottom: "23px" }}>
              Personal informations
            </ToggleButton>
            <ToggleButton value="biometric" sx={{ fontSize: '20px', padding: '10px 20px',bottom: "23px" }}>
              Biometric informations
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
      {alignment === 'personal' && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              Name:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData?.firstname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              SurName:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData?.lastname}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h1" component="h1" fontSize={30}>
              Phone Number:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={25}>
               + {formatPhoneNumber(patientData.PhoneNumber)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              Email:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData.email}
            </Typography>
          </Box>
          </>
          )}
          {alignment === 'biometric' && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              Height:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData.Height} 
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              Weight:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData.Weight} 
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              Blood Type:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData.BloodType}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" component="h1" fontSize={30}>
              Address:
            </Typography>
            <Typography variant="h1" component="h1" fontSize={30}>
              {patientData.Address}
            </Typography>
          </Box>
            </>
          )}
        </Box>
       
        </Box>

      
{/*
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
        */}
      </Box>
    </>
  );
};

export default ProfileWidget;
