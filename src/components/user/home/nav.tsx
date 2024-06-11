import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import home from '../../../assets/home.png';
import jobs from '../../../assets/jobs.png';
import network from '../../../assets/network.png';
import post from '../../../assets/post.png';
import chats from '../../../assets/chats.png';
import profile from '../../../assets/profile.png';
import { Link, useNavigate } from 'react-router-dom';
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../Redux/slice/UserSlice';
import { RootState } from '../../../Redux/store/store';

function Nav() {
    const navigate = useNavigate();
    const avatar = useSelector((store: RootState) => store.UserData.image);
    const userId = useSelector((store: RootState) => store.UserData.UserId);
    const dispatch = useDispatch()

    const [showOptions, setShowOptions] = useState(false);
    const handleMouseEnter = () => {
        setShowOptions(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setShowOptions(false);
        }, 1500);
    };
    const handleLogout = async () => {
        await userAxios.get(endpoints.logout);
        dispatch(logout())
        navigate('/');
    };

    return (
        <div className="bg-white shadow-md h-16 mt-2 flex items-center justify-between px-32  py-2">
            <div className='flex items-center'>
                <img src={logo} alt="Logo" className="h-32" />
            </div>
            <input type='text' className='bg-blue-50 rounded-lg h-10 w-72 focus:outline-none pl-3 hidden lg:block -ml-28' placeholder='Search' />

            <div className="hidden sm:block">
                <ul className="flex">
                    <li className="mr-8 font-semibold  ">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="mr-8 font-semibold  ">Notification</li>
                    <li className="mr-8 font-semibold  ">
                        <Link to="/job">Jobs</Link>
                    </li>
                </ul>
            </div>

            <div className="flex items-center">
                <h4 className="mr-4">
                    <Link to="/chats">
                        <img src={chats} alt="Chats" className="w-7" />
                    </Link>
                </h4>
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
                    <h4>
                        <img src={avatar || profile} alt="Profile" className="w-9 cursor-pointer rounded-full" />
                    </h4>
                    {showOptions && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-2">
                            <ul>
                                <li>
                                    <Link to={`/profile/${userId}`}>Profile</Link>
                                </li>
                                <li>
                                    <hr className="my-2" />
                                </li>
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
