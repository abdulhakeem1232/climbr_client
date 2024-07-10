import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';
import Edit from '../../../assets/edit.png';
import Delete from '../../../assets/delete.png';
import ConfirmationModal from '../../user/home/ConfirmationModal';
import { recruiterAxios } from '../../../utils/Config';

function PostedJobs() {
    const [jobpost, setJobPost] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [jobIdToDelete, setJobIdToDelete] = useState<string | null>(null);
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('useEffect');
                let response = await recruiterAxios.get(`${recruiterendpoints.getjob}/${userId}`);
                setJobPost(response.data.jobs);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchData();
    }, [userId]);



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

    return (
        <div className=''>
            {jobpost?.length === 0 || jobpost == undefined ? (
                <div className='flex flex-col justify-center h-screen items-center '>
                    <p className='text-3xl leading-normal'>Welcome You Don't <br />Any job post.
                        Post hiring <br />Details to Hire quality candidate</p>
                    <Link to='/recruiter/newJob'> <button className='mt-3 bg-green-500 hover:bg-green-600 rounded-full px-5 py-2.5 text-center'>Add Job Post</button></Link>
                </div>
            ) : (
                <div className='text-center lg:px-40 bg-gray-100 py-8'>
                    <h1 className='font-bold py-8 text-3xl text-indigo-800'>Jobs Posted</h1>
                    <div className='overflow-x-auto shadow-lg rounded-lg'>
                        <table className='w-full table-auto'>
                            <thead className='bg-indigo-900 text-white'>
                                <tr>
                                    <th className='px-4 py-3'>Job Role</th>
                                    <th className='px-4 py-3'>Company Name</th>
                                    <th className='px-4 py-3'>Employment Type</th>
                                    <th className='px-4 py-3'>Experience</th>
                                    <th className='px-4 py-3'>Applicants</th>
                                    <th className='px-4 py-3'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white'>
                                {currentJobs.map((post) => (
                                    <tr key={post._id} className='hover:bg-indigo-50 transition-colors'>
                                        <td className='border-b border-indigo-100 px-4 py-3'>{post.jobrole}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3'>{post.companyname}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3'>{post.emptype}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3'>{post.minexperience}-{post.maxexperience}</td>
                                        <td className='border-b border-indigo-100 px-4 py-3'>
                                            <span className='font-semibold text-indigo-700 '>{post.applicants?.length || 0}</span>
                                            {post.applicants?.length > 0 && (
                                                <button
                                                    className='ml-3 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full text-sm transition-colors'
                                                    onClick={() => navigate(`/recruiter/applicants/${post._id}`)}
                                                >
                                                    View Applicants
                                                </button>
                                            )}
                                        </td>
                                        <td className='border-b border-indigo-100 px-4 py-3'>
                                            <button onClick={() => handleEdit(post._id)} className='text-indigo-500 hover:text-indigo-700 mr-3 transition-colors'>
                                                <img src={Edit} alt="Edit" className='w-5 h-5 inline' />
                                            </button>
                                            <button onClick={() => openConfirmationModal(post._id)} className='text-red-500 hover:text-red-700 transition-colors'>
                                                <img src={Delete} alt="Delete" className='w-5 h-5 inline' />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={handlePrevJobPage}
                            disabled={currentPage === 1}
                            className='bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-4 py-2 rounded-l transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            Previous
                        </button>
                        <span className='bg-white border-t border-b border-indigo-700 text-indigo-800 font-bold px-4 py-2'>
                            Page {currentPage} of {totalJobPages}
                        </span>
                        <button
                            onClick={handleNextJobPage}
                            disabled={currentPage === totalJobPages}
                            className='bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-4 py-2 rounded-r transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
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

export default PostedJobs;
