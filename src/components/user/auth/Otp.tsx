import React, { useEffect, useRef, useState } from 'react';
import logo from "../../../assets/logo.png"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { endpoints } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import Cookies from 'js-cookie';
import { userAxios, recruiterAxios } from '../../../utils/Config';
import { toast } from 'sonner';

function Otp() {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [timer, setTimer] = useState<number>(45);
  const navigate = useNavigate();

  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevtime) => {
        if (prevtime === 0) {
          clearInterval(intervalId);
          sessionStorage.setItem('otpTimer', '0');
          return prevtime;
        } else {
          sessionStorage.setItem('otpTimer', String(prevtime - 1));
          return prevtime - 1;
        }
      });
    }, 1000);
    return intervalId;
  };

  useEffect(() => {
    console.log('Cookies:', document.cookie);
    inputs.current[0]?.focus();
    const storedTimer = sessionStorage.getItem('otpTimer');
    if (storedTimer && parseInt(storedTimer) > 0) {
      setTimer(parseInt(storedTimer));
    } else if (storedTimer && parseInt(storedTimer) === 0) {
      setTimer(0);
    } else {
      setTimer(45);
    }
    const intervalId = startTimer();
    return () => clearInterval(intervalId);
  }, []);

  const resetTimer = () => {
    setTimer(45);
    sessionStorage.setItem('otpTimer', '45');
    startTimer();
  };

  const handleResend = async () => {
    setOtp(['', '', '', '']);
    inputs.current[0]?.focus();
    let response = await userAxios.post(endpoints.resendOtp);
    console.log(response.data.success);
    resetTimer();
  };

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== '') {
      if (index < 3) {
        inputs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).split('');
    if (pastedData.every(char => !isNaN(Number(char)))) {
      setOtp(pastedData.concat(Array(4 - pastedData.length).fill('')));
      inputs.current[3]?.focus();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otpValue = otp.join('');
    console.log('Submitted OTP:', otpValue);
    const isRecruiter = Cookies.get('isRecruiter');
    console.log('isRecruiter:', isRecruiter);
    let response;
    if (isRecruiter === 'true') {
      console.log('trueee');
      response = await recruiterAxios.post(recruiterendpoints.otp, { otp: otpValue });
    } else {
      console.log('falseee');
      response = await userAxios.post(endpoints.otp, { otp: otpValue });
    }
    console.log(response.data.success, isRecruiter, 'wehviks');
    if (response.data.success && response.data.msg === 'ForgotOtp') {
      console.log('forgot pass');
      navigate('/reset');
    } else if (response.data.success && isRecruiter === 'false') {
      sessionStorage.removeItem('otpTimer');
      navigate('/home');
    } else if (response.data.success && isRecruiter === 'true') {
      sessionStorage.removeItem('otpTimer');
      navigate('/');
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <img src={logo} alt="Logo" className="h-28 mb-6 mx-auto" />
        <Typography variant='h4' className="text-2xl font-bold text-center text-gray-800 mb-4">
          Verify Your Account
        </Typography>
        <Typography variant='body1' className="text-center text-gray-600 mb-8">
          We've sent a 4-digit code to your email. Please enter it below to complete verification.
        </Typography>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex justify-center space-x-4">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                ref={(input) => inputs.current[index] = input}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-14 h-14 text-center text-2xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none transition-colors"
              />
            ))}
          </div>
          {errorMsg && <p className="text-red-500 text-center">{errorMsg}</p>}
          <div className="text-center text-sm text-gray-600">
            {timer > 1 ? `Time remaining: ${timer} seconds` : "Time's up!"}
          </div>
          {timer > 1 ? (
            <Button variant="contained" color="primary" type="submit" fullWidth className="py-2">
              Verify OTP
            </Button>
          ) : (
            <Button variant="outlined" color="secondary" onClick={handleResend} fullWidth className="py-2">
              Resend OTP
            </Button>
          )}
        </form>
        <Typography variant='body2' className="mt-6 text-center text-gray-600 text-sm">
          Didn't receive the code? Check your spam folder or contact support.
        </Typography>
      </div>
    </div>
  );
}

export default Otp;
