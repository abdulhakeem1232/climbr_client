import React from 'react'
import { Outlet } from 'react-router-dom';
import Nav from '../../components/admin/home/Nav';
import Sidebar from '../../components/admin/home/Sidebar';

function SharedLayout() {
    return (
        <div>
            <div>
                <div className='fixed w-full z-10 bg-white top-0 shadow-md'>
                    <Nav />
                </div>
                <div className="mt-2 flex pt-14 bg-gray-50">
                    <div className='w-1/6 h-screen' style={{ backgroundColor: "#e1e5eb" }}>
                        <Sidebar />
                    </div>
                    <div className='w-5/6 min:h-screen px-14'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SharedLayout

