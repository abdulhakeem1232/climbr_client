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
    const [commentError, setCommentError] = useState<string>('');
    const [page, setPage] = useState(1)
    const [CommentContent, setCommentContent] = useState('')
    const [commentPostId, setCommentPostId] = useState<string | null>(null);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const maxLength = 40;
    const userId = useSelector((store: RootState) => store.UserData.UserId)
    const avatar = useSelector((store: RootState) => store.UserData.image)
    const username = useSelector((store: RootState) => store.UserData.Username)



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
        setCommentPostId(postId);
    };
    const postComment = async (postId: string) => {
        if (CommentContent.trim() === '') {
            setCommentError('Comment cannot be empty');
            return;
        }
        await userAxios.post(endpoints.commentPost, { postId, userId, comment: CommentContent })
        setCommentContent('')
        setCommentError('');
        setPosts(prevState => prevState.map(post => {
            if (post._id === postId) {

                const updatedComments = Array.isArray(post.comments) ? [...post.comments] : [];

                updatedComments.push({
                    userData: {
                        avatar: avatar,
                        username: username,
                    },
                    content: CommentContent,
                    userId: userId,
                });

                return {
                    ...post,
                    comments: updatedComments,
                };
            }
            return post;
        }));
    }
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };
    return (
        <div className='border-2 rounded-lg border-solid border-zinc-100 p-3 bg-white mt-2 shadow-md w-full md:w-2/2 lg:w-2/2'>
            {loading ? (
                <ShimmerHome />
            ) : (
                posts && posts.map(post => (
                    <div key={post._id} className='mb-5 border-[1px] border-gray-300 rounded-xl p-2'>
                        <div className='flex mb-2 '>
                            <img src={post.userData.avatar} className='w-10 ' />
                            <h2> {post.userData.username}</h2>
                        </div>
                        <div className='text-left my-2 flex '>

                            <p className='ml-2'>  {post.description.length > maxLength && !showFullDescription ? (
                                <>
                                    {post.description.substring(0, maxLength)}...
                                    <span className="text-slate-500 cursor-pointer" onClick={toggleDescription}>
                                        {'  '}
                                        more
                                    </span>
                                </>
                            ) : (
                                <>
                                    {post.description}
                                    {post.description.length > maxLength && showFullDescription && (
                                        <span className="text-slate-500 cursor-pointer" onClick={toggleDescription}>
                                            {' '}
                                            less
                                        </span>
                                    )}
                                </>
                            )}</p>
                        </div>
                        <img src={post.image} alt='Post' className='rounded-lg' />
                        <div className='flex mt-2'>
                            {post.likes?.some((like: Like) => like.userId === userId) ? (
                                < button onClick={() => handleDislike(post._id)}>
                                    <img src={dislike} alt='Dislike' className='w-8  mr-3' />
                                </button>
                            ) : (
                                < button onClick={() => handleLike(post._id)}>
                                    <img src={like} alt='Like' className='w-8 ml-1 mr-3 ' />
                                </button>

                            )}
                            <button onClick={() => handleComment(post._id)}>
                                <img src={comment} alt='Comment' className='w-6' />
                            </button>

                        </div>
                        <p className='text-left font-semibold ml-1'>
                            {post.likes?.length || 0} Badges</p>
                        {commentPostId === post._id && (
                            <div>
                                < div className='rounded-lg border-solid border-black border-2 w-fit my-2'>

                                    <input type="text" placeholder=' comment' value={CommentContent} onChange={(e) => setCommentContent(e.target.value)}


                                        className='w-64 ml-2 h-8 outline-0 ' style={{ textAlign: 'left' }} />
                                    <button type='submit' onClick={() => postComment(post._id)} className=' text-lg mx-2' style={{ color: '#031996' }}>post</button>
                                </div>
                                {commentError && <div className="text-red-500 text-left">{commentError}</div>}
                            </div>
                        )}

                        {commentPostId === post._id && (
                            <div className='text-left my-2'>
                                {post.comments?.map((comment: any, index: number) => (
                                    <div key={index} className='flex mb-2'>
                                        <img src={comment.userData.avatar} alt="" className='w-7' />
                                        <p className='font-semibold mx-2'>{comment.userData.username}</p>
                                        <p>{comment.content}</p>

                                    </div>
                                ))}

                            </div>
                        )}

                    </div >
                ))
            )
            }
        </div >
    )
}

export default Home

