import React, { useEffect, useState } from 'react'
import { adminAxios } from '../../../utils/Config';
import { adminendpoints } from '../../../endpoints/adminendpoints';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


function Dashboard() {
    const [userCount, setUserCount] = useState(0);
    const [userChartData, setUserChartData] = useState([]);
    const [recruiterCount, setRecruiterCount] = useState(0);
    const [recruiterChartData, setRecruiterChartData] = useState([]);
    const [postCount, setPostCount] = useState(0);
    const [postChartData, setPostChartData] = useState([]);
    const [jobPostCount, setJobPostCount] = useState(0);
    const [jobPostChartData, setJobPostChartData] = useState([]);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userResponse = await adminAxios.get(`${adminendpoints.userReport}`)
                setUserChartData(userResponse.data.result?.map((month: { count: number; }) => month.count));
                setUserCount(userResponse.data.count)
            } catch (err) {
                console.error("Error While User Report", err)
            }
        }
        const fetchRecruiterData = async () => {
            try {
                const recruiterRespone = await adminAxios.get(`${adminendpoints.recruiterReport}`)
                setRecruiterChartData(recruiterRespone.data.result?.map((month: { count: number; }) => month.count))
                setRecruiterCount(recruiterRespone.data.count)
            } catch (err) {
                console.error("Error While Recruiter Report", err)
            }
        }
        const fetchPostData = async () => {
            try {
                const postRespone = await adminAxios.get(`${adminendpoints.postReport}`)
                setPostChartData(postRespone.data.result?.map((month: { count: number; }) => month.count))
                setPostCount(postRespone.data.count)
            } catch (err) {
                console.error("Error While Post Report", err)
            }
        }

        const fetchJobData = async () => {
            try {
                const jobRespone = await adminAxios.get(`${adminendpoints.jobReport}`)
                setJobPostChartData(jobRespone.data.result?.map((month: { count: number; }) => month.count))
                setJobPostCount(jobRespone.data.count)
            } catch (err) {
                console.error("Error While Job Report", err)
            }
        }
        fetchUserData();
        fetchRecruiterData();
        fetchPostData();
        fetchJobData();
    }, [])
    const data = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Users',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: userChartData,
            },
            {
                label: 'market',
                backgroundColor: 'rgba(245, 40, 145, 0.2)',
                borderColor: 'rgba(245, 40, 145, 1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75,192,192,0.2)',
                hoverBorderColor: 'rgba(245, 40, 145, 1)',
                data: recruiterChartData,
            }
        ]
    };
    const postdata = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Users',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: postChartData,
            },
            {
                label: 'market',
                backgroundColor: 'rgba(245, 40, 145, 0.2)',
                borderColor: 'rgba(245, 40, 145, 1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75,192,192,0.2)',
                hoverBorderColor: 'rgba(245, 40, 145, 1)',
                data: jobPostChartData,
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 10,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
            <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Users</h3>
                    <p className="text-2xl">{userCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Recruiters</h3>
                    <p className="text-2xl">{recruiterCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Posts</h3>
                    <p className="text-2xl">{postCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h3 className="text-xl font-semibold mb-2">Job Posts</h3>
                    <p className="text-2xl">{jobPostCount}</p>
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="relative h-auto">
                        <Line data={data} options={options} />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="relative h-auto">
                        <Line data={postdata} options={options} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard

