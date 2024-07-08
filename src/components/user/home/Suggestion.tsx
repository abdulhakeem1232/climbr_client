import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../../Redux/store/store';
import { endpoints } from '../../../endpoints/userEndpoint';
import SuggestionSkeleton from '../../skeleton/SuggestionSkeleton';
import { userAxios } from '../../../utils/Config';

const Suggestion: React.FC = React.memo(() => {
    const [suggestedUsers, setSuggestedUsers] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await userAxios.get(`${endpoints.getSuggestion}/${userId}`)
                setSuggestedUsers(response.data.users)
                console.log(response.data, 'ppppppppppppppppp');

            } catch (err) {
                console.log("Error During fetch user Data in suggestion", err);
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    }, [])
    return (

        < div className='mt-2  py-4 px-4 hidden md:block border shadow-xl bg-white rounded-lg mr-14' >
            <h2 className='font-semibold text-ellipsis text-lg text-left'>Suggestion </h2>
            {loading ? (
                <div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <SuggestionSkeleton key={index} />
                    ))}
                </div>
            ) :
                suggestedUsers?.length > 0 ? (
                    suggestedUsers.map((user) => (
                        <div key={user._id} className=" flex items-center mt-3">
                            <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                            <div className="ml-2 flex-1">
                                <h4 className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis text-left">
                                    {user.username.length > 13 ? `${user.username.slice(0, 13)}...` : user.username}
                                </h4>
                                <p className='text-sm text-left'>{user.header?.length > 13 ? `${user.header?.slice(0, 13)}...` : user.header}</p>
                            </div>
                            <Link to={`/profile/${user._id}`} className="ml-auto ">
                                <button className="bg-blue-500 hover:bg-blue-700 text-sm text-white py-1 px-2 rounded-2xl">View</button>
                            </Link>
                        </div>

                    ))
                ) : (
                    <p>No suggestions available</p>
                )
            }
        </div >
    );
});

export default Suggestion;
