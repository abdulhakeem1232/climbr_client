import React, { useState, useCallback } from 'react';
import logo from '../../../assets/logoclimbr.png';
import chats from '../../../assets/chats.png';
import profile from '../../../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { endpoints } from '../../../endpoints/userEndpoint';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slice/UserSlice';
import { RootState } from '../../../Redux/store/store';
import { debounce } from 'lodash';
import socket from '../../../utils/socket/Socket';
import { userAxios } from '../../../utils/Config';

function Nav() {
    const navigate = useNavigate();
    const avatar = useSelector((store: RootState) => store.UserData.image);
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const [search, setSearch] = useState('');
    const [searchedUser, setSearchedUser] = useState<any[]>([]);
    const dispatch = useDispatch();

    const [showOptions, setShowOptions] = useState(false);
    const handleLogout = async () => {
        dispatch(logout());
        await userAxios.get(endpoints.logout);
        socket.emit('leave', userId);
        navigate('/');
    };

    const fetchSearchedUsers = async (text: string) => {
        try {
            const response = await userAxios.get(`${endpoints.searchUser}?text=${text}`);
            console.log(response.data, '----------');
            setSearchedUser(response.data.users);
        } catch (error) {
            console.error('Error fetching searched users:', error);
        }
        console.log(text, 'deboincing');
    };

    const debouncedFetchSearchedUsers = useCallback(debounce((text) => {
        fetchSearchedUsers(text);
    }, 500), []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSearch(value);
        debouncedFetchSearchedUsers(value);
    };
    const handleUserClick = (userId: string) => {
        setSearch('');
        setSearchedUser([]);
        navigate(`/profile/${userId}`);
    };

    return (
        <div className=" shadow-md h-16 flex items-center justify-between px-28 md:pr-40   py-2">
            <div className='flex items-center justify-start'>
                <Link to="/home"> <img src={logo} alt="Logo" className="w-44" /></Link>
                <div>
                    <input
                        type='text'
                        className='bg-gray-200 rounded-lg h-10 w-64 focus:outline-none pl-2 hidden lg:block '
                        placeholder='Search'
                        value={search}
                        onChange={handleSearchChange}
                    />
                    {searchedUser?.length > 0 && (
                        <div className="absolute bg-white shadow-md rounded-md top-20 z-10 mt-2 w-72">
                            {searchedUser.map((user) => (
                                <div
                                    key={user._id}
                                    className="p-2 flex items-center cursor-pointer hover:bg-gray-200"
                                    onClick={() => handleUserClick(user._id)}
                                >
                                    <img src={user.avatar} alt={user.username} className="w-10 h-10 rounded-full" />
                                    <div className="ml-2">
                                        <h4 className="font-semibold">{user.username}</h4>
                                        <p className="text-sm">{user.header}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>



            <div className="flex items-center">
                <div className="hidden sm:block ">
                    <ul className="flex ">
                        <li className="mr-8 font-semibold">
                            <Link to="/home">Home</Link>
                        </li>

                        <li className="mr-8 font-semibold">
                            <Link to="/job">Jobs</Link>
                        </li>
                        <li className="mr-8 font-semibold">
                            <Link to="/chats">Messages</Link>
                        </li>
                    </ul>
                </div>
                <div onClick={() => setShowOptions(!showOptions)} className="relative">
                    <h4>
                        <img src={avatar || profile} alt="Profile" className="w-9 cursor-pointer rounded-full" />
                    </h4>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2">
                            <ul>
                                <li>
                                    <Link to={`/profile/${userId}`}>Profile</Link>
                                </li>

                                <hr className="my-2" />

                                <li>
                                    <button onClick={handleLogout} className="text-red-500">Logout</button>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default Nav;
