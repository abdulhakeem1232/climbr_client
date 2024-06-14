import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { endpoints, userAxios } from '../../../endpoints/userEndpoint';
import ProfileSkeleton from '../skeleton/ProfileSkelton';
import arrowDown from '../../../assets/arroeDown.png'
import arrowUp from '../../../assets/arrowUp.png'
import {
    Step, StepDescription, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, Box, useSteps,
} from '@chakra-ui/react'
import edit from '../../../assets/edit2.png';
import add from '../../../assets/add.png';
import BannerModal from './BannerModal';
import ProfileModal from './ProfileModal';
import ProfileDataModal from './ProfileDataModal';
import SkillsModal from './SkillsModal';
import EducationModal from './EducationalModal';
import ExperienceModal from './ExperienceModal';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store/store";
import ConfirmationModal from './ConfirmationModal';
import { logout } from '../../../Redux/slice/UserSlice';
import Cookies from 'js-cookie';
import LoadingWave from './Spinner';


const steps = [
    { title: 'Applied' },
    { title: 'Pending' },
    { title: 'Rejected/shortlisted' },
]
function Profile() {
    const navigate = useNavigate()
    const dispatch = useDispatch
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const { id } = useParams<{ id?: string }>();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [postIdToDelete, setPostIdToDelete] = useState<string | null>(null);
    const [sameUser, setSameUser] = useState<boolean>(false)
    const [userDetails, setUserDetails] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [postId, setPostId] = useState('')
    const [showAllAppliedJobs, setShowAllAppliedJobs] = useState(false)
    const [showAllPostedJobs, setShowAllPostedJobs] = useState(false)
    const [bannerModal, setBannerModal] = useState(false)
    const [imageModal, setImageModal] = useState(false)
    const [profileDataModal, setProfileModal] = useState(false)
    const [skillsModal, setSkillsModal] = useState(false)
    const [educationModal, setEducationModal] = useState(false)
    const [experienceModal, setExeperienceModal] = useState(false)
    const [showModal, setshowModal] = useState(false)
    const [editedDescription, setEditedDescription] = useState('');
    const [editId, seteditId] = useState('')
    const [currentUserData, setCurrentUserData] = useState<any>([]);
    function getActiveStepIndex(status: string) {
        switch (status.toLowerCase()) {
            case 'applied':
                return 0;
            case 'pending':
                return 1;
            case 'rejected':
                return 2;
            case 'shortlisted':
                return 2;
            default:
                return 0;
        }
    }
    const fetchData = async () => {
        try {
            let response = await userAxios.get(`${endpoints.userDetails}/${id}`)
            console.log(response.data);
            setUserDetails(response.data);
            if (!sameUser) {
                let currentUserResponse = await userAxios.get(`${endpoints.userFollwings}/${userId}`); { }
                setCurrentUserData(currentUserResponse.data);
                console.log(currentUserData, '=================', currentUserResponse.data);

            }
        } catch (error) {
            //@ts-ignore
            if (error.response && error.response.status === 401) {
                Cookies.remove('token');
                Cookies.remove('role');
                navigate('/')
            }
            console.error('Error fetching user details:', error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (userId === id) {
            setSameUser(true);
        }
        fetchData();
    }, [id]);
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
        setPostIdToDelete(postId);
        setShowConfirmation(true);
    }
    const message = async () => {
        try {
            let response = await userAxios.get(`${endpoints.createchats}/${userId}/${id}`)
            if (response.data.success) {
                navigate(`/chats`)
            }
        } catch (err) {
            console.log('Error while Message in profile:', err);

        }
    }
    const follow = async () => {
        {/* @ts-ignore */ }
        if (currentUserData.includes(id)) {
            setCurrentUserData((prevData: any[]) => prevData.filter((userId: string | undefined) => userId !== id));
            const response = await userAxios.get(`${endpoints.unfollow}/${userId}/${id}`)
            console.log('unfolow', response.data);

        } else {
            {/* @ts-ignore */ }
            setCurrentUserData(prevData => [...prevData, id]);
            const response = await userAxios.get(`${endpoints.follow}/${userId}/${id}`);
            console.log(response.data, 'else follow');
        }
    }
    const cancelDelete = () => {
        setShowConfirmation(false);
    };
    const confirmDelete = async () => {
        setShowConfirmation(false);
        setshowModal(false);
        let postId = postIdToDelete

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
    };


    return (
        <div className='w-full text-left mb-10'>
            {
                userDetails == null ? <LoadingWave /> :

                    < div className='w-3/5 ml-2' >
                        <div className='bg-white rounded-lg shadow-md border-2 '>
                            <div className='relative '>
                                {sameUser ? (
                                    <img src={userDetails.avatar} alt="" className='w-32 top-20 left-3 cursor-pointer rounded-full absolute' onClick={() => setImageModal(true)} />
                                ) : (
                                    <img src={userDetails.avatar} alt="" className='w-32 top-20 left-3 cursor-pointer rounded-full absolute' />
                                )}
                                {sameUser && (
                                    <img src={edit} alt="" className='absolute cursor-pointer w-6 right-1 bottom-1' onClick={() => setBannerModal(!bannerModal)} />
                                )}
                                <img src={userDetails.banner} alt="" className='h-40 w-full rounded-md' />
                            </div>
                            <BannerModal isOpen={bannerModal} onClose={() => setBannerModal(false)} currentImage={userDetails.banner} onSelectNewImage={function (newImage: File): void {
                                throw new Error('Function not implemented.');
                            }} fetchProfileData={fetchData} />
                            <ProfileModal isOpen={imageModal} onClose={() => setImageModal(false)} currentImage={userDetails.avatar} fetchProfileData={fetchData} />
                            <ProfileDataModal isOpen={profileDataModal} onClose={() => setProfileModal(false)} fetchProfileData={fetchData} />
                            <SkillsModal isOpen={skillsModal} onClose={() => setSkillsModal(false)} fetchProfileData={fetchData} />
                            <EducationModal isOpen={educationModal} onClose={() => setEducationModal(false)} fetchProfileData={fetchData} />
                            <ExperienceModal isOpen={experienceModal} onClose={() => setExeperienceModal(false)} fetchProfileData={fetchData} />

                            <div className='px-6 relative pb-3'>

                                <div className='my-auto'>
                                    <div className='font-semibold mt-14'>
                                        {userDetails.username}
                                    </div>
                                    <div className='font-semibold mt-1'>
                                        {userDetails.header}
                                    </div>
                                    <div className='text-blue-400 mt-1'>
                                        {userDetails.email} | {userDetails.mobile}
                                    </div>
                                    <div className='my-2'>
                                        {!sameUser && (
                                            <>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full" onClick={follow}>
                                                    {/* @ts-ignore */}
                                                    {id && currentUserData.includes(id) ? "Unfollow" : "Follow"}
                                                </button>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-full ml-3" onClick={message}>
                                                    Message
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div>Followings {currentUserData?.followings?.length || 0}</div>
                                <div>Followers {currentUserData?.followers?.length || 0}</div>

                                {sameUser && (
                                    <img src={edit} alt="" className='absolute w-6 cursor-pointer right-1 bottom-1' onClick={() => setProfileModal(true)} />
                                )}
                            </div>
                        </div>
                        {sameUser && (
                            <div className='mt-2 p-4 pl-6 bg-white rounded-lg shadow-md'>
                                <div className='my-2 font-semibold'>Applied Jobs:</div>
                                <div className='mb-2'>
                                    {showAllAppliedJobs
                                        ? userDetails.appliedJobs?.map((job: any, index: number) => (
                                            <div key={index} className=''>
                                                <div className='font-semibold '>
                                                    {job.jobData.jobrole} at {job.jobData.companyname}
                                                    <Stepper index={getActiveStepIndex(job.status)} >
                                                        {steps.map((step, stepIndex) => {

                                                            const isActive = getActiveStepIndex(job.status) === stepIndex;

                                                            const isCompleted = isActive || (stepIndex <= getActiveStepIndex(job.status));

                                                            return (
                                                                <Step key={index} >
                                                                    <StepIndicator>
                                                                        <StepStatus
                                                                            complete={<StepIcon />}
                                                                            incomplete={<StepNumber />}
                                                                            active={<StepNumber />}
                                                                        />
                                                                    </StepIndicator>
                                                                    <Box flexShrink='0'>
                                                                        <StepTitle>{step.title}</StepTitle>

                                                                        {isCompleted && <StepStatus complete="✔" />}

                                                                        {isActive && !isCompleted && <StepStatus active="*" />}
                                                                    </Box>
                                                                    <StepSeparator />
                                                                </Step>
                                                            );
                                                        })}
                                                    </Stepper>

                                                </div>
                                            </div>
                                        ))
                                        : userDetails.appliedJobs?.slice(0, 2)?.map((job: any, index: number) => (
                                            <div key={index} className=''>
                                                <div className='font-semibold '>
                                                    {job.jobData.jobrole} at {job.jobData.companyname}
                                                    <Stepper index={getActiveStepIndex(job.status)}>
                                                        {steps.map((step, stepIndex) => (
                                                            <Step key={stepIndex}>
                                                                <StepIndicator>
                                                                    <StepStatus
                                                                        complete={<StepIcon />}
                                                                        incomplete={<StepNumber />}
                                                                        active={job.status.toLowerCase() === step.title.toLowerCase()}
                                                                    />
                                                                </StepIndicator>
                                                                <Box flexShrink='0'>
                                                                    <StepTitle>{(job.status == 'Rejected' || job.status == 'Shortlisted') ? job.status : step.title}</StepTitle>
                                                                </Box>
                                                                <StepSeparator />
                                                            </Step>
                                                        ))}
                                                    </Stepper>
                                                </div>
                                            </div>
                                        ))}

                                </div>
                                {userDetails.appliedJobs?.length > 2 && (
                                    <button onClick={() => setShowAllAppliedJobs(!showAllAppliedJobs)} className='mt-2 flex mx-auto'>
                                        {showAllAppliedJobs ? (
                                            <div className='text-gray-500 font-semibold flex items-center'>Show Less Jobs <img src={arrowUp} alt="" className='w-6' /></div>
                                        ) : (
                                            <div className='text-gray-500 font-semibold flex items-center'>Show All Applied Jobs <img src={arrowDown} alt="" className='w-6' /></div>
                                        )}
                                    </button>
                                )}
                            </div>
                        )}
                        <div className='mt-2 p-4 pl-6 bg-white rounded-lg shadow-md'>
                            <div className='my-2 font-semibold'>Posts:</div>
                            <div className='mb-2'>
                                {userDetails.postData && userDetails.postData.length > 0 ? (
                                    <>
                                        {showAllPostedJobs
                                            ? userDetails.postData?.map((job: any, index: number) => (
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
                                            : userDetails.postData?.slice(0, 2)?.map((job: any, index: number) => (
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
                                        {userDetails.postData?.length > 2 && (
                                            <button onClick={() => setShowAllPostedJobs(!showAllPostedJobs)} className='mt-2 flex mx-auto'>
                                                {showAllPostedJobs ? (
                                                    <div className='text-gray-500 font-semibold flex items-center'>Show Less Posts <img src={arrowUp} alt="" className='w-6' /></div>
                                                ) : (
                                                    <div className='text-gray-500 font-semibold flex items-center'>Show All Posts  <img src={arrowDown} alt="" className='w-6' /></div>
                                                )}
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className='text-gray-500'>No posts available.</div>
                                )}
                            </div>
                        </div>
                        <div className='mt-2 p-4 pl-6 bg-white rounded-lg shadow-md relative'>
                            <div className='font-bold text-gray-600'>
                                Education
                            </div>
                            {sameUser && (
                                <div className='absolute right-1 top-2 cursor-pointer flex'>
                                    <img src={add} alt="" className='w-6 mr-1' onClick={() => setEducationModal(true)} />
                                    <img src={edit} alt="" className='w-6' />
                                </div>
                            )}
                            {userDetails.education && userDetails.education.length > 0 ? (
                                <div className="mt-4">
                                    {userDetails.education.map((edu: any, index: any) => (
                                        <div key={index} className="mb-4">
                                            <div><strong>School:</strong> {edu.school}</div>
                                            <div><strong>Degree:</strong> {edu.degree}</div>
                                            <div><strong>Field:</strong> {edu.field}</div>
                                            <div><strong>Started:</strong> {new Date(edu.started).toLocaleDateString()}</div>
                                            <div><strong>Ended:</strong> {new Date(edu.ended).toLocaleDateString()}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4">
                                    No education added yet.
                                </div>
                            )}
                        </div>

                        <div className='mt-2 p-4 pl-6 bg-white rounded-lg shadow-md relative'>
                            <div className='font-bold text-gray-600'>
                                Skills
                            </div>
                            {sameUser && (
                                <div className='absolute right-1 top-2 cursor-pointer flex'>
                                    <img src={add} alt="" className='w-6 mr-1' onClick={() => setSkillsModal(true)} />
                                    <img src={edit} alt="" className='w-6' />
                                </div>
                            )}
                            {userDetails.skills && userDetails.skills.length > 0 ? (
                                <div className="mt-4">
                                    {userDetails.skills.map((skill: any, index: any) => (
                                        <div key={index} className="mb-">
                                            <div><strong>{index + 1}:</strong> {skill.skill}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4">
                                    No skills added yet.
                                </div>
                            )}
                        </div>

                        <div className='mt-2 p-4 pl-6 bg-white rounded-lg shadow-md relative'>
                            <div className='font-bold text-gray-600'>
                                Experience
                            </div>
                            {sameUser && (
                                <div className='absolute right-1 top-2 cursor-pointer flex'>
                                    <img src={add} alt="" className='w-6 mr-1' onClick={() => setExeperienceModal(true)} />
                                    <img src={edit} alt="" className='w-6' />
                                </div>
                            )}
                            {userDetails.experience && userDetails.experience.length > 0 ? (
                                <div className="mt-4">
                                    {userDetails.experience.map((exp: any, index: any) => (
                                        <div key={index} className="mb-4">
                                            <div><strong>Company:</strong> {exp.company}</div>
                                            <div><strong>Degree:</strong> {exp.role}</div>
                                            <div><strong>Started:</strong> {new Date(exp.started).toLocaleDateString()}</div>
                                            <div><strong>Ended:</strong> {new Date(exp.ended).toLocaleDateString()}</div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-4">
                                    No experience added yet.
                                </div>
                            )}
                        </div>
                        <ConfirmationModal
                            show={showConfirmation}
                            onClose={cancelDelete}
                            onConfirm={confirmDelete}
                            message="Are you sure you want to delete this Post?"
                        />

                    </div >


            }
        </div >


    )
}

export default Profile;
