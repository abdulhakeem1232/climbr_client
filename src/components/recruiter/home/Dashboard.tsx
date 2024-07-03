import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { recruiterAxios } from '../../../utils/Config';
import { recruiterendpoints } from '../../../endpoints/recruiterEndpoints';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store/store';

function Dashboard() {
    const [postCount, setPostCount] = useState(0)
    const [applicantCount, setApplicantCount] = useState(0)
    const [applicantsChartData, setApplicantsChartData] = useState([])
    const userId = useSelector((store: RootState) => store.UserData.UserId)

    const data = {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Apllicantsw',
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(75,192,192,0.4)',
                hoverBorderColor: 'rgba(75,192,192,1)',
                data: applicantsChartData,
            },
        ],
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await recruiterAxios.get(`${recruiterendpoints.applicantChart}/${userId}`)
                setApplicantsChartData(response.data.result?.map((month: { count: number }, i: number) => month.count));
                setPostCount(response.data.count)
                setApplicantCount(response.data.totalApllicants)

            } catch (error) {
                console.error("Error", error)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='px-8 md:px-36 pt-5 bg-gray-50 min-h-screen'>
            <p className='text-xl font-semibold mb-5'>Recruiter Dashboard</p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                <div className='bg-white p-4 shadow rounded-lg'>
                    <p className='text-gray-700'>Number of Posts</p>
                    <p className='text-2xl font-bold'>{postCount}</p>
                </div>
                <div className='bg-white p-4 shadow rounded-lg'>
                    <p className='text-gray-700'>Number of Applicants</p>
                    <p className='text-2xl font-bold'>{applicantCount}</p>
                </div>
            </div>
            <div className='bg-white p-4 shadow rounded-lg'>
                <div className='flex justify-center items-center h-64 md:h-80 lg:h-96'>
                    <div className='w-full h-full'>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;
