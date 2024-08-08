/*import React, { useState, useEffect } from "react";
import { Box, Button, Typography, useMediaQuery, IconButton, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import FilePresentIcon from '@mui/icons-material/FilePresent';

const DossierMedicale = ({ userId }) => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const apiUrl = process.env.REACT_APP_API_URL;
  const [medicalRecord, setMedicalRecord] = useState(null); // State to store the medical record
  const [uploadTime, setUploadTime] = useState(""); // State to store the upload time

  useEffect(() => {
    const fetchMedicalRecord = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dm/dossierMedical/${userId}`, {
          responseType: 'blob', // Important to handle file response
        });
        setMedicalRecord(response.data);
        // Assuming the API response includes the upload time
        const uploadedAt = response.headers['upload-time'];
        setUploadTime(uploadedAt);
      } catch (error) {
        console.error("Error fetching medical record:", error.message);
      }
    };

    fetchMedicalRecord();
  }, [userId, apiUrl]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("dossierMedical", file);

    try {
      const response = await axios.post(`${apiUrl}/dm/uploadMedicalRecord/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setOpenSnackbar(true);
      setFile(null); // Clear the selected file

      // Fetch the updated medical record
      const updatedResponse = await axios.get(`${apiUrl}/dm/dossierMedical/${userId}`, {
        responseType: 'blob', // Important to handle file response
      });
      setMedicalRecord(updatedResponse.data);
      const uploadedAt = updatedResponse.headers['upload-time'];
      setUploadTime(uploadedAt);
    } catch (error) {
      setMessage("Failed to upload medical record");
      setOpenSnackbar(true);
      console.error("Error:", error.message);
    }
  };

  const downloadMedicalRecord = () => {
    const url = window.URL.createObjectURL(medicalRecord);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical_record.pdf'; // You can set the default file name here
    a.click();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4">Upload Medical Record</Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={message.includes("successfully") ? "success" : "error"} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
      {medicalRecord && (
        <Box mt={2} textAlign="center">
          <Typography variant="h6">Uploaded Medical Record:</Typography>
          <IconButton color="primary" onClick={downloadMedicalRecord} sx={{ fontSize: '5rem' }}>
            <FilePresentIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body2">{uploadTime}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DossierMedicale;










*/



/*import React, { useState, useEffect } from "react";
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Box, Button, Typography, useMediaQuery, IconButton, Snackbar } from "@mui/material";

const DossierMedicale = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const apiUrl = process.env.REACT_APP_API_URL;
  const [medicalRecordsAvailable, setMedicalRecordsAvailable] = useState(false); // Track if there are medical records available

  useEffect(() => {
    const checkMedicalRecords = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dm/dossierMedical/${userId}`, {
          responseType: 'blob' // Expecting a file (ZIP) as a response
        });
        setMedicalRecordsAvailable(true); // If request is successful, records are available
      } catch (error) {
        console.error("Error checking medical records:", error.message);
        setMedicalRecordsAvailable(false);
      }
    };

    checkMedicalRecords();
  }, [userId, apiUrl]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select files to upload");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("dossierMedical", files[i]);
    }

    try {
      const response = await axios.post(`${apiUrl}/dm/uploadMedicalRecords/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setOpenSnackbar(true);
      setFiles([]); // Clear the selected files

      // Check if medical records are available after upload
      setMedicalRecordsAvailable(true);
    } catch (error) {
      setMessage("Failed to upload medical records");
      setOpenSnackbar(true);
      console.error("Error:", error.message);
    }
  };

  const downloadMedicalRecords = async () => {
    try {
      const response = await axios.get(`${apiUrl}/dm/dossierMedical/${userId}`, {
        responseType: 'blob' // Expecting a ZIP file
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'medical_records.zip'; // Set the ZIP file name
      a.click();
      window.URL.revokeObjectURL(url); // Clean up URL.createObjectURL
    } catch (error) {
      setMessage("Failed to download medical records");
      setOpenSnackbar(true);
      console.error("Error downloading medical records:", error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4">Upload Medical Records</Typography>
      <input type="file" multiple onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={message.includes("successfully") ? "success" : "error"} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
      {medicalRecordsAvailable && (
        <Box mt={2} textAlign="center">
          <Typography variant="h6">Download Medical Records:</Typography>
          <IconButton color="primary" onClick={downloadMedicalRecords} sx={{ fontSize: '3rem' }}>
            <FilePresentIcon fontSize="inherit" />
          </IconButton>
          <Typography variant="body2">Click the icon to download your medical records as a ZIP file.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default DossierMedicale;
*/





import React, { useState, useEffect } from "react";
import MuiAlert from '@mui/material/Alert';
import axios from "axios";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { Box, Button, Typography, useMediaQuery, IconButton, Snackbar } from "@mui/material";

const DossierMedicale = ({ userId }) => {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchMedicalRecords = async () => {
      try {
        const response = await axios.get(`${apiUrl}/dm/dossierMedical/${userId}`);
        setFiles(response.data.files);
      } catch (error) {
        console.error("Error fetching medical records:", error.message);
      }
    };

    fetchMedicalRecords();
  }, [userId, apiUrl]);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select files to upload");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("dossierMedical", files[i]);
    }

    try {
      const response = await axios.post(`${apiUrl}/dm/uploadMedicalRecords/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setOpenSnackbar(true);

      // Fetch updated file list
      const updatedResponse = await axios.get(`${apiUrl}/dm/dossierMedical/${userId}`);
      setFiles(updatedResponse.data.files);
    } catch (error) {
      setMessage("Failed to upload medical records");
      setOpenSnackbar(true);
      console.error("Error:", error.message);
    }
  };

  const downloadFile = async (filename) => {
    try {
      const response = await axios.get(`${apiUrl}/dm/downloadMedicalRecord/${userId}/${filename}`, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setMessage("Failed to download file");
      setOpenSnackbar(true);
      console.error("Error downloading file:", error.message);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography variant="h4">Upload Medical Records</Typography>
      <input type="file" multiple onChange={handleFileChange} />
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <MuiAlert onClose={handleCloseSnackbar} severity={message.includes("successfully") ? "success" : "error"} sx={{ width: '100%' }}>
          {message}
        </MuiAlert>
      </Snackbar>
      {files.length > 0 && (
        <Box mt={2}>
          <Typography variant="h6">Uploaded Medical Records:</Typography>
          {files.map((file, index) => (
            <Box key={index} textAlign="center" mb={2}>
              <IconButton color="primary" onClick={() => downloadFile(file.filename)} sx={{ fontSize: '3rem' }}>
                <FilePresentIcon fontSize="inherit" />
              </IconButton>
              <Typography variant="body2">{file.filename}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DossierMedicale;
