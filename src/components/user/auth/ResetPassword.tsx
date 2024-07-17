import React, { useState } from 'react';
import logo from "../../../assets/logo.png"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { endpoints } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form'
import { userAxios } from '../../../utils/Config';
import { toast } from 'sonner';

type FormValues = {
    password: string;
    confirmpassword: string;
}

function ResetPassword() {
    const navigate = useNavigate()
    const form = useForm<FormValues>();
    const { register, formState, handleSubmit, getValues } = form
    const { errors } = formState;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onsubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            let response = await userAxios.post(endpoints.ResetPassword, data)
            if (response.data.success) {
                toast.success("Password reset successfully!");
                navigate('/')
            } else {
                toast.error("Failed to reset password. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <img src={logo} alt="Logo" className="h-28 mb-6 mx-auto" />
                <Typography variant='h4' className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Reset Your Password
                </Typography>
                <Typography variant='body1' className="text-center text-gray-600 mb-6">
                    Choose a strong password to secure your account. Make sure it's at least 6 characters long and includes a mix of letters, numbers, and symbols.
                </Typography>
                <form onSubmit={handleSubmit(onsubmit)} className="space-y-4">
                    <TextField
                        label="New Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        {...register('password', {
                            required: "Password is required",
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
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                    <TextField
                        label="Confirm New Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        {...register('confirmpassword', {
                            required: "Confirm password is required",
                            validate: {
                                matchesPassword: value => value === getValues("password") || "Passwords do not match"
                            }
                        })}
                        error={!!errors.confirmpassword}
                        helperText={errors.confirmpassword?.message}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                        className='mt-4 py-3 text-lg'
                    >
                        {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </Button>
                </form>
                <Typography variant='body2' className="mt-6 text-center text-gray-600 text-sm">
                    Remember your password? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                </Typography>
            </div>
        </div>
    );
}

export default ResetPassword;
