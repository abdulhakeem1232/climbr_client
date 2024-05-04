import React, { useEffect, useRef, useState } from 'react';
import logo from "../../../assets/logo.png"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import { endpoints, userAxios } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';


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
  useEffect(() => {
    console.log('Cookies:', document.cookie);
    if (input1Ref.current) {
      input1Ref.current.focus()
    }
    const storedTimer = localStorage.getItem('otpTimer');
    if (storedTimer) {
      setTimer(parseInt(storedTimer));
    } else {
      setTimer(45);
    }
    const intervalId = setInterval(() => {
      setTimer((prevtime) => {
        if (prevtime == 0) {
          clearInterval(intervalId)
          localStorage.removeItem('otpTimer');
          return prevtime;
        } else {
          localStorage.setItem('otpTimer', String(prevtime - 1));
          return prevtime - 1
        }
      })
    }, 1000)
    return () => clearInterval(intervalId);
  }, [])
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const otp = `${input1Ref.current?.value}${input2Ref.current?.value}${input3Ref.current?.value}${input4Ref.current?.value}`;
    console.log('Submitted OTP:', otp);
    const response = await userAxios.post(endpoints.otp, { otp })
    console.log(response);
    if (response.data.success) {
      console.log('iiigg');
      localStorage.removeItem('otp');
      navigate('/home')
    } else {
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
        <Button variant="contained" color="primary" type="submit" >
          Submit
        </Button>
        {timer < 1 && <Button variant="contained" color="secondary" type="submit" >
          Resend
        </Button>}
      </form>
    </div >
  );
}

export default Otp;
