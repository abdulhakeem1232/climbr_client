import React, { useState, useEffect } from 'react'
import { adminendpoints } from '../../../endpoints/adminendpoints'
import Delete from '../../../assets/delete.png'
import Navigate from '../../../assets/naigateDown.png'
import ConfirmationModal from '../../user/home/ConfirmationModal'
import { adminAxios } from '../../../utils/Config'

function Post() {
    const [posts, setPosts] = useState<any[]>([])
    const [report, setReport] = useState('')
    const [postId, setPostId] = useState('')
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            let response = await adminAxios.get(adminendpoints.post)
            console.log(response);
            setPosts(response.data.posts)
        }
        fetchData();
    }, [])
    const handleDelete = async () => {
        try {
            let response = await adminAxios.delete(`${adminendpoints.deletePost}/${postId}`)
            console.log(response.data);
            setShowModal(false)
            setPosts(prevState => prevState.filter(post => post._id !== postId))
        } catch (error) {
            console.log("Error While Deleting Reported Post :", error);
        }

    }
    const handleclick = (postId: string) => {
        setReport(prevId => (prevId === postId ? '' : postId))
    }
    const handleConfirmation = (postId: string) => {
        setShowModal(true);
        setPostId(postId);
    }
    return (
        <div>
            {posts?.length == 0 ? <div>No Post Is Reported</div> : <div>
                {posts?.map((post, index) => (
                    <div key={index} className='w-1/2 mx-auto my-4 bg-gray-300 shadow-md p-4 rounded-lg'>
                        <h1 className='my-4 text-3xl font-bold text-gray-800'>Post Management</h1>
                        <div className='flex justify-between items-center'>
                            <span className='font-semibold text-lg'> No of Reports:{post.reported.length}</span>
                            <div className="flex justify-end mt-2">

                                <img src={Delete} alt="" className='w-6 h-6 ml-2 cursor-pointer' onClick={() => handleConfirmation(post._id)} />
                            </div>
                            <span className='font-bold text-lg flex'>
                                ({post.reported?.length || 0})
                                {post.reported?.length > 0 && (
                                    <span className='hover:cursor-pointer ml-2 mt-2' onClick={() => handleclick(post._id)}>
                                        <img src={Navigate} alt="NavigateDown" className='w-4' />
                                    </span>
                                )}
                            </span>
                        </div>

                        {report === post._id && post.reported?.map((report: any) => (
                            <div key={report._id}>
                                <div className='flex'>
                                    <img src={post.image} alt="" className='w-24 mr-3' />
                                    {post.description}
                                </div>
                                <ul className='flex justify-between w-full items-center text-left font-semibold mt-2 bg-gray-50 p-3 shadow-lg rounded-md'>
                                    <li>{report.userData.username}</li>
                                    <li>{report.reason}</li>
                                    <li>{report.mobile}</li>

                                </ul>
                            </div>
                        ))}
                    </div>
                ))}
            </div>}
            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                message={"Are You sure You need to Delete Post"} />
        </div>
    )
}

export default Post

