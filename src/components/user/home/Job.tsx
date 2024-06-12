import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { logout } from '../../../Redux/slice/UserSlice';
import Cookies from 'js-cookie';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 6,
};

function Job() {
    const form = useForm()
    const { register, handleSubmit, formState, setError, getValues } = form
    const { errors } = formState;
    const { id } = useParams<{ id: string }>();
    const [job, setJob] = useState<any>(null);
    const [cv, setcv] = useState<File | null>(null)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let skills = job?.skills?.includes(',') ? job?.skills.split(',') : job?.skill
    const userId = useSelector((store: RootState) => store.UserData.UserId)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await userAxios.get(`${endpoints.singlejob}/${id}`)
                setJob(response.data)
                console.log(response.data);
            } catch (err) {
                //@ts-ignore
                if (error.response && error.response.status === 401) {
                    dispatch(logout())
                    Cookies.remove('token');
                    Cookies.remove('role');
                    navigate('/')
                }
                console.log(err);

            }
        }
        fetchData();
    }, [])
    const onsubmit = async (data: any) => {
        console.log(data, 'data', cv);
        const formData = new FormData();
        if (id) {
            formData.append('jobid', id)
        }
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        if (userId) {
            formData.append('userid', userId)
        }
        if (cv) {
            formData.append('cv', cv);
        }
        console.log('foradta', formData);
        for (let value of formData.values()) {
            console.log(value);
        }

        handleClose();
        let response = await userAxios.post(endpoints.applyjob, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        console.log(response);

    }
    const handlecvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setcv(file);
    };
    return (
        <>
            {job && (
                < div className='w-full rounded-lg shadow-md mt-3 bg-white text-left pl-3 pt-3 ' >
                    <div className='flex flex-col '>
                        <span className='font-bold mb-2'>Job Role:  <span className='font-semibold mb-2'>{job.jobrole}</span></span>
                        <span className='font-bold mb-2'>Company Name:<span className='font-semibold mb-2'> {job.companyname}</span></span>
                        <span className='font-bold mb-2'>Experiecnce:<span className='font-semibold mb-2'> {job.minexperience}-{job.maxexperience}</span></span>
                        <span className='font-bold mb-2'>Salary: <span className='font-semibold mb-2'>{job.minsalary}-{job.maxsalary}</span></span>
                        <span className='font-bold mb-2'>Employment Type: <span className='font-semibold mb-2'>{job.emptype}</span></span>
                        <span className='font-bold mb-2'>Posted On: <span className='font-semibold mb-2'>{new Date(job.createdAt).toLocaleDateString()}</span></span>
                        <span className='font-bold mb-2'>Required Skills: {skills && skills.map((skill: any, index: number) => (
                            <div key={index} className='font-semibold mb-2 ml-8'>* {skill}</div>
                        ))}</span>
                        <span className='font-bold mb-2'>Description: <span className='font-semibold mb-2'>{job.description}</span></span>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleOpen}>
                        Apply
                    </button>

                </div >
            )}
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} >
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close hover:cursor-pointer " onClick={handleClose}>❌</span>
                                <form className='flex flex-col' onSubmit={handleSubmit(onsubmit)} encType="multipart/form-data">
                                    <TextField id="standard-basic" label="Username" variant="standard"   {...register('username', {
                                        required: "name is Required",
                                        validate: {
                                            notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Username cannot consist only of numbers",
                                            notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Username cannot consist only of spaces",
                                        }
                                    })
                                    } />
                                    <p className="error-message">{errors.username?.message?.toString()}</p>

                                    <TextField id="standard-basic" label="E-mail" variant="standard"  {...register('email', {
                                        required: "E-Mail is Required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
                                            message: "Invalid E-Mail Format",
                                        }
                                    })} />
                                    <p className="error-message">{errors.email?.message?.toString()}</p>
                                    <TextField id="standard-basic" label="Mobile" variant="standard"  {...register('mobile', {
                                        required: "Mobile Number is Required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Mobile number must be exactly 10 digits long"
                                        }
                                    })} />
                                    <p className="error-message">{errors.mobile?.message?.toString()}</p>
                                    <label htmlFor="cv" className="cv-label mt-3">
                                        <Button variant="outlined" component="span">
                                            Choose CV
                                        </Button>
                                        <input
                                            id="cv"
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            required
                                            className="cv-input hidden "
                                            onChange={handlecvChange}
                                        />
                                    </label>
                                    <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-3 w-fit mx-auto'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </Box>
                </Modal>
            </div >
        </>
    )
}

export default Job

