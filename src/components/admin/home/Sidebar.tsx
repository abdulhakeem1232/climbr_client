import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaUserShield, } from 'react-icons/fa'
import { HiUsers } from "react-icons/hi";
function Sidebar() {
    return (
        <div className='w-1/6 bg-gray-600 fixed h-full px-4 py-2'>
            <div className='my-2 mb-4'>
                <h1 className='text-2x text-white font-bold'>

                    Admin Dashboard</h1>
            </div>
            <hr />
            <ul className='mt-3 text-white font-bold text-left'>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <Link to='/admin/dashboard' className=''>
                        <FaHome className='inline-block w-6 h-6 mt-2 mr-1 align-sub'></FaHome>Dashboard</Link></li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <Link to='/admin/usermanagement' className=''>
                        <FaUserShield className='inline-block w-6 h-6 mt-2 mr-1 align-sub'></FaUserShield >Users</Link></li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <Link to='/admin/recruitermanagement' className=''>
                        <HiUsers className='inline-block w-6 h-6  mt-2 mr-1 align-sub'></HiUsers >Recruiters</Link></li>
                <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                    <Link to='/admin/postmanagement' className=''>
                        <HiUsers className='inline-block w-6 h-6  mt-2 mr-1 align-sub'></HiUsers >Posts</Link></li>
            </ul >
        </div >
    )
}

export default Sidebar

