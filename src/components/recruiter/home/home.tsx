import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { recruiterAxios, recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'

function Home() {
    const [jobpost, setjobpost] = useState<any[]>([]);
    const userId = useSelector((store: RootState) => store.UserData.UserId)
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect');

                let response = await recruiterAxios.get(`${recruiterendpoints.getjob}/${userId}`)
                console.log(response, 'response');
                setjobpost(response.data.jobs)
            }
            catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchData();
    }, [])
    useEffect(() => {
        console.log('000', jobpost);

    }, [jobpost])
    return (
        <div className=''>
            {jobpost.length == 0 ? (
                <div className='flex flex-col justify-center h-screen items-center '>
                    <p className='text-3xl leading-normal'>Welcome You Don't <br></br>Any job post.
                        Post hiring <br></br>Details to Hire quality candidate</p>
                    <Link to='/recruiter/newJob'> <button className='mt-3 bg-green-500 hover:bg-green-600 rounded-full px-5 py-2.5 text-center'>Add Job Post</button></Link>
                </div>
            ) : (
                <div className='text-center'>

                    <h1 className='font-bold my-6 text-2xl'>Jobs Posted:</h1>

                    {jobpost.map((post, index) => (
                        <div key={index} className='w-1/2 mx-auto my-4 bg-gray-50 shadow-lg p-4 flex rounded-lg'>
                            <span className='font-bold text-lg'>{post.jobrole}</span>
                            <span className='font-semibold text-lg'>{post.companyname}</span>
                            <span className='font-semibold text-lg'>{post.emptype}</span>
                            <span className='font-semibold text-lg'>{post.minexperience}-{post.maxexperience}</span>
                            <span className='font-bold text-lg'>⬇</span>
                        </div>
                    ))}
                </div>

            )
            }
        </div >
    )
}

export default Home

