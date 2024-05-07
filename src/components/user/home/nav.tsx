import React from 'react'
import logo from '../../../assets/logo.png'
import home from '../../../assets/home.png'
import jobs from '../../../assets/jobs.png'
import network from '../../../assets/network.png'
import post from '../../../assets/post.png'
import chats from '../../../assets/chats.png'
import profile from '../../../assets/profile.png'
import { Link } from 'react-router-dom'
import { FiHome } from "react-icons/fi";



function Nav() {
    return (
        <div className='shadow-md h-16 mt-2 flex items-center justify-around'>
            <img src={logo} alt="" className='h-32' />
            <div className='hidden sm:block'>
                <ul className='flex'>
                    <li className='mr-4'><Link to="/home"><img src={home} alt="" className="w-9" /></Link></li>
                    <li className='mr-4'><img src={network} alt="" className="w-9" /></li>
                    <li className='mr-4'><Link to="/post"><img src={post} alt="" className="w-9" /></Link></li>
                    <li><img src={jobs} alt="" className="w-9" /></li>

                </ul>

            </div >
            <div className='flex justify-between'>

                <h4 className='mr-4'><img src={chats} alt="" className="w-9" /></h4>
                <h4><img src={profile} alt="" className="w-9" /></h4>
            </div>
        </div >
    )
}

export default Nav

