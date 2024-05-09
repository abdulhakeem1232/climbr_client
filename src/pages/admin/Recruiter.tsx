import React from 'react'
import Nav from '../../components/admin/home/Nav'
import Sidebar from '../../components/admin/home/Sidebar'
import RecruiterManagement from '../../components/admin/home/RecruiterManagement'

function Recruiter() {
    return (
        <div>
            <div className='fixed w-full z-10 bg-white top-0 shadow-lg'>
                <Nav />
            </div>
            <div className=" mt-2 flex pt-14" style={{ backgroundColor: '#f5f4d5' }}>
                <div className='w-1/6  h-screen' style={{ backgroundColor: "#e1e5eb" }} >
                    <Sidebar />
                </div>
                <div className='mx-auto h-screen '>
                    <RecruiterManagement />
                </div>
            </div>

        </div>
    )
}

export default Recruiter

