import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { endpoints, userAxios } from '../../../endpoints/userEndpoint';
import ProfileSkeleton from '../skeleton/ProfileSkelton';
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    Box,
    useSteps,
} from '@chakra-ui/react'

const steps = [
    { title: 'Applied', description: 'Contact Info' },
    { title: 'Reviewed', description: 'Date & Time' },
    { title: 'Rejecetd', description: 'Select Rooms' },
]
function Profile() {
    const { id } = useParams<{ id: string }>();
    const [userDetails, setUserDetails] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [postId, setPostId] = useState('')
    const [showAllAppliedJobs, setShowAllAppliedJobs] = useState(false)
    const [showAllPostedJobs, setShowAllPostedJobs] = useState(false)

    const [showModal, setshowModal] = useState(false)
    const [editedDescription, setEditedDescription] = useState('');
    const [editId, seteditId] = useState('')
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    })
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await userAxios.get(`${endpoints.userDetails}/${id}`)
                console.log(response.data);
                setUserDetails(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);
    const handleEllipsisClick = (event: React.MouseEvent<HTMLSpanElement>, postId: string) => {
        event.stopPropagation();
        setPostId(postId);
        setshowModal(!showModal);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.options')) {
                setshowModal(false);
            }

        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleEdit = async (postId: string, description: string) => {
        seteditId(postId)
        setEditedDescription(description)
    }
    const makeEdit = async (postId: string, description: string) => {
        try {
            setUserDetails((prevState: { postData: any[]; }) => ({
                ...prevState,
                postData: prevState.postData.map((post: any) =>
                    post._id === postId ? { ...post, description: description } : post
                )
            }));
            let response = await userAxios.put(`${endpoints.editpost}/${postId}`, { description })
            console.log(response.data);
        } catch (err) {
            console.log('Error during edit', err);

        }
    }
    const handleDelete = async (postId: string) => {
        try {
            setUserDetails((prevState: { postData: any[]; }) => {
                const updatedPosts = prevState.postData.filter((post: any) => post._id !== postId);
                return { ...prevState, postData: updatedPosts };
            });
            let response = await userAxios.post(endpoints.deletePost, { postId })
            console.log(response.data);
        } catch (err) {
            console.log('Error during delete', err);

        }
    }

    return (
        <div className='w-full  text-left '>
            {
                userDetails == null ? <ProfileSkeleton /> : < div className='' >
                    <div className='bg-white rounded-lg shadow-md border-2'>
                        <div className='p-4'>


                            <img src={userDetails.avatar} alt="" className='w-32 rounded-full ' />
                            <div className='my-auto'>
                                <div className='font-semibold mt-1'>
                                    {userDetails.username}
                                </div>
                                <div className='text-blue-400 mt-1'>
                                    {userDetails.email} | {userDetails.mobile}
                                </div>
                                {/* <div className='my-2'>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full">
                                        Connect +
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full ml-3">
                                        Mesaage
                                    </button>
                                </div> */}
                            </div>
                            <div>
                                skills
                            </div>
                            <div>
                                Education
                            </div>
                        </div>
                    </div>


                    <div className='mt-2 p-4 bg-white rounded-lg shadow-md'>
                        <div className='my-2 font-semibold'>Applied Jobs:</div>
                        <div className='mb-2'>
                            {showAllAppliedJobs
                                ? userDetails.appliedJobs.map((job: any, index: number) => (
                                    <div key={index}>
                                        {job.jobData.jobrole} at {job.jobData.companyname} Status:{job.status}
                                    </div>
                                ))
                                : userDetails.appliedJobs.slice(0, 2).map((job: any, index: number) => (
                                    <div key={index} className=''>
                                        <div className='font-semibold '>
                                            {job.jobData.jobrole} at {job.jobData.companyname}
                                            <Stepper index={activeStep}>
                                                {steps.map((step, index) => (
                                                    <Step key={index}>
                                                        <StepIndicator>
                                                            <StepStatus
                                                                complete={<StepIcon />}
                                                                incomplete={<StepNumber />}
                                                                active={<StepNumber />}
                                                            />
                                                        </StepIndicator>

                                                        <Box flexShrink='0'>
                                                            <StepTitle>{step.title}</StepTitle>

                                                        </Box>

                                                        <StepSeparator />
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        </div>
                                    </div>



                                ))}
                            {userDetails.appliedJobs.length > 2 && (
                                <button onClick={() => setShowAllAppliedJobs(!showAllAppliedJobs)} className='mt-2 flex mx-auto'>
                                    {showAllAppliedJobs ? (
                                        <div className='text-gray-500 font-semibold'>Show Less Jobs ⬆</div>
                                    ) : (
                                        <div className='text-gray-500 font-semibold'>Show All Applied Jobs ⬇</div>
                                    )}
                                </button>
                            )}
                        </div>
                        <hr />

                        <div className='my-2 font-semibold'>Posts:</div>
                        <div className='mb-2'>
                            {showAllPostedJobs
                                ? userDetails.postData.map((job: any, index: number) => (
                                    <div key={index} className='py-2'>
                                        <div className='flex'>
                                            <img src={job.image} alt="" className='rounded-md w-2/4 mr-3' />
                                            {job._id == editId ? (
                                                <div>
                                                    <input
                                                        type='text'
                                                        value={editedDescription}
                                                        onChange={e => setEditedDescription(e.target.value)}
                                                        autoFocus
                                                        className='rounded-md w-full mr-3 h-12'
                                                    />
                                                    <button onClick={() => makeEdit(job._id, editedDescription)}>Edit</button>
                                                </div>
                                            ) : job.description}
                                            <span className='ml-auto cursor-pointer' onClick={(event) => handleEllipsisClick(event, job._id)}>...</span>
                                            {postId == job._id && showModal && (
                                                <div className='options'>
                                                    <ul className='absolute mt-5 bg-white'>
                                                        <li onClick={() => handleEdit(job._id, job.description)} className='cursor-pointer'>Edit</li>
                                                        <hr />
                                                        <li onClick={() => handleDelete(job._id)} className='cursor-pointer'>Delete</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                                : userDetails.postData.slice(0, 2).map((job: any, index: number) => (
                                    <div key={index} className='py-2'>
                                        <div className='flex'>
                                            <img src={job.image} alt="" className='rounded-md w-2/4 mr-3' />
                                            {job._id == editId ? (
                                                <div>
                                                    <input
                                                        type='text'
                                                        value={editedDescription}
                                                        onChange={e => setEditedDescription(e.target.value)}
                                                        autoFocus
                                                        className='rounded-md w-full mr-3 h-12'
                                                    />
                                                    <button onClick={() => makeEdit(job._id, editedDescription)}>Edit</button>
                                                </div>
                                            ) : job.description}
                                            <span className='ml-auto cursor-pointer' onClick={(event) => handleEllipsisClick(event, job._id)}>...</span>
                                            {postId == job._id && showModal && (
                                                <div className='options'>
                                                    <ul className='absolute mt-5 bg-white'>
                                                        <li onClick={() => handleEdit(job._id, job.description)} className='cursor-pointer'>Edit</li>
                                                        <hr />
                                                        <li onClick={() => handleDelete(job._id)} className='cursor-pointer'>Delete</li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            {userDetails.postData.length > 2 && (
                                <button onClick={() => setShowAllPostedJobs(!showAllPostedJobs)} className='mt-2 flex mx-auto'>
                                    {showAllPostedJobs ? (
                                        <div className='text-gray-500 font-semibold'>Show Less Posts ⬆</div>
                                    ) : (
                                        <div className='text-gray-500 font-semibold'>Show All Posts ⬇</div>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                </div>
            }
        </div >


    )
}

export default Profile;
