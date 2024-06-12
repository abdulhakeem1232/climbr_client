import React, { useState, useEffect, useCallback } from 'react'
import { userAxios, endpoints } from '../../../endpoints/userEndpoint'
import JobSkeleton from '../skeleton/JobSkeleton';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { debounce } from 'lodash';
// @ts-ignore
import Card from 'react-bootstrap/Card';
import {  useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slice/UserSlice';
import Cookies from 'js-cookie';

function Joblist() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
    const [filters, setFilters] = useState({
        onsiteFullTime: false,
        remoteFullTime: false,
        onsitePartTime: false,
        remotePartTime: false,
        backEndDeveloper: false,
        frontEndDeveloper: false,
        fullStackDeveloper: false,
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userAxios.get(endpoints.getalljob)
                console.log('response', response.data);
                setJobs(response.data.jobs)
                setFilteredJobs(response.data.jobs)
            } catch (err) {
                //@ts-ignore
                if (error.response && error.response.status === 401) {
                    dispatch(logout())
                    Cookies.remove('token');
                    Cookies.remove('role');
                    navigate('/')
                }
                console.log('Erro while Fteching Jobs:', err);

            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    const handleFilterChange = (event: any) => {
        const { name, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
        // if (checked) {
        //     const updatedFilters: any = { ...filters, [name]: checked };
        //     for (const key in updatedFilters) {
        //         if (key !== name && updatedFilters[key] === true) {
        //             updatedFilters[key] = false;
        //         }
        //     }
        //     setFilters(updatedFilters);
        // }
        console.log('loh', filters);
    };

    const debouncedSearch = useCallback(debounce(async (value: string, filteredJobs: any[]) => {
        try {
            console.log(filteredJobs, searchTerm, value);
            let response = await userAxios.post(endpoints.getsearchjobs, {
                filteredJobs: filteredJobs, searchTerm: value
            })
            console.log(response.data);
            setFilteredJobs(response.data.matchedJobs)
        } catch (error) {
            console.error('Error searching:', error);
        }
    }, 1000), [])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log(value);
        setSearchTerm(value);
        debouncedSearch(value, jobs);
    };

    const handleButton = (id: string) => {
        navigate(`/job/${id}`)
    }
    useEffect(() => {

        const updatedFilteredJobs = jobs.filter(job => {

            const employmentTypeFilter =
                (filters.onsiteFullTime && job.emptype == 'onsiteFullTime') ||
                (filters.remoteFullTime && job.emptype == 'remoteFullTime') ||
                (filters.onsitePartTime && job.emptype == 'onsitePartTime') ||
                (filters.remotePartTime && job.emptype == 'remotePartTime') ||
                (filters.backEndDeveloper && job.jobrole == 'Back End Developer') ||
                (filters.frontEndDeveloper && job.jobrole == 'Front End Developer') ||
                (filters.fullStackDeveloper && job.jobrole == 'Full Stack Developer');
            return employmentTypeFilter
        });
        if (!Object.values(filters).some(value => value)) {
            setFilteredJobs(jobs);
        } else {
            setFilteredJobs(updatedFilteredJobs);
        }
    }, [filters]);

    return (
        <div className="job-list-container flex my-3 ">
            {loading ? (
                <>
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                </>
            ) : filteredJobs?.length === 0 ? (
                <div>
                    SORRY! NO JOB POST
                </div>
            ) : (

                <div className="job-list-container flex ">
                    <div className="filter-container text-left  mx-auto rounded-lg shadow-lg bg-white w-2/12  p-4 fixed  top-28 bottom-20 overflow-y-auto ">
                        <input
                            type="text"
                            className='w-full pl-2 h-9 focus:border-transparent focus:outline-none shadow-md mb-3 rounded-md bg-slate-50'
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="Search by Location"
                        />
                        <span className="text-lg m">Types of Employment</span><br />
                        <div className='my-1 ml-2'>
                            <input type="checkbox" id="onsiteFullTime" name="onsiteFullTime" className='transform scale-125 mr-1'
                                checked={filters.onsiteFullTime} onChange={handleFilterChange} />
                            <label htmlFor="onsiteFullTime">On-site Full-Time</label>
                        </div>
                        <div className='mb-1 ml-2'>
                            <input type="checkbox" id="remoteFullTime" name="remoteFullTime" className='transform scale-125 mr-1'
                                checked={filters.remoteFullTime} onChange={handleFilterChange} />
                            <label htmlFor="remoteFullTime">Remote Full-Time</label>
                        </div>
                        <div className='mb-1 ml-2'>
                            <input type="checkbox" id="onsitePartTime" name="onsitePartTime" className='transform scale-125 mr-1'
                                checked={filters.onsitePartTime} onChange={handleFilterChange} />
                            <label htmlFor="onsitePartTime">On-site Part-Time</label>
                        </div>
                        <div className='mb-1 ml-2'>
                            <input type="checkbox" id="remotePartTime" name="remotePartTime" className='transform scale-125 mr-1'
                                checked={filters.remotePartTime} onChange={handleFilterChange} />
                            <label htmlFor="remotePartTime">Remote Part-Time</label>
                        </div>
                        <span className="text-lg m">Designation</span><br />
                        <div className='my-1 ml-2'>
                            <input type="checkbox" id="backEndDeveloper" name="backEndDeveloper" className='transform scale-125 mr-1'
                                checked={filters.backEndDeveloper} onChange={handleFilterChange} />
                            <label htmlFor="backEndDeveloper">Back-End Developer</label>
                        </div>
                        <div className='my-1 ml-2'>
                            <input type="checkbox" id="frontEndDeveloper" name="frontEndDeveloper" className='transform scale-125 mr-1'
                                checked={filters.frontEndDeveloper} onChange={handleFilterChange} />
                            <label htmlFor="frontEndDeveloper">Front-End Developer</label>
                        </div>
                        <div className='mb-1 ml-2'>
                            <input type="checkbox" id="fullStackDeveloper" name="fullStackDeveloper" className='transform scale-125 mr-1'
                                checked={filters.fullStackDeveloper} onChange={handleFilterChange} />
                            <label htmlFor="fullStackDeveloper">Full-Stack Developer</label>
                        </div>

                    </div>
                    <div className="card-container flex flex-wrap  ml-5 pl-16 lg:pl-64">



                        {filteredJobs?.map((job, index) => (
                            <Card key={index} style={{ width: '16rem' }} className='rounded-xl bg-white mr-6  mb-6 p-3 justify-between shadow-xl  hover:transform hover:scale-105 transition-transform duration-300'>
                                <Card.Img variant="top" src={job.image} className='w-16 h-12 mb-2 rounded-md' />
                                <Card.Body className='text-left'>
                                    <Card.Title>{job.jobrole}</Card.Title>
                                    <Card.Text>
                                        <p className='font-bold'>Company Name: {job.companyname}</p>
                                        <p className='font-bold'>Location: {job.joblocation}</p>
                                        <p className='font-bold'>Experience: {job.minexperience}-{job.maxexperience}</p>
                                    </Card.Text>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-sm mt-2 text-white font-bold py-2 px-2 rounded-full' onClick={() => handleButton(job._id)}>More Details</button>
                                </Card.Body>
                            </Card>
                        ))}


                    </div>

                </div>
            )
            }
        </div >
    );
}

export default Joblist;
