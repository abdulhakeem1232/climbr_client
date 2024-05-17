import React, { useState, useEffect } from 'react'
import { userAxios, endpoints } from '../../../endpoints/userEndpoint'
import like from '../../../assets/like.png'
import dislike from '../../../assets/dislike.png'
import comment from '../../../assets/comment.png'
import ShimmerHome from './ShimmerHome'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
interface Like {
    userId: string;
    createdAt: Date;
}

function Home() {
    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const userId = useSelector((store: RootState) => store.UserData.UserId)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                let response = await userAxios.get(`${endpoints.getPost}?limit=2&page=${page}`)
                console.log('posts', response.data);

                setPosts(prevPosts => page === 1 ? [...response.data.posts] : [...prevPosts, ...response.data.posts]);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        }
        fetchdata();
    }, [page])
    const handlescroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setPage(prev => prev + 1)
        }

    }
    useEffect(() => {
        window.addEventListener("scroll", handlescroll)
        return () => window.removeEventListener('scroll', handlescroll)
    }, [])
    const handleLike = async (postId: string) => {
        setPosts(prevPosts => prevPosts.map(post =>
            post._id == postId ? {
                ...post, likes: Array.isArray(post.likes) ? [...post.likes, {
                    userId, createdAt: new Date()
                }] : [{ userId, createdAt: new Date() }]
            } : post)
        )
        let response = await userAxios.post(endpoints.likePost, { userId, postId })
        console.log('like response', response);
    };

    const handleDislike = async (postId: string) => {
        setPosts(prevPosts => prevPosts.map((post) => post._id == postId ? {
            ...post, likes: post.likes.filter((like: Like) => like.userId !== userId)
        } : post)
        )
        let response = await userAxios.post(endpoints.DislikePost, { userId, postId })
        console.log('Dislike response', response);
    };

    const handleComment = (postId: string) => {

    };
    return (
        <div className='border-2 rounded-lg border-solid border-zinc-100 p-3 bg-white mt-2 shadow-md w-full md:w-2/2 lg:w-2/2'>
            {loading ? (
                <ShimmerHome />
            ) : (
                posts && posts.map(post => (
                    <div key={post._id} className='mb-11 border-[1px] border-gray-300 rounded-xl p-2'>
                        <div className='flex mb-2 '>
                            <img src={post.userData.avatar} className='w-10 ' />
                            <h2> {post.userData.username}</h2>
                        </div>
                        <img src={post.image} alt='Post' className='rounded-lg' />
                        <p className='text-left mt-2'> {post.description}</p>
                        <div className='flex mt-1'>
                            {post.likes?.some((like: Like) => like.userId === userId) ? (
                                < button onClick={() => handleDislike(post._id)}>
                                    <img src={dislike} alt='Dislike' className='w-6  mr-3' />
                                </button>
                            ) : (
                                < button onClick={() => handleLike(post._id)}>
                                    <img src={like} alt='Like' className='w-6 ml-1 mr-3 ' />
                                </button>

                            )}
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

