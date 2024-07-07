import React, { useState } from 'react';
import { Box, Button, TextField, Typography, useTheme, Select, MenuItem, FormControl, InputLabel,  FormHelperText  } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Spin, notification } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from 'react-router-dom';
import TermsAndConditions from '../widgets/TermsAndConditions'; // Make sure to import your TermsAndConditions component

const PatientForm = ({ handleFormSubmit }) => {
  const { palette } = useTheme();
  const role = "patient";
  const [loading, setLoading] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);


  const groupesSanguins = [
    "A positif (A+)",
    "A négatif (A-)",
    "B positif (B+)",
    "B négatif (B-)",
    "AB positif (AB+)",
    "AB négatif (AB-)",
    "O positif (O+)",
    "O négatif (O-)"
  ];


  const BloodTypeSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
    <FormControl sx={{ gridColumn: "span 2" }} error={Boolean(touched.BloodType) && Boolean(errors.BloodType)}>
      <InputLabel>Groupe sanguin</InputLabel>
      <Select
        label="Groupe sanguin"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.BloodType}
        name="BloodType"
      >
        <MenuItem value="">Sélectionner</MenuItem>
        {groupesSanguins.map((groupe, index) => (
          <MenuItem key={index} value={groupe}>
            {groupe}
          </MenuItem>
        ))}
      </Select>
      {touched.BloodType && errors.BloodType && (
        <FormHelperText>{errors.BloodType}</FormHelperText>
      )}
    </FormControl>
  );

  const genders = ["Female", "Male","Other"];

  const GenderSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
    <FormControl sx={{ gridColumn: "span 2" }} error={Boolean(touched.Gender) && Boolean(errors.Gender)}>
      <InputLabel>Genre</InputLabel>
      <Select
        label="Genre"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.Gender}
        name="Gender"
      >
        <MenuItem value="">Sélectionner</MenuItem>
        {genders.map((gender, index) => (
          <MenuItem key={index} value={gender}>
            {gender}
          </MenuItem>
        ))}
      </Select>
      {touched.Gender && errors.Gender && (
        <FormHelperText>{errors.Gender}</FormHelperText>
      )}
    </FormControl>
  );
{/*  */}
const SmokingStatusSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
  <FormControl sx={{ gridColumn: "span 2" }} error={Boolean(touched.smoking_status) && Boolean(errors.smoking_status)}>
    <InputLabel>Statut de tabagisme</InputLabel>
    <Select
      label="Statut de tabagisme"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.smoking_status}
      name="smoking_status"
    >
      <MenuItem value="">Sélectionner</MenuItem>
      {smoking_statuses.map((status, index) => (
        <MenuItem key={index} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
    {touched.smoking_status && errors.smoking_status && (
      <FormHelperText>{errors.smoking_status}</FormHelperText>
    )}
  </FormControl>
);

const ResidenceTypeSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
  <FormControl sx={{ gridColumn: "span 2" }} error={Boolean(touched.residence_type) && Boolean(errors.residence_type)}>
    <InputLabel>Type de résidence</InputLabel>
    <Select
      label="Type de résidence"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.residence_type}
      name="residence_type"
    >
      <MenuItem value="">Sélectionner</MenuItem>
      {residence_types.map((type, index) => (
        <MenuItem key={index} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
    {touched.residence_type && errors.residence_type && (
      <FormHelperText>{errors.residence_type}</FormHelperText>
    )}
  </FormControl>
);

const WorkTypeSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
  <FormControl sx={{ gridColumn: "span 2" }} error={Boolean(touched.work_type) && Boolean(errors.work_type)}>
    <InputLabel>Type de travail</InputLabel>
    <Select
      label="Type de travail"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.work_type}
      name="work_type"
    >
      <MenuItem value="">Sélectionner</MenuItem>
      {work_types.map((type, index) => (
        <MenuItem key={index} value={type}>
          {type}
        </MenuItem>
      ))}
    </Select>
    {touched.work_type && errors.work_type && (
      <FormHelperText>{errors.work_type}</FormHelperText>
    )}
  </FormControl>
);

const MaritalStatusSelect = ({ values, handleBlur, handleChange, touched, errors }) => (
  <FormControl sx={{ gridColumn: "span 2" }} error={Boolean(touched.marital_status) && Boolean(errors.marital_status)}>
    <InputLabel>État civil</InputLabel>
    <Select
      label="État civil"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.marital_status}
      name="marital_status"
    >
      <MenuItem value="">Sélectionner</MenuItem>
      {marital_statuses.map((status, index) => (
        <MenuItem key={index} value={status}>
          {status}
        </MenuItem>
      ))}
    </Select>
    {touched.marital_status && errors.marital_status && (
      <FormHelperText>{errors.marital_status}</FormHelperText>
    )}
  </FormControl>
);


  const initialValuesRegister = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "patient",
    picture: null,
    PhoneNumber: "",
    Gender: "",
    Height: "",
    Weight: "",
    BloodType: "",
    Address: "",
    Birthdate: "",
    residence_type: "",
    work_type: "",
    marital_status: "",
    cigsPerDay: "",
    Pregnancies: "",
    smoking_status: ""
  };

  const registerSchema = yup.object().shape({
    firstname: yup.string().required("Champ requis"),
    lastname: yup.string().required("Champ requis"),
    email: yup.string().email("Email invalide").required("Champ requis"),
    password: yup.string().required("Champ requis"),
    picture: yup.mixed().required("required"),
    PhoneNumber: yup.string().required("Champ requis"),
    Gender: yup.string().required("Champ requis"),
    Height: yup.string().required("Champ requis"),
    Weight: yup.string().required("Champ requis"),
    BloodType: yup.string().required("Champ requis"),
    Address: yup.string().required("Champ requis"),
    Birthdate: yup.date().required("Champ requis"),
    residence_type: yup.string().required("Champ requis"),
    work_type: yup.string().required("Champ requis"),
    marital_status: yup.string().required("Champ requis"),
    cigsPerDay: yup.number().required("Champ requis"),
    Pregnancies: yup.number().required("Champ requis"),
    smoking_status: yup.string().required("Champ requis"),
  });

  const handleSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("role", role);
    formData.append("picturePath", values.picture.name);
    formData.append("PhoneNumber", values.PhoneNumber);
    formData.append("Gender", values.Gender);
    formData.append("Height", values.Height);
    formData.append("Weight", values.Weight);
    formData.append("BloodType", values.BloodType);
    formData.append("Address", values.Address);
    formData.append("Birthdate", values.Birthdate);

    formData.append("residence_type", values.residence_type);
    formData.append("work_type", values.work_type);
    formData.append("marital_status", values.marital_status);
    formData.append("cigsPerDay", values.cigsPerDay);
    formData.append("Pregnancies", values.Pregnancies);
    formData.append("smoking_status", values.smoking_status);
    await handleFormSubmit(formData, onSubmitProps);
    setLoading(false);
  };



  const residence_types = ["Urban", "Rural"];
  const work_types = ["Private", "Self-employed", "Govt_job", "Never_worked"];
  const marital_statuses = ["married", "Not married"];
  const smoking_statuses = ["formerly smoked", "never smoked", "smokes", "Unknown"];
  return (

    
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Prénom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstname}
              name="firstname"
              error={Boolean(touched.firstname) && Boolean(errors.firstname)}
              helperText={touched.firstname && errors.firstname}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Nom"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastname}
              name="lastname"
              error={Boolean(touched.lastname) && Boolean(errors.lastname)}
              helperText={touched.lastname && errors.lastname}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Mot de passe"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
            <Box gridColumn="span 4">
              <Typography variant="body1" color="textSecondary" gutterBottom>
                Numéro de téléphone
              </Typography>
              <PhoneInput
                country={'tn'}
                placeholder="+216-12 345 6789"
                value={values.PhoneNumber}
                onChange={phoneNumber => setFieldValue('PhoneNumber', phoneNumber)}
                inputProps={{
                  name: 'PhoneNumber',
                  required: true,
                  autoFocus: false
                }}
                containerStyle={{ width: '100%' }}
                inputStyle={{ width: '100%' }}
              />
              {touched.PhoneNumber && Boolean(errors.PhoneNumber) && (
                <Typography color="error" variant="body2">
                  {errors.PhoneNumber}
                </Typography>
              )}
            </Box>
            <GenderSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            {values.Gender === 'Female' && (
              <TextField
                label="Grossesses"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Pregnancies}
                name="Pregnancies"
                error={Boolean(touched.Pregnancies) && Boolean(errors.Pregnancies)}
                helperText={touched.Pregnancies && errors.Pregnancies}
                sx={{ gridColumn: "span 2" }}
              />
            )}
            <TextField
              label="Taille"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Height}
              name="Height"
              error={Boolean(touched.Height) && Boolean(errors.Height)}
              helperText={touched.Height && errors.Height}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Poids"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Weight}
              name="Weight"
              error={Boolean(touched.Weight) && Boolean(errors.Weight)}
              helperText={touched.Weight && errors.Weight}
              sx={{ gridColumn: "span 2" }}
            />
            <BloodTypeSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <TextField
              label="Adresse"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Address}
              name="Address"
              error={Boolean(touched.Address) && Boolean(errors.Address)}
              helperText={touched.Address && errors.Address}
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              label="Date de naissance"
              type="date"
              InputLabelProps={{ shrink: true }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.Birthdate}
              name="Birthdate"
              error={Boolean(touched.Birthdate) && Boolean(errors.Birthdate)}
              helperText={touched.Birthdate && errors.Birthdate}
              sx={{ gridColumn: "span 2" }}
            />
            <ResidenceTypeSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <WorkTypeSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <MaritalStatusSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            <SmokingStatusSelect
              values={values}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
            />
            {values.smoking_status !== "never smoked" && (
              <TextField
                label="Cigarettes par jour"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cigsPerDay}
                name="cigsPerDay"
                error={Boolean(touched.cigsPerDay) && Boolean(errors.cigsPerDay)}
                helperText={touched.cigsPerDay && errors.cigsPerDay}
                sx={{ gridColumn: "span 2" }}
              />
            )}
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
            >
              <Dropzone
                acceptedFiles={['image/jpeg', 'image/jpg', 'image/png']}
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue('picture', acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ '&:hover': { cursor: 'pointer' } }}
                  >
                    <input {...getInputProps()} />
                    {!values.picture ? (
                      <p>Ajouter une photo ici</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picture.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>
          </Box>
          <div className="mb-1 d-flex flex-column gap-3">
            <div className="form-group">
              <label htmlFor="terms" className="d-flex align-items-center">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsChecked}
                  onChange={(e) => setTermsChecked(e.target.checked)}
                  className="form-check-input me-2"
                />
                <small className="text-muted">
                  I accept{' '}
                  <Link
                    to="#"
                    onClick={() => setIsConfirmationOpen(prevState => !prevState)}
                    style={{ textDecoration: 'underline', color: '#007bff' }}
                  >
                    Medilink terms and conditions
                  </Link>
                </small>
              </label>
            </div>
            <TermsAndConditions
              isOpen={isConfirmationOpen}
              onClose={() => setIsConfirmationOpen(false)}
              onConfirm={setIsConfirmationOpen}
            />
            {!termsChecked && (
              <small className="text-danger">
                Please accept Medilink terms and conditions before registering.
              </small>
            )}
          </div>
          <Button
            fullWidth
            type="submit"
            disabled={loading || !termsChecked}
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: palette.primary.main,
              color: palette.background.alt,
              "&:hover": { color: palette.primary.main },
              position: 'relative',
            }}
          >
            {loading ? <Spin /> : "S'INSCRIRE EN TANT QUE PATIENT"}
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default PatientForm;
