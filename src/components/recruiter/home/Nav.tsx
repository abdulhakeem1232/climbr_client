import React, { useState } from 'react'
import logo from '../../../assets/logo.png'
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
    const handleLogout = async () => {
        dispatch(logout())
        await userAxios.get(endpoints.logout)
        navigate('/')
    }
    return (
        <div className=''>
            <div className='shadow-md h-16 mt-2 flex items-center justify-around'>

                <img src={logo} alt="" className='h-32' />


                <div className='hidden sm:block'>
                    <ul className='flex'>
                        <li className='mr-5'><Link to="/recruiter/home">
                            Home
                        </Link></li >
                        <li className='mr-5'><Link to='/recruiter/postedJobs'>

                            Posetd Jobs
                        </Link>
                        </li>
                        <li className='mr-5'><Link to="/recruiter/newJob">
                            New Job
                        </Link></li>
                    </ul >

                </div >
                <div className='flex justify-between'>

                    {/* <h4 className='mr-4'><img src={chats} alt="" className="w-7" /></h4> */}
                    <div onClick={() => setShowOptions(!showOptions)} className="relative">
                        <h4><img src={avatar || profile} alt="" className="w-8 cursor-pointer" /></h4>
                        {showOptions && (
                            <div className='absolute top-16 right-40 bg-white shadow-md rounded-md p-4'>
                                <ul>
                                    {/* <li>Profile</li> */}
                                    <hr />
                                    <li><button onClick={handleLogout} className="text-red-500">Logout</button></li>
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

