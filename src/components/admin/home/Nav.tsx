import React, { useState } from 'react'
import Logo from '../../../assets/logo.png'
import { CgProfile } from "react-icons/cg";
import { userAxios, endpoints } from '../../../endpoints/userEndpoint';
import { useNavigate } from 'react-router-dom';

function Nav() {
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate()
    const handleMouseEnter = () => {
        setShowOptions(true);
    };
    const handleMouseLeave = () => {
        setTimeout(() => {
            setShowOptions(false);
        }, 1500);
    };
    const handleLogout = async () => {
        await userAxios.get(endpoints.logout)
        navigate('/')
    }
    return (
        <div className='h-16 flex justify-between items-center'>
            <img src={Logo} alt="" className="ml-20 w-36" />
            <div className="flex items-center " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                <CgProfile className='mr-16 w-8 h-8 cursor-pointer' />
                {showOptions && (
                    <div className='absolute top-16 right-20 bg-white shadow-md rounded-md p-4'>
                        <button onClick={handleLogout}>Logout</button>

                    </div>
                )}
            </div>
        </div >
    )
}

export default Nav

