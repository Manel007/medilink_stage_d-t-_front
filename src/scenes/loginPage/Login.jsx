import React, { useState } from 'react';
import { Box, TextField, useTheme, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { Formik } from 'formik';
import { setLogin } from 'state';
import { Spin, notification } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Login = () => {
    const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMFAInput, setShowMFAInput] = useState(false);
  const [data, setData] = useState({ email: '', password: '', mfaCode: '' });

  const apiUrl = process.env.REACT_APP_API_URL;

  const initialValuesLogin = { email: '', password: '' };

  const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().required('Required'),
  });

  const handleFormSubmit = async (values, onSubmitProps) => {
    setLoading(true);
    try {
      const loggedInResponse = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!loggedInResponse.ok) {
        throw new Error('Login failed');
      }

      const loggedIn = await loggedInResponse.json();

      onSubmitProps.resetForm();
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate('/home');
        notification.success({
          message: 'Welcome',
          description: 'You have successfully logged in',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Please verify your credentials',
        });
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      notification.error({
        message: 'Error',
        description: 'Login failed',
      });
    } finally {
      setLoading(false);
    }
  };

  const loginUserMFA = async () => {
    try {
      const response = await axios.post(`${apiUrl}/send-mfacode`, { email: data.email, password: data.password });
      toast.success('You have received your verification code. Check your email');
      setShowMFAInput(true);
      console.log('Code sent', response.data.mfaCode);
    } catch (error) {
      console.error('Error sending MFA code:', error.response.data);
      if (error.response.status === 401) {
        toast.error('Email or password is incorrect.');
      } else if (error.response?.status === 403) {
        toast.error('User is rejected and cannot log in');
      } else {
        toast.error('Email or password is incorrect');
      }
    }
  };

  const signinwithMFA = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/login-with-mfa`, data);

      if (!response.data) {
        throw new Error('Login failed');
      }

      const loggedIn = response.data;

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate('/home');
        notification.success({
          message: 'Welcome',
          description: 'You have successfully logged in',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'Invalid MFA code',
        });
      }
    } catch (error) {
      console.error('Error during MFA login:', error.message);
      notification.error({
        message: 'Error',
        description: 'Login failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValuesLogin}
        validationSchema={loginSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            >
              <TextField
                label='Email'
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setData({ ...data, email: e.target.value });
                }}
                value={values.email}
                name='email'
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                label='Password'
                type='password'
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  setData({ ...data, password: e.target.value });
                }}
                value={values.password}
                name='password'
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: 'span 4' }}
              />
            </Box>
    <Button
              fullWidth
              type='submit'
              disabled={loading}
              sx={{
                m: '2rem 0',
                p: '1rem',
              backgroundColor: palette.primary.main,
                color: palette.background.alt,
                '&:hover': { color: palette.primary.main },
                position: 'relative',
              }}
            >
              {loading ? <Spin /> : 'Login'}
            </Button>  
          </form>
        )}
      </Formik>
      <Button
        fullWidth
        onClick={loginUserMFA}
        sx={{
          m: '2rem 0',
          p: '1rem',
          backgroundColor: '#0000FF',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#808080',
            color: '#FFFFFF',
          },
        }}
      >
        Sign In with Email Verification
      </Button>
      



      {showMFAInput && (
        <Box display='grid' gap='30px'>
          <Typography variant="small" color="blue-gray" className="font-medium">
            Enter verification code
          </Typography>
          <TextField
            label='MFA Code'
            size="lg"
            type="text"
            placeholder="Enter MFA Code"
            maxLength={6}
            value={data.mfaCode}
            onChange={(e) => setData({ ...data, mfaCode: e.target.value })}
          />
           <Button
            fullWidth
            onClick={signinwithMFA}
            sx={{
              m: '2rem 0',
              p: '1rem',
              backgroundColor: '#0000FF',
              color: '#FFFFFF',
              '&:hover': {
                backgroundColor: '#808080',
                color: '#FFFFFF',
              },
            }}
          >
            Verify Code to Proceed
          </Button>
        </Box>
      )}














      <ToastContainer />
    </Box>
  );
};

export default Login;
