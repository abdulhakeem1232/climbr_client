import banner from '../../../assets/bannerlanding.png'
import banner2 from '../../../assets/bannerlanding3.png'
import merketting from '../../../assets/merketting.png'
import technology from '../../../assets/technology.png'
import finance from '../../../assets/finance.png'
import Button from '@mui/material/Button';
import findmore from '../../../assets/findmore.png'
import Card from 'react-bootstrap/Card';
import logo from '../../../assets/logo.png'
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Star, Briefcase, ClipboardCheck, User } from 'lucide-react';
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
                    <p className='text-slate-500 mt-3'> Whether you're seeking to start your career, looking for a change, or aiming for your dream role, we've got you covered. Join our community and take the next step towards a brighter future.</p>
                    <Link to="/login"> <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 border border-blue-700 rounded-lg">
                        Join Now
                    </button></Link>
                </div>
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <img src={banner} alt="" className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain" />
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
                <div className="container mx-auto px-4 py-12 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="md:w-1/2 mb-8 md:mb-0">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-200 rounded-tl-3xl rounded-br-3xl transform -rotate-6"></div>
                                <div className="relative z-10 bg-white p-6 rounded-tl-3xl rounded-br-3xl shadow-lg flex justify-center">
                                    <img
                                        src={banner2}
                                        alt="Smiling candidate"
                                        className=" w-[50%] md:w-96 h-auto rounded-tl-2xl rounded-br-2xl"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="md:w-1/2 md:pl-12">
                            <h2 className="text-4xl font-semibold mb-12">
                                Perfect for Candidates.<br />
                                Beautiful for Employers.
                            </h2>

                            <div className="grid grid-cols-2 gap-8">
                                <FeatureCard
                                    icon={<Star className="w-6 h-6 text-teal-black" />}
                                    title="Profile Highlighters"
                                    description="Get highlighted by the company that you've been worked"
                                />
                                <FeatureCard
                                    icon={<Briefcase className="w-6 h-6 text-teal-black" />}
                                    title="Career Booster"
                                    description="Boost your career journey faster than before"
                                />
                                <FeatureCard
                                    icon={<ClipboardCheck className="w-6 h-6 text-teal-black" />}
                                    title="Interactive Assesment"
                                    description="Work on the interactive assesment given from company"
                                />
                                <FeatureCard
                                    icon={<User className="w-6 h-6 text-teal-black" />}
                                    title="Featured Profile"
                                    description="Being featured makes your profile stands out from others"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* footer */}
            <div>
                <footer className="bg-gray-900 text-white py-12 mt-10">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">About Us</h2>
                                <p className="text-sm p-1">
                                    Welcome to Climbr, where finding your dream job is made easy! We connect talented individuals with opportunities for professional growth and success.
                                </p>
                                <p className="text-sm p-1">
                                    Join us today and take the next step toward your career goals with Climbr.  We're dedicated to your success every step of the way.
                                </p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                                <ul className="text-sm">
                                    <li className='p-1'><a href="#">Home</a></li>
                                    <li className='p-1'><a href="#">Browse Jobs</a></li>
                                    <li className='p-1'><a href="#">Post a Job</a></li>
                                    <li className='p-1'><a href="#">Blog</a></li>
                                    <li className='p-1'><a href="#">Contact</a></li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                                <p className="text-sm p-1">123 Job Street, City</p>
                                <p className="text-sm p-1">Phone: +123 456 7890</p>
                                <p className="text-sm p-1">Email: climbr@gmail.com</p>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Newsletter</h2>
                                <p className="text-sm p-1">Subscribe to our newsletter to get the latest job opportunities and updates.</p>
                                <form className="mt-4">
                                    <input
                                        type="email"
                                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your email"
                                    />
                                    <button type="submit" className="w-full mt-2 p-2 rounded bg-blue-600 hover:bg-blue-800 text-white">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-4 text-center">
                        <p className="text-sm">&copy; 2024 Climbr. All rights reserved.</p>
                    </div>
                </footer>
            </div>

        </div >
    )
}

export default Landing


interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="bg-gray-100 p-3 rounded-full mb-2">
            {icon}
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
    </div>
);
;
