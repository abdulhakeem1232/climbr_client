import React, { useEffect, useRef, useState } from 'react';
import logo from "../../../assets/logo.png"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { endpoints, userAxios } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';
import { recruiterAxios, recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import Cookies from 'js-cookie';


function Otp() {
  const input1Ref = useRef<HTMLInputElement | null>(null);
  const input2Ref = useRef<HTMLInputElement | null>(null);
  const input3Ref = useRef<HTMLInputElement | null>(null);
  const input4Ref = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [timer, setTimer] = useState(45)

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>,
    nextInputRef: React.RefObject<HTMLInputElement> | null) => {
    const value = event.target.value;
    if (value.length === 1 && nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
  const navigate = useNavigate()
  const startTimer = () => {
    const intervalId = setInterval(() => {
      setTimer((prevtime) => {
        if (prevtime == 0) {

          clearInterval(intervalId)
          sessionStorage.setItem('otpTimer', '0');
          return prevtime;
        } else {
          sessionStorage.setItem('otpTimer', String(prevtime - 1));
          return prevtime - 1
        }
      })
    }, 1000)
    return intervalId;
  }
  useEffect(() => {
    console.log('Cookies:', document.cookie);
    if (input1Ref.current) {
      input1Ref.current.focus()
    }
    const storedTimer = sessionStorage.getItem('otpTimer');
    if (storedTimer && parseInt(storedTimer) > 0) {
      setTimer(parseInt(storedTimer));
    } else if (storedTimer && parseInt(storedTimer) == 0) {
      setTimer(0);
    } else {
      setTimer(45);
    }
    const intervalId = startTimer();
    return () => clearInterval(intervalId);
  }, [])
  const resetTimer = () => {
    setTimer(45)
    sessionStorage.setItem('otpTimer', '45')
    const intervalId = startTimer();
  }
  const handleResend = async () => {
    console.log('sss');
    if (input1Ref.current && input2Ref.current && input3Ref.current && input4Ref.current) {
      input1Ref.current.value = '';
      input2Ref.current.value = '';
      input3Ref.current.value = '';
      input4Ref.current.value = '';
    }
    if (input1Ref.current) {
      input1Ref.current.focus();
    }
    let response = await userAxios.post(endpoints.resendOtp)
    console.log(response.data.success)
    resetTimer();
  }
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otp = `${input1Ref.current?.value}${input2Ref.current?.value}${input3Ref.current?.value}${input4Ref.current?.value}`;
    console.log('Submitted OTP:', otp);
    const isRecruiter = Cookies.get('isRecruiter');
    console.log('isRecruiter:', isRecruiter);
    let response: any
    if (isRecruiter == 'true') {
      console.log('trueee');
      response = await recruiterAxios.post(recruiterendpoints.otp, { otp })
    } else {
      console.log('falseee');
      response = await userAxios.post(endpoints.otp, { otp })
    }
    console.log(response.data.success, isRecruiter, 'wehviks');
    if (response.data.success && response.data.msg == 'ForgotOtp') {
      console.log('forgot pass');

      navigate('/reset')

    }
    if (response.data.success && isRecruiter == 'false') {
      sessionStorage.removeItem('otpTimer');
      navigate('/home')
    } else if (response.data.success && isRecruiter == 'true') {
      sessionStorage.removeItem('otpTimer');
      navigate('/')
    }
    else {
      setErrorMsg('Invalid OTP')
    }
  }
  type FormData = {
    otp: string;
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
      <Typography variant='h5'>Enter the OTP
      </Typography>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className='otp'>
          <input
            ref={input1Ref}
            type="text"
            maxLength={1}
            onChange={(e) => handleOnChange(e, input2Ref)}
          />
          <input
            ref={input2Ref}
            type="text"
            maxLength={1}
            onChange={(e) => handleOnChange(e, input3Ref)}
          />
          <input
            ref={input3Ref}
            type="text"
            maxLength={1}
            onChange={(e) => handleOnChange(e, input4Ref)}
          />
          <input
            ref={input4Ref}
            type="text"
            maxLength={1}
            onChange={(e) => handleOnChange(e, null)}
          />
        </div>
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        {timer > 1 && < h6 > Time Left:{timer}</h6>}
        {timer > 1 && < Button variant="contained" color="primary" type="submit" >
          Submit
        </Button>}
        {timer < 1 && <Button variant="contained" color="secondary" onClick={handleResend} >
          Resend
        </Button>}
      </form>
    </div >
  );
}

export default Otp;
