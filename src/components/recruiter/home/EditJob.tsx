import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useNavigate, useParams } from 'react-router-dom';
import { recruiterAxios } from '../../../utils/Config';
import { toast } from 'sonner';

function EditJob() {
    const form = useForm()
    const [image, setImage] = useState<File | null>(null)
    const { id } = useParams<{ id: string }>();
    const { register, handleSubmit, formState, setError, getValues } = form
    const { errors } = formState;
    const navigate = useNavigate()
    const [job, setJob] = useState(null)
    const skillsList = [
        'HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'SQL', 'TypeScript', 'Angular', 'Vue.js', 'Bootstrap'
    ];
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
    const submit = async (data: any) => {
        try {
            data.id = id;
            let response = await recruiterAxios.post(recruiterendpoints.updatejob, data)
            if (response.data.success) {
                toast.success("Updated Succefully")
                navigate('/recruiter/home')
            }
        } catch (error) {
            console.error('Error submitting data:', error);

        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await recruiterAxios.get(`${recruiterendpoints.getSinglejob}/${id}`);
                setJob(response.data);
                console.log(response.data);
                const skillsArray = response.data.skills.split(',');
                form.setValue('jobtitle', response.data.jobrole);
                form.setValue('MinExperienceLevel', response.data.minexperience);
                form.setValue('Minimumsalary', response.data.minsalary);
                form.setValue('joblocation', response.data.joblocation);
                form.setValue('RequiredSkills', skillsArray);
                form.setValue('CompanyName', response.data.companyname);
                form.setValue('MaxExperienceLevel', response.data.maxexperience);
                form.setValue('Maximumsalary', response.data.maxsalary);
                form.setValue('EmploymentType', response.data.emptype);
                form.setValue('Description', response.data.description);
            } catch (error) {
                console.error('Error fetching single job:', error);

            }
        }
        fetchData()
    }, [])
    return (
        <div className='container bg-white border-2 border-solid mx-10 py-7 lg:mx-36 rounded-xl border-gray-400 '>
            <span className='text-4xl font-sans font-semibold'>Edit Job Post</span>
            <form onSubmit={handleSubmit(submit)}>
                <div className='form-container md:flex mt-7'>
                    < div className='form-column flex flex-col w-1/2 px-4 lg:px-16 ' >
                        <TextField id="standard-basic" label="" className='mb-10 w-[350px] ' style={{ marginBottom: '0.7rem' }} variant="standard" {...register('jobtitle', {
                            required: "Job Title is Required", validate: {
                                notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Job Title cannot consist only of numbers",
                                notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Job Title cannot consist only of spaces",
                            },
                        })} />
                        <p className="error-message">{errors.jobtitle?.message?.toString()}</p>


                        <TextField id="standard-basic" label="" variant="standard" className=' my-10 w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('MinExperienceLevel', {
                                required: "Min-Experience Level is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Min-Experience Level must contain only numbers"
                                }
                            })} />
                        <p className="error-message">{errors.MinExperienceLevel?.message?.toString()}</p>

                        <TextField id="standard-basic" label="" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('Minimumsalary', {
                                required: "Minimum Salary is Required",
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Minimum Salary must contain only numbers"
                                }
                            })}
                        />
                        <p className="error-message">{errors.Minimumsalary?.message?.toString()}</p>
                        <TextField id="standard-basic" label="" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
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

                    </div >
                    <div className='form-column flex flex-col w-1/2 px-4 lg:px-20'>
                        <TextField id="standard-basic" label="" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
                            {...register('CompanyName', {
                                required: "Company Name is Required", validate: {
                                    notOnlyNumbers: (value) => !(/^\d+$/.test(value)) || "Company Name cannot consist only of numbers",
                                    notOnlySpaces: (value) => !(/^\s+$/.test(value)) || "Company Name cannot consist only of spaces",
                                }
                            })} />
                        <p className="error-message">{errors.CompanyName?.message?.toString()}</p>
                        <TextField id="standard-basic" label="" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
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
                        <TextField id="standard-basic" label="" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
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
                            id="standard-basic"
                            style={{ marginBottom: '0.7rem' }}
                            label="Employment Type"
                            variant="standard"
                            className='w-[350px]'
                            select
                            {...register('EmploymentType', {
                                required: "Employment Type is Required"
                            })}
                            value={form.watch('EmploymentType') || ''}
                            onChange={(e) => {
                                form.setValue('EmploymentType', e.target.value);
                            }}
                        >
                            {employmentTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <p className="error-message">{errors.EmploymentType?.message?.toString()}</p>
                        <TextField id="standard-basic" label="" variant="standard" className='w-[350px]' style={{ marginBottom: '0.7rem' }}
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

export default EditJob

