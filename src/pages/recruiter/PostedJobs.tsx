import React from 'react'
import Jobs from '../../components/recruiter/home/PostedJobs'
import Nav from '../../components/recruiter/home/Nav'
function HomePage() {
    return (
        <div>
            <Nav />
            <div className='bg-gray-100 min-h-screen'>

                <Jobs />
            </div>
        </div>
    )
}

export default HomePage

