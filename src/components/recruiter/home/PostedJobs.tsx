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
    const [itemsPerPage] = useState(2);
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
                <div className='text-center lg:px-40'>
                    <h1 className='font-bold my-6 text-2xl'>Jobs Posted</h1>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className='border px-2 py-2'>Job Role</th>
                                <th className='border px-2 py-2'>Company Name</th>
                                <th className='border px-2 py-2'>Employment Type</th>
                                <th className='border px-2 py-2'>Experience</th>
                                <th className='border px-2 py-2'>Applicants</th>
                                <th className='border px-2 py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentJobs.map((post) => (
                                <tr key={post._id}>
                                    <td className='border px-2 py-2'>{post.jobrole}</td>
                                    <td className='border px-2 py-2'>{post.companyname}</td>
                                    <td className='border px-2 py-2'>{post.emptype}</td>
                                    <td className='border px-2 py-2'>{post.minexperience}-{post.maxexperience}</td>
                                    <td className='border px-2 py-2'>
                                        {post.applicants?.length || 0}
                                        {post.applicants?.length > 0 && (
                                            <button
                                                className='ml-2 bg-blue-500 text-white px-2 py-1 rounded'
                                                onClick={() => navigate(`/recruiter/applicants/${post._id}`)}
                                            >
                                                View Applicants
                                            </button>
                                        )}
                                    </td>
                                    <td className='border px-4 py-2'>
                                        <img src={Edit} alt="Edit" className='w-6 h-6 inline cursor-pointer' onClick={() => handleEdit(post._id)} />
                                        <img src={Delete} alt="Delete" className='w-6 h-6 inline ml-2 cursor-pointer' onClick={() => openConfirmationModal(post._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex justify-center mt-4'>
                        <button
                            onClick={handlePrevJobPage}
                            disabled={currentPage === 1}
                            className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-l-md'
                        >
                            Previous
                        </button>
                        <span className='bg-gray-200 text-gray-700 px-4 py-2'>
                            Page {currentPage} of {totalJobPages}
                        </span>
                        <button
                            onClick={handleNextJobPage}
                            disabled={currentPage === totalJobPages}
                            className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-r-md'
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
