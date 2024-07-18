import React from 'react'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import logo from "../../../assets/logo.png"
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { endpoints } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';
import { userAxios } from '../../../utils/Config';
import { toast } from 'sonner';
import { Box, Paper, Grid, useTheme, useMediaQuery } from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';

type FormValues = {
    email: string;
}

function Email() {
    const navigate = useNavigate()
    const { register, formState, handleSubmit } = useForm<FormValues>();
    const { errors } = formState;
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

    const onSubmit = async (data: FormValues) => {
        console.log(data.email);
        let Response = await userAxios.post(endpoints.emailValidate, { email: data.email })
        if (Response.data.success) {
            navigate('/otp')
        } else {
            toast.error("Email not found")
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f0f2f5',
                padding: 3
            }}
        >
            <Grid container spacing={4} justifyContent="center" alignItems="center" maxWidth="1200px">
                {isDesktop && (
                    <Grid item xs={12} md={6}>
                        <Box sx={{ pr: 4 }}>
                            <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                                Reset Your Password
                            </Typography>
                            <Typography variant="h5" gutterBottom sx={{ color: '#555' }}>
                                Don't worry, it happens to the best of us
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#666' }}>
                                Remember to check your spam folder if you don't see the email in your inbox.
                            </Typography>
                        </Box>
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 2,
                            maxWidth: 400,
                            width: '100%',
                            margin: 'auto'
                        }}
                    >
                        <img src={logo} alt="Climbr Logo" className="h-36 mb-4" />
                        <LockResetIcon sx={{ fontSize: 40, color: '#1976d2', mb: 2 }} />
                        <Typography variant='h5' sx={{ mb: 3, fontWeight: 'bold', color: '#333' }}>
                            Forgot Password?
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                            <TextField
                                label="Email Address"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                size="medium"
                                color="primary"
                                sx={{ mb: 2 }}
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                            />
                            {errors.email && <Typography color="error" sx={{ mb: 2 }}>{errors.email.message}</Typography>}

                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 2,
                                    textTransform: 'none',
                                    fontWeight: 'bold',
                                    fontSize: '1rem',
                                    py: 1.5
                                }}
                            >
                                Send OTP
                            </Button>
                        </form>
                        <Typography variant="body2" sx={{ mt: 3, color: '#666', textAlign: 'center' }}>
                            Remembered your password? <a href="/login" style={{ color: '#1976d2', textDecoration: 'none' }}>Back to Login</a>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box >
    )
}

export default Email
