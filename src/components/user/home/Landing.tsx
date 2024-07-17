import React from 'react'
import banner from '../../../assets/bannerlanding.png'
import merketting from '../../../assets/merketting.png'
import technology from '../../../assets/technology.png'
import finance from '../../../assets/finance.png'
import Button from '@mui/material/Button';
import findmore from '../../../assets/findmore.png'
import Card from 'react-bootstrap/Card';
import logo from '../../../assets/logo.png'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
const CustomButton = styled(Button)({
    backgroundColor: 'black',
    color: 'white',
});
const Landing = () => {
    return (
        <div>
            <div className=' px-4 lg:px-28 flex justify-between h-24  items-center'>
                <img src={logo} alt="" className='w-40' />
                <div className='flex'>
                    <Link to="/register">
                        <h2 className='pr-10 pt-1 font-semibold'> Register</h2>
                    </Link>
                    <Link to="/login">
                        <CustomButton variant="contained">Login</CustomButton>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col md:flex-row px-4 lg:px-28 mt-9 '>
                <div className='w-full md:w-1/2 my-auto px-4 lg:px-20 text-left'>
                    <h1 className=' font-semibold text-4xl md:text-7xl leading-tight  -mt-16 pt-6 md:pt-0'>One Step Closer To Your New Job</h1>
                    <p className='text-slate-500 mt-3'>Explore thousands of job opprtunities with all kahfowlie ushdfoilwehsodlf ihweiorilsdhfwoel    c8jwe;od  wsdwesdi  8eud fjpwo; hsxgunv erhfglviedfhg eiufhgweiru</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 border border-blue-700 rounded-lg">
                        Join Now
                    </button>
                </div>
                <div className='w-full md:w-1/2 '>
                    <img src={banner} alt="" className='max-w-[70%]  h-full mx-auto' />
                </div>
            </div>
            {/* banner */}
            <div className='py-4 mt-6 bg-gray-50  flex flex-col px-4 lg:px-28 pb-32'>
                <div >
                    <h1 className='text-left font-semibold text-2xl mb-5'>Most Demand Jobs Categories</h1>
                </div>
                <div className='flex justify-center flex-wrap'>
                    <div className='h-44 w-44  mr-2 flex flex-col items-start justify-end bg-black p-3 rounded-md border-2 cursor-pointer shadow-sm hover:transform hover:scale-105 transition-transform duration-300'>

                        <div>

                            <span className='text-white font-medium text-xl'>Design</span><br />
                            <span className='text-white'> New 186 Jobs Posted</span>
                        </div>
                    </div>
                    <div className='h-44 w-44  flex flex-col items-start justify-between p-3 mr-2 shadow-sm hover:transform cursor-pointer hover:scale-105 transition-transform duration-300'>
                        <div className='ml-auto'>
                            <img src={technology} alt="" className='w-10' />
                        </div>
                        <div className='text-left'>
                            <span className=' font-medium text-xl pb-4'>Technolgy</span><br />
                            <span className=''> New 186 Jobs Posted</span>
                        </div>
                    </div>
                    <div className='h-44 w-44  flex flex-col items-start justify-between p-3 mr-2 shadow-sm hover:transform cursor-pointer hover:scale-105 transition-transform duration-300'>
                        <div className='ml-auto'>
                            <img src={technology} alt="" className='w-10' />
                        </div>
                        <div className='text-left'>
                            <span className=' font-medium text-xl pb-4'>Technolgy</span><br />
                            <span className=''> New 186 Jobs Posted</span>
                        </div>
                    </div>
                    <div className='h-44 w-44  flex flex-col items-start justify-between p-3 mr-2 shadow-sm hover:transform cursor-pointer hover:scale-105 transition-transform duration-300'>
                        <div className='ml-auto'>
                            <img src={merketting} alt="" className='w-10' />
                        </div>
                        <div className='text-left'>
                            <span className=' font-medium text-xl'>Marketting</span><br />
                            <span className=''> New 186 Jobs Posted</span>
                        </div>

                    </div>
                    <div className='h-44 w-44 flex flex-col items-start justify-between p-3 mr-2 shadow-sm hover:transform cursor-pointer hover:scale-105 transition-transform duration-300'>
                        <div className='ml-auto'>
                            <img src={finance} alt="" className='w-10' />
                        </div>
                        <div className='text-left'>
                            <span className=' font-medium text-xl '>Finance</span><br />
                            <span className=''> New 186 Jobs Posted</span>
                        </div>

                    </div>
                    <div className='h-44 w-44 rounded-md flex flex-col items-start justify-center bg-slate-200 p-3 mr-2 cursor-pointer shadow-sm hover:transform hover:scale-105 transition-transform duration-300'>
                        <div className='mx-auto'>
                            <img src={findmore} alt="" className='w-14' />
                        </div>
                        <div className='mx-auto'>
                            <span className=' font-medium text-xl '>Find More</span><br />

                        </div>

                    </div>
                </div>
            </div >
            {/* endofcategory */}
            <div className='mt-3 px-4 lg:px-28'>
                <div className='text-left font-semibold text-2xl mb-5'>
                    Lastest Job Posts
                </div>

                <div className='flex flex-wrap justify-center'>
                    {[...Array(8)].map((_, i) => (
                        <Card key={i} style={{ width: '16rem' }} className='rounded-xl bg-white mr-6 mb-6 p-4 justify-between shadow-md hover:transform hover:scale-105 transition-transform duration-300'>
                            <Card.Img variant="top" src={banner} className='w-16 h-12 mb-2 rounded-md' />
                            <Card.Body className='text-left'>
                                <Card.Title>Full Stack Developer</Card.Title>
                                <Card.Text>
                                    <p className='font-bold'>Company Name: ABC & CO</p>
                                    <p className='font-bold'>Location: Banglore</p>
                                    <p className='font-bold'>Experience: 5-10</p>
                                </Card.Text>
                                <button className='bg-black hover:bg-blue-700 text-sm mt-2 text-white font-bold py-2 px-3 rounded-lg' >More Details</button>
                            </Card.Body>
                        </Card>
                    ))
                    }

                </div>
            </div>
            {/* footer */}
            <footer className="bg-gray-900 text-white py-8 mt-5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">About Us</h2>
                            <p className="text-sm">Welcome to Climbr, where finding your dream job is made easy! We connect talented individuals with top companies, offering opportunities for professional growth and success.</p>
                            <p className="text-sm">Join us today and take the next step toward your career goals with Climbr. We're dedicated to your success every step of the way.</p> </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                            <ul className="text-sm">
                                <li><a href="#">Home</a></li>
                                <li><a href="#">Browse Jobs</a></li>
                                <li><a href="#">Post a Job</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                            <p className="text-sm">123 Job Street, City</p>
                            <p className="text-sm">Phone: +123 456 7890</p>
                            <p className="text-sm">Email: climbr@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-4 text-center">
                    <p className="text-sm">&copy; 2024 Climbr. All rights reserved.</p>
                </div>
            </footer>

        </div >
    )
}

export default Landing


