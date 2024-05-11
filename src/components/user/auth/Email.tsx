import React from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import logo from "../../../assets/logo.png"
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    email: string;

}
function Email() {
    const navigate = useNavigate()
    const { register, setError, formState, handleSubmit } = useForm<FormValues>();
    const { errors } = formState;

    const onSubmit = async (data: FormValues) => {
        console.log(data.email);
        let Response = await userAxios.post(endpoints.emailValidate, { email: data.email })
        if (Response.data.success) {
            navigate('/otp')
        } else {
            setError("email", {
                type: "manual",
                message: "Invalid E-mail"
            });
        }
    }
    return (
        <div>
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
            <Typography variant='h5'>Enter the E-Mail
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: ' flex', flexDirection: 'column', alignItems: 'center' }}>
                <TextField
                    label="E-mail"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    color="secondary"
                    className='w-[280px]'
                    sx={{ backgroundColor: '#ffffff', borderRadius: '15px' }}
                    {...register('email', {
                        required: "E-mail is Required",
                    })
                    }
                />
                {errors.email && <p className="error-message">{errors.email.message}</p>}

                <Button variant="contained" color="primary" type="submit" >
                    Submit
                </Button>

            </form>
        </div >
    )
}

export default Email

