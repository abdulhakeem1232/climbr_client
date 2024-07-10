import React, { useEffect, useRef, useState } from 'react';
import logo from "../../../assets/logoclimbr.png"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { endpoints } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form'
import { userAxios } from '../../../utils/Config';

type FormValues = {
    password: string;
    confirmpassword: string;
}

function ResetPassword() {
    const navigate = useNavigate()
    const form = useForm<FormValues>();
    const { register, setError, formState, handleSubmit, getValues } = form
    const { errors } = formState;

    const onsubmit = async (data: FormValues) => {
        console.log(data);
        let response = await userAxios.post(endpoints.ResetPassword, data)
        if (response.data.success) {
            navigate('/')
        }
    }



    return (
        <div className='flex flex-col  items-center'>
            <style>
                {`
        input {
            border: 1px solid;
            height:50px;
            width:50px;
            margin:10px;
            border-radius:5px;
            font-size:30px;
          }
          body {
            background-color: #e5e5e5;
          }
          
        `}

            </style>
            <img src={logo} alt="" className="h-36  mx-auto" />
            <Typography variant='h5'>Reset Your Password
            </Typography>
            <form onSubmit={handleSubmit(onsubmit)}>
                <TextField
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    size="small"
                    color="secondary"
                    className='w-[280px]'
                    sx={{ backgroundColor: '#ffffff', borderRadius: '15px' }}
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
                <p className="error-message">{errors.password?.message}</p> <TextField
                    label="Confirm Password"
                    variant="outlined"
                    margin="normal"
                    type="password"
                    size="small"
                    color="secondary"
                    className='w-[280px]'
                    sx={{ backgroundColor: '#ffffff', borderRadius: '15px' }}
                    {...register('confirmpassword', {
                        required: "Confirm-Password is Required",
                        validate: {
                            matchesPassword: value => value === getValues("password") || "Passwords do not match"
                        }
                    })}
                />
                <p className="error-message">{errors.confirmpassword?.message}</p>
                <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '10px', marginTop: '10px' }} className='w-[100px]' >
                    Submit
                </Button>
            </form>
        </div >
    );
}

export default ResetPassword;
