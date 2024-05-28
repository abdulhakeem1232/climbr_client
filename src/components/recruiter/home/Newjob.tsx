import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ImageIcon from '../../../assets/ImageIcon.png'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { recruiterAxios, recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { useNavigate } from 'react-router-dom';

const Newjob = () => {
    const form = useForm()
    const [image, setImage] = useState<File | null>(null)
    const { register, handleSubmit, formState, setError, getValues } = form
    const { errors } = formState;
    const skillsList = [
        'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'TypeScript', 'Angular', 'Vue.js', 'Bootstrap'
    ];
    const userId = useSelector((store: RootState) => store.UserData.UserId)
    const navigate = useNavigate()
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setImage(file);
    };
    const employmentTypes = [
        { value: 'remoteFullTime', label: 'Remote-Full-time' },
        { value: 'remotePartTime', label: 'Remote-Part-time' },
        { value: 'onsiteFullTime', label: 'On Site-Full-time' },
        { value: 'onsitePartTime', label: 'On Site-Part-time' },
    ];
    const submit = async (formData: any) => {
        console.log('Form Data:', formData);
        console.log('image', image);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
        if (userId)
            formDataToSend.append('userId', userId)
        if (image) {
            formDataToSend.append('companylogo', image);
        }
        console.log('fromadatatosend', formDataToSend);

        let response = await recruiterAxios.post(recruiterendpoints.createjob, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        navigate('/recruiter/home')
    };
    return (
        <div className='container bg-white border-2 border-solid mx-10 py-7 lg:mx-36 rounded-xl border-gray-400 '>
            <span className='text-4xl font-sans font-semibold'>New Job Post</span>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-container md:flex mt-7'>
                    < div className='form-column flex flex-col w-1/2 px-4 lg:px-16 ' >
                        <TextField id="standard-basic" label="Job Title" className='mb-10 w-[350px] ' style={{ marginBottom: '0.7rem' }} variant="standard" {...register('jobtitle', {
                            required: "Job Title is Required", validate: {
                                notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Job Title cannot consist only of numbers",
                                notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Job Title cannot consist only of spaces",
                            },
                        })} />
                        <p className="error-message">{errors.jobtitle?.message?.toString()}</p>


                        <TextField id="standard-basic" label="Min-Experience Level" variant="standard" className=' my-10 w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('MinExperienceLevel', {
                                required: "Min-Experience Level is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Min-Experience Level must contain only numbers"
                                }
                            })} />
                        <p className="error-message">{errors.MinExperienceLevel?.message?.toString()}</p>

                        <TextField id="standard-basic" label="Minimum salary" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('Minimumsalary', {
                                required: "Minimum Salary is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Minimum Salary must contain only numbers"
                                }
                            })}
                        />
                        <p className="error-message">{errors.Minimumsalary?.message?.toString()}</p>
                        <TextField id="standard-basic" label="Job Location" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('joblocation', {
                                required: "Job Location is Required",
                                validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Company Name cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Company Name cannot consist only of spaces",
                                }
                            })} />
                        <p className="error-message">{errors.joblocation?.message?.toString()}</p>
                        <FormControl
                            variant='standard'
                            className='w-[350px] mb-4'
                        >
                            <InputLabel id='required-skills-label'>
                                Required Skills
                            </InputLabel>
                            <Select
                                labelId='required-skills-label'
                                id='required-skills'
                                multiple
                                value={form.watch('RequiredSkills') || []}
                                onChange={(e) => {
                                    form.setValue(
                                        'RequiredSkills',
                                        Array.isArray(e.target.value) ? e.target.value : [e.target.value]
                                    );
                                }}
                                renderValue={(selected) =>
                                    (selected as string[]).join(', ')
                                }
                            >
                                {skillsList.map((skill) => (
                                    <MenuItem key={skill} value={skill}>
                                        {skill}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className='flex'>
                            <label htmlFor="companylogo" className="cursor-pointer flex items-center">
                                <img src={ImageIcon} alt="Upload Logo" className="w-7 mr-2" />
                                Company Logo
                            </label>
                            <input
                                type="file"
                                id="companylogo"
                                name="companylogo"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                        <p className="error-message">{errors.companylogo?.message?.toString()}</p>


                    </div >
                    <div className='form-column flex flex-col w-1/2 px-4 lg:px-20'>
                        <TextField id="standard-basic" label="Company Name" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('CompanyName', {
                                required: "Company Name is Required", validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Company Name cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Company Name cannot consist only of spaces",
                                }
                            })} />
                        <p className="error-message">{errors.CompanyName?.message?.toString()}</p>
                        <TextField id="standard-basic" label="Max-Experience Level" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('MaxExperienceLevel', {
                                required: "MaxExperience Level is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Max-Experience Level must contain only numbers"
                                },
                                validate: (value) => {
                                    const minExperienceLevel = form.watch('MinExperienceLevel');
                                    const max = parseInt(value);
                                    const min = parseInt(minExperienceLevel);
                                    if (!min || max >= min) {
                                        return true;
                                    }
                                    return 'Max-Experience Level must be greater than or equal to Min-Experience Level';
                                }
                            })} />
                        <p className="error-message">{errors.MaxExperienceLevel?.message?.toString()}</p>
                        <TextField id="standard-basic" label="Maximum Salary" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('Maximumsalary', {
                                required: "Maximum Salary  is Required",

                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Maximum Salary must contain only numbers"
                                },
                                validate: (value) => {
                                    const minsalary = form.watch('Minimumsalary');
                                    const max = parseInt(value);
                                    const min = parseInt(minsalary);
                                    if (!min || max >= min) {
                                        return true;
                                    }
                                    return 'Max-Experience Level must be greater than or equal to Min-Experience Level';
                                }
                            })} />
                        <p className="error-message">{errors.Maximumsalary?.message?.toString()}</p>

                        <TextField
                            id="standard-basic" style={{ marginBottom: '0.7rem' }}
                            label="Employment Type"
                            variant="standard"
                            className='w-[350px]'
                            select
                            {...register('EmploymentType', {
                                required: "Employment Type is Required"
                            })}
                        >
                            {employmentTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <p className="error-message">{errors.EmploymentType?.message?.toString()}</p>
                        <TextField id="standard-basic" label="Description" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('Description', {
                                required: "Description is Required"
                            })} />
                        <p className="error-message">{errors.Description?.message?.toString()}</p>
                        <button type="submit" className="focus:outline-none w-[350px] text-white bg-green-600 hover:bg-green-800 rounded-lg font-medium px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Post</button>
                    </div>
                </div >
            </form >
        </div>
    )
}

export default Newjob

