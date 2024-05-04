import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import login from "../../../assets/login.jpg"
import logo from "../../../assets/logo.png"
import google from "../../../assets/google.png"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { endpoints, userAxios } from '../../../endpoints/userEndpoint';
import { GoogleLogin, GoogleOAuthProvider, CredentialResponse } from '@react-oauth/google';


type FormValues = {
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmpassword: string
}

function Login() {
  const form = useForm<FormValues>()
  const clientId = '965214593163-kk7v57ub0b6r1up0ee3ve5cl8raaiu6j.apps.googleusercontent.com'
  const navigate = useNavigate()
  const { register, handleSubmit, formState, setError } = form
  const { errors } = formState
  const onsubmit = async (data: FormValues) => {
    console.log('sr');
    console.log(data);
    try {
      const response = await userAxios.post(endpoints.login, data);
      console.log('User login:', response.data, response);


      if (response.data.success) {
        navigate('/home')
      } else {
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
    console.log('leajdc', credential);
    try {
      const response = await userAxios.post("/google-login", {
        credential,
      });
      console.log('wehfblwe', response);

      if (response) {
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
        <div className='w-[50%] flex-1 p-[2px]  flex flex-col justify-center items-center'>
          <img src={logo} alt="" className="h-36  mx-auto" />
          <Typography variant='h4'>Welcome Back</Typography>

          <form onSubmit={handleSubmit(onsubmit)} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
            <TextField
              label="E-mail"
              variant="outlined"
              margin="normal"
              size="small"
              color="secondary"
              className='w-[300px]'
              {...register('email', {
                required: "E-Mail is Required"
              })}
            />
            <p className="error-message">{errors.email?.message}</p>
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              size="small"
              color="secondary"
              className='w-[300px]'
              {...register('password', {
                required: "Password is Required",
              })}
            />
            <p className="error-message">{errors.password?.message}</p>
            <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }} className='w-[300px]' >
              Login
            </Button>
          </form>
          {/* <Button
            variant="contained"
            color="secondary"
            startIcon={<img src={google} alt="Custom Icon" className='w-4 h-4' />}
            className='w-[300px]'
            style={{ marginBottom: '10px' }}
          >
            Login with Google
          </Button> */}

          <Typography variant="body1" className='m-3' style={{ marginBottom: '20px' }}>
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
    </div>

  );
}

export default Login;
