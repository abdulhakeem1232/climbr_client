import React, { useState } from 'react'
import logo from '../../../assets/logo.png'
import chats from '../../../assets/chats.png'
import profile from '../../../assets/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { endpoints } from '../../../endpoints/userEndpoint'
import { useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store/store'
import { userAxios } from '../../../utils/Config'
import { logout } from '../../../Redux/slice/UserSlice'
import { useDispatch } from 'react-redux'




function Nav() {
    const navigate = useNavigate()
    const avatar = useSelector((store: RootState) => store.UserData.image)
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
        dispatch(logout())
        await userAxios.get(endpoints.logout)
        navigate('/')
    }
    return (
        <div className=''>
            <div className='shadow-md h-16 mt-2 flex items-center justify-around'>

                <img src={logo} alt="" className='h-32' />
                {/* <input type='text' placeholder='search' className='bg-slate-400  rounded-md border-none h-10 outline-none' /> */}

                <div className='hidden sm:block'>
                    <ul className='flex'>
                        <li className='mr-5'><Link to="/recruiter/home">
                            {/* <img src={home} alt="" className="w-7" /> */}
                            Home
                        </Link></li >
                        <li className='mr-5'><Link to='/recruiter/postedJobs'>
                            {/* <img src={network} alt="" className="w-7" /> */}
                            Posetd Jobs
                        </Link>
                        </li>
                        <li className='mr-5'><Link to="/recruiter/newJob">
                            {/* <img src={post} alt="" className="w-7" /> */}
                            New Job
                        </Link></li>
                    </ul >

                </div >
                <div className='flex justify-between'>

                    <h4 className='mr-4'><img src={chats} alt="" className="w-7" /></h4>
                    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <h4><img src={avatar || profile} alt="" className="w-8 cursor-pointer" /></h4>
                        {showOptions && (
                            <div className='absolute top-16 right-40 bg-white shadow-md rounded-md p-4'>
                                <ul>
                                    <li>
                                        <li>Profile</li>
                                        <hr />
                                        <button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div >

        </div >

    )
}

export default Nav

