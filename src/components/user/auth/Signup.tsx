import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import signup from "../../../assets/signup.png"
import logo from "../../../assets/logo.png"
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useForm } from 'react-hook-form';
import { endpoints } from '../../../endpoints/userEndpoint';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { userAxios, recruiterAxios } from '../../../utils/Config';

type FormValues = {
  username: string;
  email: string;
  mobile: string;
  password: string;
  confirmpassword: string;
  companyName?: string;
  companyemail?: string;
}

function Signup() {
  const navigate = useNavigate()
  const [isRecruiter, setIsRecruiter] = useState(false);
  const form = useForm<FormValues>()
  const { register, handleSubmit, formState, getValues, setError } = form
  const { errors } = formState;
  const onsubmit = async (data: FormValues) => {
    console.log('sr');
    console.log(data);
    localStorage.setItem('role', 'false');
    try {
      const response = await userAxios.post(endpoints.register, data);
      console.log('User ot sended successfully:', response.data, response);

      if (response.data.success) {
        navigate('/otp')
      } else {
        if (response.data.msg == "email already exist") {
          setError("email", {
            type: "manual",
            message: "Email already exists"
          });
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  const Recruiteronsubmit = async (data: FormValues) => {
    console.log(data, 'kjebs');
    localStorage.setItem('role', 'true');

    try {

      const response = await recruiterAxios.post(recruiterendpoints.register, data)
      console.log('User ot sended successfully:', response.data, response);

      if (response.data.success) {
        sessionStorage.removeItem('otpTimer');
        navigate('/otp')
      } else {
        if (response.data.msg === "email already exist") {
          setError("email", {
            type: "manual",
            message: "Email already exists"
          });
        }
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  }
  const handleToggle = () => {
    setIsRecruiter(!isRecruiter);
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
          <img src={signup} alt="signup" className="w-full h-full object-contain" />
        </div>
        <div className='w-[50%] flex-1 p-[2px]  flex flex-col justify-center items-center'>
          <img src={logo} alt="" className="w-44  mx-auto" />
          <Typography variant='h4'>Create a New Account</Typography>
          <ToggleButtonGroup
            color="primary"
            value={isRecruiter ? 'recruiter' : 'user'}
            exclusive
            onChange={handleToggle}
            aria-label="User or Recruiter"
            className='h-8'
            style={{ borderRadius: '150px' }}
          >
            <ToggleButton value="user">User</ToggleButton>
            <ToggleButton value="recruiter">Recruiter</ToggleButton>
          </ToggleButtonGroup>

          {isRecruiter ? (
            <>
              {/* recruiter */}
              < form onSubmit={handleSubmit(Recruiteronsubmit)} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
                <TextField
                  label="FullName"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('username', {
                    required: "Username is Required",
                    validate: {
                      notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Username cannot consist only of numbers",
                      notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Username cannot consist only of spaces",
                    }
                  })
                  }
                />
                <p className="error-message">{errors.username?.message}</p>
                <TextField
                  label="E-mail"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('email', {
                    required: "E-Mail is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Invalid E-Mail Format",
                    }
                  })}
                />
                <p className="error-message">{errors.email?.message}</p>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('mobile', {
                    required: "Mobile Number is Required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be exactly 10 digits long"
                    }
                  })}
                />
                <p className="error-message">{errors.mobile?.message}</p>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('companyName', {
                    required: "Company Name is Required",
                  })}
                />
                <TextField
                  label="Company E-mail"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('companyemail', {
                    required: " Company E-Mail is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Invalid E-Mail Format",
                    }
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message: "Password must contain at least one letter, one digit, and one special character"
                    },
                    validate: value => !/\s/.test(value) || "Password cannot contain spaces"
                  })}
                />
                <p className="error-message">{errors.password?.message}</p>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('confirmpassword', {
                    required: "Confirm-Password is Required",
                    validate: {
                      matchesPassword: value => value === getValues("password") || "Passwords do not match"
                    }
                  })}
                />
                <p className="error-message">{errors.confirmpassword?.message}</p>
                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }} className='w-[300px]' >
                  Sign Up
                </Button>
              </form>
            </>
          ) : (
            <>
              <form onSubmit={handleSubmit(onsubmit)} style={{ display: 'flex', flexDirection: 'column' }} noValidate>
                <TextField
                  label="FullName"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('username', {
                    required: "Username is Required",
                    validate: {
                      notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Username cannot consist only of numbers",
                      notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Username cannot consist only of spaces",
                    }
                  })
                  }
                />
                <p className="error-message">{errors.username?.message}</p>
                <TextField
                  label="E-mail"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('email', {
                    required: "E-Mail is Required",
                    pattern: {
                      value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                      message: "Invalid E-Mail Format",
                    }
                  })}
                />
                <p className="error-message">{errors.email?.message}</p>
                <TextField
                  label="Mobile"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('mobile', {
                    required: "Mobile Number is Required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Mobile number must be exactly 10 digits long"
                    }
                  })}
                />
                <p className="error-message">{errors.mobile?.message}</p>
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    },
                    pattern: {
                      value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message: "Password must contain at least one letter, one digit, and one special character"
                    },
                    validate: value => !/\s/.test(value) || "Password cannot contain spaces"
                  })}
                />
                <p className="error-message">{errors.password?.message}</p>
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  size="small"
                  color="secondary"
                  className='w-[300px]'
                  {...register('confirmpassword', {
                    required: "Confirm-Password is Required",
                    validate: {
                      matchesPassword: value => value === getValues("password") || "Passwords do not match"
                    }
                  })}
                />
                <p className="error-message">{errors.confirmpassword?.message}</p>

                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }} className='w-[300px]' >
                  Sign Up
                </Button>
              </form>
              <Typography variant="body1" className='m-3' style={{ marginBottom: '20px' }}>
                Already have an account?
                <Link to="/login" style={{ marginLeft: '5px', color: '#1976d2', textDecoration: 'none' }}>Login</Link>
              </Typography>

            </>
          )}
        </div>
      </div>
    </div >

  );
}

export default Signup;




