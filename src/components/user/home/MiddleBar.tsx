import React from 'react'
import { Link } from 'react-router-dom'
import home from '../../../assets/home.png'
import jobs from '../../../assets/jobs.png'
import network from '../../../assets/network.png'
import post from '../../../assets/post.png'
import chats from '../../../assets/chats.png'


function MiddleBar() {
    return (
        <div className='bg-slate-400 sm:hidden fixed bottom-0 left-0 w-full h-10'>
            <ul className='flex justify-around items-end'>
                <li className=''><Link to="/home"><img src={home} alt="" className="w-8" /></Link></li>
                <li className=''><Link to="/post"><img src={post} alt="" className="w-8" /></Link></li>
                <li className=''><Link to="/job"><img src={jobs} alt="" className="w-8" /></Link></li>
                <li><Link to="/chats"><img src={chats} alt="" className="w-8" /></Link></li>
            </ul>
        </div >
    )
}

export default MiddleBar

