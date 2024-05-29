import React, { useState, useEffect } from 'react'
import { adminAxios, adminendpoints } from '../../../endpoints/adminendpoints'
import Delete from '../../../assets/delete.png'
import Navigate from '../../../assets/naigateDown.png'

function Post() {
    const [posts, setPosts] = useState<any[]>([])
    const [report, setReport] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            let response = await adminAxios.get(adminendpoints.post)
            console.log(response);
            setPosts(response.data.posts)
        }
        fetchData();
    }, [])
    const handleDelete = (postId: string) => {

    }
    const handleclick = (postId: string) => {
        setReport(prevId => (prevId === postId ? '' : postId))
    }
    return (
        <div>
            {posts?.length == 0 ? <div>No Post Is Reported</div> : <div>
                {posts?.map((post, index) => (
                    <div key={index} className='w-1/2 mx-auto my-4 bg-gray-300 shadow-md p-4 rounded-lg'>
                        <div className='flex justify-between items-center'>
                            <span className='font-semibold text-lg'> No of Reports:{post.reported.length}</span>
                            <div className="flex justify-end mt-2">

                                <img src={Delete} alt="" className='w-6 h-6 ml-2 cursor-pointer' onClick={() => handleDelete(post._id)} />
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
        </div>
    )
}

export default Post

