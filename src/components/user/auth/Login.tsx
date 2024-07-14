import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import login from "../../../assets/login.jpg"
import logo from "../../../assets/logoclimbr.png"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { endpoints } from '../../../endpoints/userEndpoint';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints'
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { loginData } from '../../../Redux/slice/UserSlice';
import { useSelector } from 'react-redux';
import { userAxios, recruiterAxios } from '../../../utils/Config';
import socket from '../../../utils/socket/Socket';

type FormValues = {
  email: string;
  password: string;
  isRecruiter: boolean
}

function Login() {
  const form = useForm<FormValues>()
  const clientId = '965214593163-kk7v57ub0b6r1up0ee3ve5cl8raaiu6j.apps.googleusercontent.com'
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, setError } = form
  const [isRecruiter, setIsRecruiter] = useState(false);
  const { errors } = formState
  const onsubmit = async (data: FormValues) => {
    console.log('sr');
    console.log(data);
    try {
      let response: any
      if (isRecruiter == false) {
        response = await userAxios.post(endpoints.login, data);
        console.log('User login:', response.data, response);
      } else {
        response = await recruiterAxios.post(recruiterendpoints.login, data);
        console.log('Usewwr login:', response.data, response);
      }
      if (response.data.success && isRecruiter == false && response.data.isAdmin == false) {
        dispatch(loginData(response.data.user))
        socket.emit('join', response.data.user._id);
        console.log('emitted socket join');
        navigate('/home')
      } else if (response.data.success && isRecruiter == true) {
        dispatch(loginData(response.data.user))
        socket.emit('join', response.data.user._id);
        navigate('/recruiter/home')
      } else if (response.data.success && isRecruiter == false && response.data.isAdmin) {
        dispatch(loginData(response.data.user))
        navigate('/admin/dashboard')

      }
      else {
        setError("email", {
          type: "manual",
          message: "Invalid Credentials"
        });
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const { credential } = credentialResponse;
    try {
      const response = await userAxios.post("/google-login", {
        credential,
      });
      if (response) {
        console.log(response, '----------------------');
        dispatch(loginData(response.data.user))
        navigate("/home");
      } else {
        console.error("Failed to store user data in the database.");
      }
    } catch (error) {
      console.error("Error while processing Google login:", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <style>
        {`
          body {
            background-color: #e5e5e5;
          }
        `}

      </style>

      <div className='flex justify-center align-middle bg-white border-[2px] border-solid rounded-[10px] m-[40px] '>
        <div className='image-container w-[50%] flex-1 '>
          <img src={login} alt="signup" className="w-[650px] h-[650px] object-contain" />
        </div>
        <div className='w-[50%] flex-1 p-[2px] flex flex-col justify-center items-center '>
          < img src={logo} alt="" className="mx-auto w-52 " />
          <Typography variant='h4'>Welcome Backk</Typography>

          <form onSubmit={handleSubmit(onsubmit)} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
            <p className="error-message">{errors.email?.message}</p>
            <TextField
              label="E-mail"
              variant="outlined"
              margin="normal"
              size="small"
              color="secondary"
              className='w-[280px]'
              {...register('email', {
                required: "E-Mail is Required"
              })}
            />

            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              size="small"
              color="secondary"
              className='w-[280px]'
              {...register('password', {
                required: "Password is Required",
              })}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={isRecruiter}
                  onChange={(e) => setIsRecruiter(e.target.checked)}
                  name="isRecruiter"
                  color="primary"
                />
              }
              label="I am a recruiter"
            />
            <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '5px', marginTop: '10px' }} className='w-[300px]' >
              Login
            </Button>
          </form>
          <Typography variant="body2" className='m-3' style={{ marginBottom: '10px' }}>
            <Link to="/email" style={{ marginLeft: '180px' }}>Forgot password?</Link>
          </Typography>


          <Typography variant="body1" className='m-3' style={{ marginBottom: '10px' }}>
            Create an Account?
            <Link to="/register" style={{ marginLeft: '5px' }}>Signup</Link>
          </Typography>
          <GoogleOAuthProvider clientId={clientId}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>
    </div >

  );
}

export default Login;
