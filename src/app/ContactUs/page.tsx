'use client';
import React from 'react';
import Link from 'next/link';

import Map from './map'; // Adjust the import path as necessary
export default function ContactUs() {
    const openings = [
        'Brand Manager',
        'UI Designer',
        'Marketing Intern',
        'Senior Designer',
        'Business Development',
        'Animator',
        'Business Development',
    ];
    return (
        <>
        <div id="contact" className="">

            <div className="relative min-h-screen bg-white pb-6 pt-[120px] py-12 px-8 md:px-20">
                <h1 className="text-[55px] md:text-[94.5px] md:text-6xl  text-center bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">Reach Us</h1>
                <p className="text-center max-w-2xl mx-auto mt-6 text-purple-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                    dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
                    suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit.
                </p>

                <div className="mt-16 grid md:grid-cols-2 gap-10 items-start">
                    {/* Left Side */}
                    <div>
                        <h2 className="text-[40px] md:text-[51px] font-light text-center md:text-start text-purple-600 mb-6">I am interested in</h2>
                    </div>

                    {/* Right Side */}
                    <form className="space-y-8 w-full">
                        <div>
                            <label className="block text-sm font-medium text-gray-700"></label>
                            <input
                                type="text"
                                className=" block w-full border-b text-[15px] md:text-[20px] pb-2 border-gray-400 focus:outline-none focus:border-purple-600 text-black placeholder-black"
                                placeholder="Full Name*"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-black-700"></label>
                            <input
                                type="text"
                                className="mt-1 block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none focus:border-purple-600 text-black placeholder-black"
                                placeholder="Company Name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700"></label>
                            <div className="flex items-center mt-1 pb-2 border-b border-gray-400 focus-within:border-purple-600">
                                <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-6 h-4 mr-2" />
                                <input
                                    type="tel"
                                    className="flex-1 bg-transparent text-[15px] md:text-[20px] outline-none text-black placeholder-black"
                                    placeholder="Phone Number*"
                                    required
                                />
                            </div>
                        </div>
                        {/* Interest Tags */}
                         <p className='text-[15px] md:text-[20px] text-black'>Services <span className='text-[14px] md:text-[18px]'>(Select from Below)</span></p>
                        <div className="flex flex-wrap gap-3 mt-4">
                           
                            {[
                                'Branding',
                                'Production',
                                'Digital Marketing',
                                'AI OBD Agent',
                                'AI Production',
                                'Strategy',
                            ].map((item, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className="border border-purple-600 text-black text-[15px] md:text-[20px]  rounded-full px-4 py-1 text-sm hover:bg-purple-100 transition"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* Message */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700"></label>
                            <textarea
                                className="mt-1 block w-full  border-b border-gray-400 focus:outline-none focus:border-purple-600 text-black placeholder-black"
                                placeholder="Message*"
                                required
                                rows={3}
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text border border-purple-600 rounded-full px-6 py-2 text-lg font-semibold hover:bg-purple-50 transition"
                            >
                                Submit
                                <span className="text-xl">→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="relative min-h-screen bg-white  py-12 md:px-20">
                <div className='mt-[79px]'>
                    <h1 className="text-[55px] md:text-[94.5px]  font-light text-center text-purple-600">Our Presence</h1>
                </div>
                <p className="text-center max-w-2xl mx-auto mt-6 text-purple-500">
                </p>
                <div className="mt-16 mr-4 grid md:grid-cols-2 gap-10 items-start overflow-x-auto">

                    <Map />


                </div>


            </div>

            <div className="min-h-screen px-6 py-16 md:py-24 text-center bg-white">
                <h1 className="text-[55px] md:text-[94.5px] font-light text-purple-600 leading-tight">
                    Looking For VUA Filling
                </h1>

                <h2 className="mt-10 text-[24px] md:text-[31px] font-semibold text-black ]">Current Opening</h2>

                <div className="mt-6 flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mt-[40px]">
                    {openings.map((role, index) => (
                        <span
                            key={index}
                            className="border border-purple-600 text-black px-4 py-2 rounded-full text-sm md:text-base hover:bg-purple-50 transition"
                        >
                            {role}
                        </span>
                    ))}
                </div>

                <p className="mt-16 text-[19px] md:text-[23.62px] text-gray-800">
                    Work With Us:{' '}
                    <a href="mailto:hr@vvworx.com" className="text-purple-600 text-[28.67px] md:text-[35.44px] font-semibold">
                        hr@vvworx.com
                    </a>
                </p>
            </div>
            </div>
        </>

    )

}