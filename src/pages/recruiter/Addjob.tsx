import React from 'react'
import Newjob from '../../components/recruiter/home/Newjob'
import Nav from '../../components/recruiter/home/Nav'


function Addjob() {
    return (
        <div>
            <Nav />
            < div className='bg-gray-100 min-h-screen flex justify-center items-center' >
                <Newjob />
            </div >
        </div >
    )
}

export default Addjob

