import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { recruiterAxios, recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { stringify } from 'querystring';
import Navigate from '../../../assets/naigateDown.png'
import Edit from '../../../assets/edit.png'
import Delete from '../../../assets/delete.png'

function Home() {
    const [jobpost, setjobpost] = useState<any[]>([]);
    const [applicants, setapllicants] = useState<string>('')
    const [showPdf, setShowPdf] = useState(false);
    const [selectedPdfUrl, setSelectedPdfUrl] = useState('');
    const userId = useSelector((store: RootState) => store.UserData.UserId)
    const navigate = useNavigate()
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
    const handleclick = (id: string) => {
        setapllicants(prevId => (prevId === id ? '' : id))
    }
    const handlePdfDownload = (cvUrl: string) => {

        const anchor = document.createElement('a');
        anchor.href = cvUrl;
        anchor.download = 'resume.pdf';
        anchor.click();
    };
    const handleEdit = (postId: string) => {


        navigate(`/recruiter/editjob/${postId}`)
    }
    const handleDelete = async (postId: string) => {
        try {
            let response = await recruiterAxios.delete(recruiterendpoints.deletejob, { data: { postId } });
            if (response.data.success) {
                setjobpost(prevState => prevState.filter(job => job._id != postId))
            }
        } catch (error) {
            console.error('Error deleting job post:', error);
        }

    }
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

                    <h1 className='font-bold my-6 text-2xl'>Jobs Posted</h1>

                    {jobpost.map((post, index) => (
                        <div key={index} className='w-1/2 mx-auto my-4 bg-gray-200 shadow-md p-4 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>{post.jobrole}</span>
                                <span className='font-semibold text-lg'>{post.companyname}</span>
                                <span className='font-semibold text-lg'>{post.emptype}</span>
                                <span className='font-semibold text-lg'>{post.minexperience}-{post.maxexperience}</span>
                                <div className="flex justify-end mt-2">
                                    <img src={Edit} alt="" className='w-6 h-6 cursor-pointer' onClick={() => handleEdit(post._id)} />
                                    <img src={Delete} alt="" className='w-6 h-6 ml-2 cursor-pointer' onClick={() => handleDelete(post._id)} />
                                </div>
                                <span className='font-bold text-lg flex'>
                                    ({post.applicants?.length || 0})
                                    {post.applicants?.length > 0 && (
                                        <span className='hover:cursor-pointer ml-2 mt-2' onClick={() => handleclick(post._id)}>
                                            <img src={Navigate} alt="NavigateDown" className='w-4' />
                                        </span>
                                    )}
                                </span>
                            </div>

                            {applicants === post._id && post.applicants?.map((user: any) => (
                                <div key={user._id}>
                                    <ul className='flex justify-between w-full items-center text-left font-semibold mt-2 bg-gray-50 p-3 shadow-lg rounded-md'>
                                        <li>{user.name}</li>
                                        <li>{user.email}</li>
                                        <li>{user.mobile}</li>
                                        <span onClick={() => handlePdfDownload(user.cv)} style={{ cursor: 'pointer' }}>
                                            Download CV
                                        </span>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

            )
            }
        </div >
    )
}

export default Home

