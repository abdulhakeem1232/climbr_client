import React from 'react'
import Dashboard from '../../components/admin/home/Dashvoard'
import Nav from '../../components/admin/home/Nav'
import Sidebar from '../../components/admin/home/Sidebar'
function Home() {
    return (
        <div>
            <div className='fixed w-full z-10 bg-white top-0 shadow-lg'>
                <Nav />
            </div>
            <div className=" mt-2 flex pt-14" style={{ backgroundColor: '#f5f4d5' }}>
                <div className='flex  w-1/6 fixed h-screen' style={{ backgroundColor: "#e1e5eb" }} >
                    <Sidebar />
                </div>
                <div className='mx-auto h-screen mt-3'>
                    <Dashboard />
                </div>
            </div>
        </div >
    )
}

export default Home

