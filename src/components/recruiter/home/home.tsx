import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import Navigate from '../../../assets/naigateDown.png';
import Edit from '../../../assets/edit.png';
import Delete from '../../../assets/delete.png';
import ConfirmationModal from '../../user/home/ConfirmationModal';
import { recruiterAxios } from '../../../utils/Config';

function Home() {
    const [jobpost, setJobPost] = useState<any[]>([]);
    const [applicants, setApplicants] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(2);

    const [applicantsPage, setApplicantsPage] = useState(1);
    const [applicantsPerPage] = useState(1);

    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);

    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect');
                let response = await recruiterAxios.get(`${recruiterendpoints.getjob}/${userId}`);
                console.log(response, 'response');
                setJobPost(response.data.jobs);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchData();
    }, [userId]);

    const handleClick = (id: string) => {
        setApplicants(prevId => (prevId === id ? '' : id));
        setApplicantsPage(1);
    };

    const handlePdfDownload = (cvUrl: string) => {
        const anchor = document.createElement('a');
        anchor.href = cvUrl;
        anchor.download = 'resume.pdf';
        anchor.click();
    };

    const handleEdit = (postId: string) => {
        navigate(`/recruiter/editjob/${postId}`);
    };

    const handleDelete = async () => {
        if (jobIdToDelete) {
            try {
                let response = await recruiterAxios.delete(recruiterendpoints.deletejob, { data: { postId: jobIdToDelete } });
                if (response.data.success) {
                    setJobPost(prevState => prevState.filter(job => job._id !== jobIdToDelete));
                    setShowConfirmation(false);
                    setJobIdToDelete(null);
                }
            } catch (error) {
                console.error('Error deleting job post:', error);
            }
        }
    };

    const openConfirmationModal = (postId: string) => {
        setJobIdToDelete(postId);
        setShowConfirmation(true);
    };

    const closeConfirmationModal = () => {
        setShowConfirmation(false);
        setJobIdToDelete(null);
    };

    const indexOfLastJob = currentPage * itemsPerPage;
    const indexOfFirstJob = indexOfLastJob - itemsPerPage;
    const currentJobs = jobpost.slice(indexOfFirstJob, indexOfLastJob);

    const totalJobPages = Math.ceil(jobpost.length / itemsPerPage);

    const handleNextJobPage = () => {
        if (currentPage < totalJobPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevJobPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const currentApplicants = jobpost.find(job => job._id === applicants)?.applicants || [];
    const indexOfLastApplicant = applicantsPage * applicantsPerPage;
    const indexOfFirstApplicant = indexOfLastApplicant - applicantsPerPage;
    const paginatedApplicants = currentApplicants.slice(indexOfFirstApplicant, indexOfLastApplicant);

    const totalApplicantPages = Math.ceil(currentApplicants.length / applicantsPerPage);

    const handleNextApplicantPage = () => {
        if (applicantsPage < totalApplicantPages) {
            setApplicantsPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevApplicantPage = () => {
        if (applicantsPage > 1) {
            setApplicantsPage(prevPage => prevPage - 1);
        }
    };

    return (
        <div className=''>
            {jobpost?.length === 0 || jobpost == undefined ? (
                <div className='flex flex-col justify-center h-screen items-center '>
                    <p className='text-3xl leading-normal'>Welcome You Don't <br />Any job post.
                        Post hiring <br />Details to Hire quality candidate</p>
                    <Link to='/recruiter/newJob'> <button className='mt-3 bg-green-500 hover:bg-green-600 rounded-full px-5 py-2.5 text-center'>Add Job Post</button></Link>
                </div>
            ) : (
                <div className='text-center'>
                    <h1 className='font-bold my-6 text-2xl'>Jobs Posted</h1>
                    {currentJobs.map((post, index) => (
                        <div key={index} className='w-1/2 mx-auto my-4 bg-gray-200 shadow-md p-4 rounded-lg'>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-lg'>{post.jobrole}</span>
                                <span className='font-semibold text-lg'>{post.companyname}</span>
                                <span className='font-semibold text-lg'>{post.emptype}</span>
                                <span className='font-semibold text-lg'>{post.minexperience}-{post.maxexperience}</span>
                                <div className="flex justify-end mt-2">
                                    <img src={Edit} alt="" className='w-6 h-6 cursor-pointer' onClick={() => handleEdit(post._id)} />
                                    <img src={Delete} alt="" className='w-6 h-6 ml-2 cursor-pointer' onClick={() => openConfirmationModal(post._id)} />
                                </div>
                                <span className='font-bold text-lg flex'>
                                    ({post.applicants?.length || 0})
                                    {post.applicants?.length > 0 && (
                                        <span className='hover:cursor-pointer ml-2 mt-2' onClick={() => handleClick(post._id)}>
                                            <img src={Navigate} alt="NavigateDown" className='w-4' />
                                        </span>
                                    )}
                                </span>
                            </div>

                            {applicants === post._id && paginatedApplicants.map((user: any) => (
                                <div key={user._id}>
                                    <ul className='flex justify-between w-full items-center text-left font-semibold mt-2 bg-gray-50 p-3 shadow-lg rounded-md'>
                                        <li>{user.name}</li>
                                        <li>{user.email}</li>
                                        <span onClick={() => handlePdfDownload(user.cv)} style={{ cursor: 'pointer' }}>
                                            Download CV
                                        </span>
                                        <li>{user.status == "Applied" && <> <button className='bg-red-500 mr-2 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-md'> Reject</button>
                                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded-md'>Shortlist</button></>}</li>
                                    </ul>
                                </div>
                            ))}
                            {applicants === post._id && currentApplicants.length > applicantsPerPage && (
                                <div className='flex justify-center mt-4'>
                                    <button onClick={handlePrevApplicantPage} disabled={applicantsPage === 1} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-l-md'>
                                        Previous
                                    </button>
                                    <span className='bg-gray-200 text-gray-700 px-4 py-2'>
                                        Page {applicantsPage} of {totalApplicantPages}
                                    </span>
                                    <button onClick={handleNextApplicantPage} disabled={applicantsPage === totalApplicantPages} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md'>
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                    <div className='flex justify-center mt-4 '>
                        <button onClick={handlePrevJobPage} disabled={currentPage === 1} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-l-md'>
                            Previous
                        </button>
                        <span className='bg-gray-200 text-gray-700 px-4 py-2'>
                            Page {currentPage} of {totalJobPages}
                        </span>
                        <button onClick={handleNextJobPage} disabled={currentPage === totalJobPages} className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md'>
                            Next
                        </button>
                    </div>
                </div>
            )
            }
            <ConfirmationModal
                show={showConfirmation}
                onClose={closeConfirmationModal}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this job post?"
            />
        </div >
    );
}

export default Home;
