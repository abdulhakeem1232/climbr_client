import React, { useState, useEffect } from 'react'
import { userAxios, endpoints } from '../../../endpoints/userEndpoint'
import JobSkeleton from './JobSkeleton';
import { useNavigate } from 'react-router-dom';

function Joblist() {
    const navigate = useNavigate()
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userAxios.get(endpoints.getalljob)
                console.log('response', response.data);
                setJobs(response.data.jobs)
            } catch (err) {
                console.log('Erro while Fteching Jobs:', err);

            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [])
    const handlebutton = (id: string) => {
        navigate(`/job/${id}`)
    }
    return (
        <div>
            {loading ? (
                <>
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                    <JobSkeleton />
                </>
            ) : jobs.length === 0 ? (
                <div>
                    SORRY! NO JOB POST
                </div>
            ) : (

                jobs.map((job, index) => (
                    <div className='w-full my-3   border-2 border-gray-300'>
                        <div className='flex items-center'>
                            <div >
                                <img src={job.image} alt="" className='w-48' />
                            </div>
                            <div className='text-left ml-3'>
                                <p className='font-bold'>Role: {job.jobrole}</p>
                                <p className='font-bold'> Comapny Name: {job.companyname}</p>
                                <p className='font-bold'>  Location: {job.joblocation}</p>
                                <p className='font-bold'>  Experience: {job.minexperience}-{job.maxexperience}</p>
                            </div>
                            <div className='ml-auto mb-auto mt-2 mr-2'>

                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-lg"
                                    onClick={() => handlebutton(job._id)}
                                >
                                    More Deatils
                                </button>
                            </div>
                        </div>
                    </div>
                ))

            )}
        </div >
    )
}

export default Joblist

