import { Link } from 'react-router-dom'
import { FaHome, FaUserShield, FaExclamationCircle } from 'react-icons/fa'
import { HiUsers } from "react-icons/hi";
import { GiSkills } from "react-icons/gi";
function Sidebar() {
    return (
        <div className='w-1/6 bg-gray-600 fixed h-full px-4 py-2'>
            <div className='my-2 mb-4'>
                <h1 className='text-2x text-white font-bold'>
                    Admin Dashboard</h1>
            </div>
            <hr />
            <ul className='mt-3 text-white font-bold text-left'>
                <Link to='/admin/dashboard' className=''>
                    <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                        <FaHome className='inline-block w-6 h-6 mt-2 mr-1 align-sub'></FaHome>Dashboard</li></Link>
                <Link to='/admin/usermanagement' className=''>
                    <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                        <FaUserShield className='inline-block w-6 h-6 mt-2 mr-1 align-sub'></FaUserShield >Users</li></Link>
                <Link to='/admin/recruitermanagement' className=''>
                    <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                        <HiUsers className='inline-block w-6 h-6  mt-2 mr-1 align-sub'></HiUsers >Recruiters</li></Link>
                <Link to='/admin/postmanagement' className=''>
                    <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                        <FaExclamationCircle className='inline-block w-6 h-6  mt-2 mr-1 align-sub'></FaExclamationCircle >Reported Posts</li></Link>
                <Link to='/admin/skills' className=''>
                    <li className='mb-2 rounded hover:shadow hover:bg-blue-500 py-2'>
                        <GiSkills className='inline-block w-6 h-6 mt-2 mr-1 align-sub'></GiSkills>Skills</li></Link>

            </ul >
        </div >
    )
}

export default Sidebar

