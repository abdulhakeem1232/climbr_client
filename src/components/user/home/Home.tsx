import React, { useState, useEffect } from 'react'
import { userAxios, endpoints } from '../../../endpoints/userEndpoint'
import like from '../../../assets/like.png'
import dislike from '../../../assets/dislike.png'
import comment from '../../../assets/comment.png'
import ShimmerHome from './ShimmerHome'


function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const fetchdata = async () => {
            console.log('jom');
            try {

                let response = await userAxios.get(endpoints.getPost)
                setPosts(response.data.posts)
                console.log('------', response.data);
                setLoading(false)

            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchdata();
    }, [])
    const handleLike = (postId: string) => {

    };

    const handleDislike = (postId: string) => {

    };

    const handleComment = (postId: string) => {

    };
    return (
        <div className='border-2 rounded-lg border-solid border-zinc-100 p-3 bg-white mt-2 shadow-md w-full md:w-2/2 lg:w-2/2'>
            {loading ? (
                <ShimmerHome />
            ) : (
                // <ShimmerHome />

                posts && posts.map(post => (
                    <div key={post._id} className='mb-11 border-[1px] border-gray-300 rounded-xl p-2'>
                        <div className='flex mb-2 '>
                            <img src={post.userData.avatar} className='w-10 ' />
                            <h2> {post.userData.username}</h2>
                        </div>
                        <img src={post.image} alt='Post' className='rounded-lg' />
                        <p className='text-left mt-2'> {post.description}</p>
                        <div className='flex mt-1'>
                            <button onClick={() => handleLike(post._id)}>
                                <img src={like} alt='Like' className='w-6 ml-1 mr-3 ' />
                            </button>
                            <button onClick={() => handleDislike(post._id)}>
                                <img src={dislike} alt='Dislike' className='w-6  mr-3' />
                            </button>
                            <button onClick={() => handleComment(post._id)}>
                                <img src={comment} alt='Comment' className='w-6' />
                            </button>

                        </div>
                    </div >
                ))
            )
            }
        </div >
    )
}

export default Home

