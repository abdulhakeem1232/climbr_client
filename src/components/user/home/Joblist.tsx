import React, { useState, useEffect, useCallback } from 'react'
import { endpoints } from '../../../endpoints/userEndpoint'
import JobSkeleton from '../../skeleton/JobSkeleton';
import { useNavigate } from 'react-router-dom';
import { userAxios } from '../../../utils/Config';
// @ts-ignore
import { debounce } from 'lodash';
// @ts-ignore
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slice/UserSlice';
import Cookies from 'js-cookie';

interface JoblistProps {
    showFilters: boolean;
}
function Joblist({ showFilters }: JoblistProps) {
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
        <div className="job-list-container flex my-3 h-auto min-h-full ">
            {loading ? (
                <>
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />

                </>
            ) : (

                <div className="job-list-container flex flex-col md:flex-row ">
                    <div className={`filter-container bg-white rounded-lg shadow-lg p-4 mb-4 md:mb-0 md:mr-4 md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        <input
                            type="text"
                            className='w-full pl-4 h-10 focus:border-transparent focus:outline-none shadow-md mb-4 rounded-full bg-gray-100'
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="Search by Location"
                        />
                        <span className="text-lg m">Types of Employment</span><br />
                        <div className="filter-option mb-2">
                            <input type="checkbox" id="onsiteFullTime" name="onsiteFullTime" className='hidden peer' checked={filters.onsiteFullTime} onChange={handleFilterChange} />
                            <label htmlFor="onsiteFullTime" className="flex items-center cursor-pointer text-gray-700 hover:text-blue-500 transition-colors duration-200">
                                <span className="w-5 h-5 inline-block mr-2 rounded-full border border-gray-300 peer-checked:bg-blue-500"></span>
                                On-site Full-Time
                            </label>
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
                    <div className="card-container flex flex-wrap ml-5 pl-16 lg:pl-64">
                        {filteredJobs?.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <Card key={index} className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden mb-4 md:mr-4 md:w-64'>
                                    <div className="p-4">
                                        <Card.Img variant="top" src={job.image} className='w-16 h-16 mb-4 rounded-full mx-auto' />
                                        <Card.Body className='text-center'>
                                            <Card.Title className="font-bold text-xl mb-2">{job.jobrole}</Card.Title>
                                            <Card.Text>
                                                <p className='text-gray-600 mb-1'>{job.companyname}</p>
                                                <p className='text-gray-600 mb-1'>{job.joblocation}</p>
                                                <p className='text-gray-600 mb-3'>{job.minexperience}-{job.maxexperience} years</p>
                                            </Card.Text>
                                            <button className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200' onClick={() => handleButton(job._id)}>More Details</button>
                                        </Card.Body>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <div className="w-full flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-lg shadow-lg">
                                <svg className="w-24 h-24 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <h2 className="text-3xl font-bold text-gray-700 mb-2">No Job Posts Found</h2>
                                <p className="text-xl text-gray-500 mb-4">We couldn't find any job posts matching your criteria.</p>
                                <p className="text-lg text-gray-500">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                </div>
            )
            }
        </div >
    );
}

export default Joblist;
