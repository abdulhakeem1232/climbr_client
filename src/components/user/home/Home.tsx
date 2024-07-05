import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { endpoints } from "../../../endpoints/userEndpoint";
import { userAxios } from '../../../utils/Config';
import like from "../../../assets/like.png";
import dislike from "../../../assets/dislike.png";
import comment from "../../../assets/comment.png";
import ShimmerHome from "../../skeleton/ShimmerHome";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slice/UserSlice';
import { RootState } from '../../../Redux/store/store';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import ConfirmationModal from "./ConfirmationModal";
import Modal from "./UserListModal";
import { formatDistanceToNowStrict } from 'date-fns';

interface Like {
  userId: string;
  createdAt: Date;
}

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentId, setCommentId] = useState('');
  const [commentOptions, setCommentoptions] = useState(false);
  const [commentError, setCommentError] = useState<string>("");
  const [page, setPage] = useState(1);
  const [CommentContent, setCommentContent] = useState("");
  const [commentPostId, setCommentPostId] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [optionReport, setOptionReport] = useState(false);
  const [reportId, setReportId] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteCommentInfo, setDeleteCommentInfo] = useState({ postId: '', commentId: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserIds, setModalUserIds] = useState<string[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const maxLength = 4;
  const userId = useSelector((store: RootState) => store.UserData.UserId);
  const avatar = useSelector((store: RootState) => store.UserData.image);
  const username = useSelector((store: RootState) => store.UserData.Username);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let response = await userAxios.get(
          `${endpoints.getPost}?limit=2&page=${page}`
        );
        console.log("posts", response.data);

        setPosts((prevPosts) =>
          page === 1
            ? [...response.data.posts]
            : [...prevPosts, ...response.data.posts]
        );
        setLoading(false);
      } catch (error) {
        //@ts-ignore
        if (error.response && error.response.status === 401) {
          dispatch(logout());
          Cookies.remove('token');
          Cookies.remove('role');
          navigate('/');
        }
        console.error("Error fetching posts:", error);
      }
    };
    fetchdata();
  }, [page]);

  const handlescroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  const handleLike = async (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
            ...post,
            likes: Array.isArray(post.likes)
              ? [
                ...post.likes,
                {
                  userId,
                  createdAt: new Date(),
                },
              ]
              : [{ userId, createdAt: new Date() }],
          }
          : post
      )
    );
    let response = await userAxios.post(endpoints.likePost, { userId, postId });
    console.log("like response", response);
  };
  const handleDislike = async (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
            ...post,
            likes: post.likes.filter((like: Like) => like.userId !== userId),
          }
          : post
      )
    );
    let response = await userAxios.post(endpoints.DislikePost, {
      userId,
      postId,
    });
    console.log("Dislike response", response);
  };

  const handleComment = (postId: string) => {
    setCommentPostId(postId);
  };

  const handleReport = (postId: string) => {
    setShowReport(true);
    setReportId(postId);
  };

  const postComment = async (postId: string) => {
    if (CommentContent.trim() === "") {
      setCommentError("Comment cannot be empty");
      return;
    }
    let result = await userAxios.post(endpoints.commentPost, {
      postId,
      userId,
      comment: CommentContent,
    });
    console.log('came comment op', result);

    setCommentContent("");
    setCommentError("");
    setPosts((prevState) =>
      prevState.map((post) => {
        if (post._id === postId) {
          const updatedComments = Array.isArray(post.comments)
            ? [...post.comments]
            : [];

          updatedComments.push({
            userData: {
              avatar: avatar,
              username: username,
            },
            content: CommentContent,
            userId: userId,
            _id: result.data?.comments[result.data?.comments?.length - 1]._id,
          });

          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      })
    );
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleliekduser = (postId: string) => {
    const postDetails = posts.filter(post => post._id == postId)
    const likedIds = postDetails[0].likes.map((like: Like) => like.userId)
    setModalUserIds(likedIds)
    setModalTitle('Liked Users');
    setIsModalOpen(true);
  }
  const showOptions = (postId: string, commentId: string) => {
    setCommentoptions(true);
    setCommentId(commentId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        setCommentoptions(false);
      }
      if (!target.closest('.report-popup')) {
        setShowReport(false);
        setOptionReport(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleDeleteComment = (postId: string, commentId: string) => {
    setDeleteCommentInfo({ postId, commentId });
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteComment = async () => {
    const { postId, commentId } = deleteCommentInfo;
    try {
      const response = await userAxios.delete(`${endpoints.deleteComment}`, {
        data: {
          postId: postId,
          commentId: commentId,
        },
      });
      console.log("Delete comment response:", response);
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === postId) {
            const updatedComments = post.comments.filter(
              (comment: any) => comment._id !== commentId
            );
            return {
              ...post,
              comments: updatedComments,
            };
          }
          return post;
        })
      );
      setCommentoptions(false);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const sendReport = async (postId: string, reason: string) => {
    setShowReport(false);
    setOptionReport(false);
    toast.success('Request sent successfully', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    let response = await userAxios.post(endpoints.reportPost, { postId: postId, userId: userId, reason: reason });
    console.log(response.data);
  };

  function timeSince(date: string) {
    const now = new Date();
    const secondsPast = (now.getTime() - new Date(date).getTime()) / 1000;

    if (secondsPast < 60) {
      return `${Math.round(secondsPast)}s`;
    }
    if (secondsPast < 3600) {
      return `${Math.round(secondsPast / 60)}m`;
    }
    if (secondsPast < 86400) {
      return `${Math.round(secondsPast / 3600)}h`;
    }
    return `${Math.round(secondsPast / 86400)}d`;
  }

  return (
    <div className="border-2 rounded-lg border-solid border-zinc-100 p-3 bg-white mt-2 shadow-md w-full md:w-2/2 lg:w-2/2">
      {loading ? (
        <ShimmerHome />
      ) : (
        posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className="mb-5 border-[1px] border-gray-300 rounded-xl p-2"
          >
            <div className="flex mb-2 pr-2 justify-between">
              <Link to={`/profile/${post.userData._id}`}>
                <div className="flex">
                  <img src={post.userData.avatar} className="w-10 rounded-full h-10" />
                  <div className="ml-1 mt-1 text-left">
                    <h2>{post.userData.username}</h2>
                    <span className="text-gray-500 text-sm">{timeSince(post.createdAt)}</span>
                  </div>
                </div>
              </Link>
              <div className="report-popup">
                {post.userData._id !== userId && <span className="text-lg text-gray-500 cursor-pointer" onClick={() => handleReport(post._id)}>...</span>}
                {showReport && reportId === post._id && <div className="absolute bg-white text-gray-600 p-1 rounded-md shadow-md mt-1 cursor-pointer" onClick={() => setOptionReport(true)}>Report</div>}
                {optionReport && reportId === post._id && <div className="absolute bg-white text-gray-600 p-1 rounded-md shadow-md mt-1">
                  <div>
                    <ul>
                      <li className='cursor-pointer' onClick={() => sendReport(post._id, 'Inappropriate Content')}>Inappropriate Content</li>
                      <hr />
                      <li className='cursor-pointer' onClick={() => sendReport(post._id, 'Spam or Scams')}>Spam or Scams</li>
                      <hr />
                      <li className='cursor-pointer' onClick={() => sendReport(post._id, 'Other')}>Other</li>
                    </ul>
                  </div>
                </div>}
              </div>
            </div>
            <div className="text-left my-2 flex">
              <p className="ml-2">
                {post.description?.length > maxLength && !showFullDescription ? (
                  <>
                    {post.description.substring(0, maxLength)}...
                    <span
                      className="text-slate-500 cursor-pointer"
                      onClick={toggleDescription}
                    >
                      {"  "}
                      more
                    </span>
                  </>
                ) : (
                  <>
                    {post.description}
                    {post.description?.length > maxLength &&
                      showFullDescription && (
                        <span
                          className="text-slate-500 cursor-pointer"
                          onClick={toggleDescription}
                        >
                          {" "}
                          less
                        </span>
                      )}
                  </>
                )}
              </p>
            </div>
            <img src={post.image} alt="Post" className="rounded-lg" />
            <div className="flex mt-2">
              {post.likes?.some((like: Like) => like.userId === userId) ? (
                <button onClick={() => handleDislike(post._id)}>
                  <img src={dislike} alt="Dislike" className="w-8  mr-3" />
                </button>
              ) : (
                <button onClick={() => handleLike(post._id)}>
                  <img src={like} alt="Like" className="w-8 ml-1 mr-3 " />
                </button>
              )}
              <button onClick={() => handleComment(post._id)}>
                <img src={comment} alt="Comment" className="w-6" />
              </button>
            </div>
            <p className="text-left font-semibold ml-1 cursor-pointer" onClick={() => handleliekduser(post._id)}>
              {post.likes?.length || 0} Badges
            </p>
            {commentPostId === post._id && (
              <div>
                <div className="rounded-lg border-solid border-black border-2 w-fit my-2">
                  <input
                    type="text"
                    placeholder=" comment"
                    value={CommentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="w-3/4 h-8 focus:outline-none focus:border-none outline-white"
                    style={{ textAlign: "left" }}
                  />
                  <button
                    type="submit"
                    onClick={() => postComment(post._id)}
                    className=" text-lg mx-2"
                    style={{ color: "#031996" }}
                  >
                    post
                  </button>
                </div>
                {commentError && (
                  <div className="text-red-500 text-left">{commentError}</div>
                )}
              </div>
            )}
            {commentPostId === post._id && (
              <div className="text-left my-2">
                {post.comments?.map((comment: any, index: number) => (
                  <div key={index} className="flex mb-2 justify-between pr-3">
                    <div>
                      <Link to={`/profile/${comment.userData._id}`} className="flex">
                        <img
                          src={comment.userData.avatar}
                          alt=""
                          className="w-7 h-7 rounded-full"
                        />
                        <p className="font-semibold mx-2">
                          {comment.userData.username}
                        </p>
                        <p className="text-gray-500 text-xs my-auto">
                          {`${formatDistanceToNowStrict(new Date(comment.createdAt), { addSuffix: true })}`}

                        </p>
                      </Link>
                      <p>{comment.content}</p>

                    </div>
                    {comment.userId === userId && (
                      <div className="dropdown text-xl text-gray-800">
                        <button
                          onClick={() => showOptions(post._id, comment._id)}
                        >
                          ...
                        </button>
                        {commentOptions && commentId === comment._id && (
                          <div className="absolute mt-1 bg-white shadow-md rounded-md p-1 text-xs">
                            <ul>
                              <li className="cursor-pointer" onClick={() => handleDeleteComment(post._id, comment._id)}>Delete</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      )
      }
      <ToastContainer />
      <ConfirmationModal
        show={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeleteComment}
        message={"Are You sure You need to delete Comment"} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userIds={modalUserIds}
        title={modalTitle}
      />
    </div >
  );
}

export default Home;
