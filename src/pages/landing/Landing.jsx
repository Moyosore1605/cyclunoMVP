import React from 'react'
import Vector from '../../assets/Vector.svg'
import Mask from '../../assets/Mask.svg'
import Mask1 from '../../assets/Mask1.svg'
import Logo from '../../assets/Logo.svg';
import Frame from '../../assets/Frame.svg'
import Fancy from '../../assets/Fancy.svg'
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowUp, FaArrowDown, FaTwitter} from "react-icons/fa";
import { AiFillMail, AiFillFacebook, AiFillInstagram } from "react-icons/ai";

export default function Landing() {
    return (
        <main className='bg-[#F6F5F9] h-full pb-4 w-full'>
            <div className='text-center pt-20'>
                <h1 className='text-3xl font-semibold text-[#1E1E1E] font-fraunces'>Unlock a New World of <br/> Product Development Lifecycle</h1>
                <section className='flex text-center justify-center relative mt-3'>
                    <section>
                        <p className='text-gray-400 mb-3'>Cycluno provides a single, structured workflow to manage every phase <br/>
                        from idea to deployment with traceability and real-time reporting.</p>
                        <button className='p-2 ps-4 pe-4 bg-[#1B365D] text-white text-base rounded-md'>Request Demo</button>
                        <button className='p-2 ps-4 pe-4 bg-[#C4C4C4] text-[#666666] text-base rounded-md ms-4'>Ask a question</button>
                    </section>
                    <img src={Vector} width={'103px'} className='absolute right-96'/>
                </section>
                <section className='flex justify-center items-start'>
                    <img src={Mask1} width={'60px'} className='ms-20 mt-10'/>
                    <img src={Frame} width={'340px'} className='ms-10'/>
                    <img src={Mask} width={'60px'} className='ms-10 mt-10'/>
                </section>
            </div>
            <div className='bg-[#C4C4C4] pt-20 pb-20 text-center'>
                <h1 className='text-3xl text-[#1E1E1E] font-fraunces'>Get Everything Done</h1>
                <div className='flex justify-center gap-20 mt-10'>
                    <section className='text-start'>
                        <button className='w-[120px] h-[120px] rounded-md bg-[#9F9F9F]'></button>
                        <p className='text-lg text-[#1E1E1E] font-semibold'>Increases Productivity</p>
                        <span className='text-sm text-gray-500 text-start'>
                            Unifies product managers, developers, and <br/>
                            testers in a single workspace, improving <br/> 
                            collaboration and accelerating speed from <br/> concept to release.
                        </span>
                    </section>
                    <section className='text-start'>
                        <button className='w-[120px] h-[120px] rounded-md bg-[#9F9F9F]'></button>
                        <p className='text-lg text-[#1E1E1E] font-semibold'>Production Develpment</p>
                        <span className='text-sm text-gray-500 text-start'>
                            Helps teams design, execute, test, and <br/>
                            report on products within a single <br/> continuous system.
                        </span>
                    </section>
                    <section className='text-start'>
                        <button className='w-[120px] h-[120px] rounded-md bg-[#9F9F9F]'></button>
                        <p className='text-lg text-[#1E1E1E] font-semibold'>Spend less time for management</p>
                        <span className='text-sm text-gray-500 text-start'>
                            Let your employees spend much less time in <br/> 
                            software testing from a manual bottleneck <br/> into an intelligent advantage.
                        </span>
                    </section>
                </div>
            </div>
            <div className='flex justify-center gap-40 pt-20 pb-20'>
                <section className='flex flex-col gap-5'>
                    <h1 className='text-3xl text-[#1E1E1E] font-fraunces'>Drag and Drop catalog <br/> management</h1>
                    <p className='text-sm text-gray-500 text-start'>
                        Use the Drag and Drop function to test out new and <br/>
                        existing product in the most intuitive, quickest way.
                    </p>
                    <p className='text-sm text-gray-500 text-start'>
                        Easy executional phase and access to AI bug Report <br/> generation when test fails.<br/>
                        Get bug detailed view to fix issue.
                    </p>
                    <p className='flex'>Learn More <FaArrowRightLong /> </p>
                </section>
                <button className='w-[400px] h-[300px] rounded-md bg-[#C4C4C4]'></button>
            </div>
            <div className='bg-[#C4C4C4] pt-20 pb-20 text-center'>
                <h1 className='text-3xl text-[#1E1E1E] font-fraunces'>Our system is chock-full of features!</h1>
                <div className='flex justify-center gap-20 mt-10 flex-wrap'>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Increases Productivity</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Easy/seamless onboarding and <br /> user verification process.
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Task Board</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            A quick way to see Tasks from all<br /> your projects in one place.
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Project Creation</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Quick  project creation and also <br /> save countless hours creating the <br /> same projects over and over.
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Backups</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Get peace of mind by having all <br /> your data offline.
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Design and Execution</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Seamless design, execution <br /> and test of projects with full <br /> detailed bug reports <br /> generation if test fails.
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>File Edit</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Edit any file directly from our <br /> special desktop application. 
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Widget Board</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Create custom widgets for any type <br /> of information you need in one easy <br /> location.
                        </span>
                    </section>
                    <section className='text-start'>
                        <section className='flex gap-5 items-center mb-4'>
                            <button className='w-[72px] h-[82px] rounded-md bg-[#666666]'></button>
                            <p className='text-lg text-[#1E1E1E] font-semibold'>Integrations</p>
                        </section>
                        <span className='text-sm text-gray-500 text-start'>
                            Get peace of mind by having all <br /> your data offline.
                        </span>
                    </section>
                </div>
            </div>
            <div className='footer flex flex-col items-center pt-20 gap-20'>
                <main className='bg-black text-white w-[950px] h-[500px] rounded-2xl p-10 pr-0 overflow-hidden'>
                    <h1 className='text-4xl font-fraunces mb-7'>What people are saying</h1>
                    <section className='flex gap-3'>
                        <div className='bg-[#1E1E1E] w-[300px] rounded-2xl p-6 flex flex-col gap-8'>
                            <img src={Fancy} width={'38px'}/>
                            <p className='text-[#FFFFFFA6] text-base'>
                                Cycluno has made testing our <br /> app launch so much easier. <br />
                                The seamless device <br /> redirection ensures that users <br /> always end up in the right app <br />
                                store, and the analytics give us a clear view of what's working.
                            </p>
                            <section className='flex'>
                                <button className='w-[43px] h-[43px] rounded-full border border-white bg-[#353535]'/>
                                <section className='ms-3'>
                                    <p>Joshua. A</p>
                                    <span className='text-[#FFFFFFA6] text-sm'>Student</span>
                                </section>
                            </section>
                        </div>
                        <div className='bg-[#1E1E1E] w-[300px] rounded-2xl p-6 flex flex-col gap-8'>
                            <img src={Fancy} width={'38px'}/>
                            <p className='text-[#FFFFFFA6] text-base'>
                                We've been using Cycluno <br /> during our beta phase, and it's <br /> been incredible. One link <br />
                                covers all platforms, and the <br /> insight into user behavior is <br /> game-changing for our marketing strategy.
                            </p>
                            <section className='flex'>
                                <button className='w-[43px] h-[43px] rounded-full border border-white bg-[#353535]'/>
                                <section className='ms-3'>
                                    <p>Joshua. A</p>
                                    <span className='text-[#FFFFFFA6] text-sm'>Student</span>
                                </section>
                            </section>
                        </div>
                        <div className='bg-[#1E1E1E] w-[300px] rounded-2xl p-6 flex flex-col gap-8'>
                            <img src={Fancy} width={'38px'}/>
                            <p className='text-[#FFFFFFA6] text-base'>
                                As we prepare for launch, <br /> Cycluno has been essential in <br />
                                streamlining our download <br /> flow. The platform's ease of use <br /> and tracking capabilities are <br /> exactly what we needed.
                            </p>
                            <section className='flex'>
                                <button className='w-[43px] h-[43px] rounded-full border border-white bg-[#353535]'/>
                                <section className='ms-3'>
                                    <p>Joshua. A</p>
                                    <span className='text-[#FFFFFFA6] text-sm'>Student</span>
                                </section>
                            </section>
                        </div>
                    </section>
                </main>
                <main className='flex flex-col gap-3 items-center'>
                    <h1 className='text-3xl text-[#1E1E1E] font-fraunces'>Frequently Asked Questions</h1>
                    <div className='flex gap-5 w-[950px] border border-gray-300 p-7 rounded justify-between'>
                        <p className='text-[#1E1E1E] text-lg'>01</p>
                        <section>
                            <p className='text-[#1E1E1E] text-xl font-medium'>How involved can I be in the design process?</p>
                            <span className=' text-gray-500 text-sm'>We believe in collaboration and value your input throughout the design <br /> 
                            process. We encourage clients to actively participate in discussions, <br /> share their ideas, preferences, and feedback.</span>
                        </section>
                        <FaArrowUp className='text-gray-500 mt-5'/>
                    </div>
                    <div className='flex gap-5 w-[950px] border border-gray-300 p-7 rounded justify-between'>
                        <p className='text-[#1E1E1E] text-lg'>02</p>
                        <section>
                            <p className='text-[#1E1E1E] text-xl font-medium'>What services do you offer?</p>
                            <span className=' text-gray-500 text-sm'></span>
                        </section>
                        <FaArrowDown className='text-gray-500 mt-5'/>
                    </div>
                    <div className='flex gap-5 w-[950px] border border-gray-300 p-7 rounded justify-between'>
                        <p className='text-[#1E1E1E] text-lg'>03</p>
                        <section>
                            <p className='text-[#1E1E1E] text-xl font-medium'>What is your test process?</p>
                            <span className=' text-gray-500 text-sm'></span>
                        </section>
                        <FaArrowDown className='text-gray-500 mt-5'/>
                    </div>
                    <div className='flex gap-5 w-[950px] border border-gray-300 p-7 rounded justify-between'>
                        <p className='text-[#1E1E1E] text-lg'>04</p>
                        <section>
                            <p className='text-[#1E1E1E] text-xl font-medium'>How do you establish your design fees?</p>
                            <span className=' text-gray-500 text-sm'></span>
                        </section>
                        <FaArrowDown className='text-gray-500 mt-5'/>
                    </div>
                    <div className='flex gap-5 w-[950px] border border-gray-300 p-7 rounded justify-between'>
                        <p className='text-[#1E1E1E] text-lg'>05</p>
                        <section>   
                            <p className='text-[#1E1E1E] text-xl font-medium'>How long does a typical project take?</p>
                            <span className=' text-gray-500 text-sm'></span>
                        </section>
                        <FaArrowDown className='text-gray-500 mt-5'/>
                    </div>
                    
                    <div className='flex justify-center gap-40 pt-20 pb-10 bg-[#C4C4C4] rounded-lg w-[870px] mt-20'>
                        <section className='flex flex-col gap-5'>
                            <h1 className='text-3xl text-[#1E1E1E] font-fraunces'>Try Cycluno Now!</h1>
                            <Link to="/signup" className='p-2 font-semibold max-w-fit bg-[#1B365D] text-white text-base rounded-md'>Get Started</Link>
                            <ul className='text-sm text-gray-500 text-start list-disc'>
                                <li>AI Test Case Generation</li>
                                <li>AI Powered Result Validation</li>
                            </ul>
                        </section>
                        <button className='w-[340px] h-[240px] rounded-md bg-[#9F9F9F]'></button>
                    </div>
                    <div className='flex justify-between items-center mt-20 w-[900px]'>
                        <div className='flex items-center'>
                            <img src={Logo} width={"45px"} />
                            <h1 className='font-bold text-lg text-[#1B365D] ms-1'>Cycluno</h1>
                        </div>
                        <div className='flex items-center gap-6 me-4'>
                            <Link className='text-sm' to="/">About</Link>
                            <Link className='text-sm' to="/">Terms and Conditions</Link>
                            <Link className='text-sm' to="/">Privacy</Link>
                            <Link className='text-sm' to="/">Disclaimer</Link>
                            <section className='flex gap-2'>
                                <AiFillMail />
                                <FaTwitter />
                                <AiFillFacebook />
                                <AiFillInstagram />
                            </section>
                        </div>
                    </div>
                </main>
            </div>
        </main>
)
}
