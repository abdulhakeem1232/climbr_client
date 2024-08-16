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

                <div className="job-list-container flex flex-col md:flex-row md:h-full">
                    <div className={`filter-container bg-white rounded-lg shadow-lg p-4 mb-4 md:mb-0 md:mr-4 md:w-64 ${showFilters ? 'block' : 'hidden md:block'}text-left`}>
                        <input
                            type="text"
                            className='w-full pl-4 h-10 focus:border-transparent focus:outline-none shadow-md mb-4 rounded-full bg-gray-100'
                            value={searchTerm}
                            onChange={handleChange}
                            placeholder="Search by Location"
                        />
                        <span className="text-lg font-semibold mb-2 block">Types of Employment</span>
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
                    <div className="card-container flex flex-wrap md:h-full ml-5">
                        {filteredJobs?.length > 0 ? (
                            filteredJobs.map((job, index) => (
                                <Card key={index} className='bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden mb-6 md:mr-6 md:w-72 transform hover:-translate-y-1 h-fit'>
                                    <div className="relative p-6">
                                        <div className="absolute top-0 right-0 bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                                            {job.emptype}
                                        </div>
                                        <div className="flex items-center mb-4">
                                            <Card.Img variant="top" src={job.image} className='w-16 h-16 rounded-full border-4 border-blue-100' />
                                            <div className="ml-4">
                                                <Card.Title className="font-bold text-xl text-gray-800">{job.jobrole}</Card.Title>
                                                <p className='text-blue-500 font-semibold'>{job.companyname}</p>
                                            </div>
                                        </div>
                                        <Card.Text>
                                            <div className="flex items-center text-gray-600 mb-2">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                </svg>
                                                {job.joblocation}
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                {job.minexperience}-{job.maxexperience} years
                                            </div>
                                        </Card.Text>
                                        <button
                                            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200 flex items-center justify-center'
                                            onClick={() => handleButton(job._id)}
                                        >
                                            More Details
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                            </svg>
                                        </button>
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
