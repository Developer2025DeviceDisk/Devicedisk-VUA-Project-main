'use client';
import React from 'react';
import Link from 'next/link';

import Map from './map'; // Adjust the import path as necessary
export default function ContactUs() {
    const openings = ['Brand Manager', 'UI Designer', 'Marketing Intern', 'senior Designer', 'animator', 'Business development'];

    const topThree = openings.slice(0, 3);
    const bottomFour = openings.slice(3);
    return (
        <>
            <div id="contact" className=" flex flex-col bg-white items-center justify-center">

                <div className="relative  min-h-screen bg-white pb-6 pt-[120px] py-12 px-8 md:px-20">
                    <h1 className="text-[55px] md:text-[94.5px] md:text-6xl petrovsans-book text-center bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">Reach Us</h1>
                    <p className="text-center text-[15px] md:text-[20px] md:max-w-[1176px] outfit-light mx-auto mt-6 text-[#6210FF]">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper
                        suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit.
                    </p>

                    <div className="mt-16 grid md:max-w-[1176px] md:grid-cols-2 gap-10 items-start">

                        <div>
                            <h2 className="text-[40px] md:text-[51px] petrovsans-book text-center md:text-start text-[#6210FF] mb-6">I am interested in</h2>
                        </div>


                        <form className="space-y-8 w-full">
                            <div>
                                <label className="block text-sm font-medium text-gray-700"></label>
                                <input
                                    type="text"
                                    className=" block outfit-light w-full border-b text-[15px] md:text-[20px] pb-2 border-gray-400 focus:outline-none focus:border-[#6210FF] text-black placeholder-black"
                                    placeholder="Full Name*"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black-700"></label>
                                <input
                                    type="text"
                                    className="mt-1 outfit-light block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none focus:border-[#6210FF] text-black placeholder-black"
                                    placeholder="Company Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700"></label>
                                <div className="flex items-center mt-1 pb-2 border-b border-gray-400 focus-within:border-[#6210FF]">
                                    <img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="w-6 h-4 mr-2" />
                                    <input
                                        type="tel"
                                        className="flex-1 outfit-light bg-transparent text-[15px] md:text-[20px] outline-none text-black placeholder-black"
                                        placeholder="Phone*"
                                        required
                                    />
                                </div>
                            </div>

                            <p className='outfit-light text-[15px] md:text-[20px] text-black'>Services <span className='text-[14px] md:text-[18px]'>(Select from Below)</span></p>
                            <div className="flex flex-wrap gap-[16px] mt-[15px]">

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
                                        className="border border-[#6210FF] outfit-light text-black text-[15px] md:text-[20.5px]  rounded-full px-4  hover:bg-purple-100 transition"
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-gray-700"></label>
                                <textarea
                                    className="mt-1 outfit-light block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none focus:text-[#6210FF] text-black placeholder-black"
                                    placeholder="Message*"
                                    required
                                    rows={1}
                                />
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="mt-4 inline-flex items-center text-[24px] md:text-[35px] petrovsans-semibold gap-2 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text border-[2px] border-[#6210FF] rounded-full px-6  text-lg font-semibold hover:bg-purple-50 transition"
                                >
                                    Submit
                                    <span className="text-xl">→</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="relative min-h-screen  bg-white  py-12 md:px-20">
                    <div className='mt-[79px]'>
                        <h1 className="text-[55px] md:text-[94.5px] petrovsans-book text-center text-[#6210FF]">Our Presence</h1>
                    </div>
                    <p className="text-center max-w-2xl mx-auto mt-6 text-[#6210FF]">
                    </p>
                    <div className="mt-16 mr-4 grid md:grid-cols-2 gap-10 items-start overflow-x-auto">

                        <Map />


                    </div>


                </div>

                <div className="min-h-screen px-6 py-16 md:py-24 text-center bg-white">
                    <h1 className="text-[55px] md:text-[94.5px] petrovsans-book text-[#6210FF] leading-tight">
                        Looking For VUA Filling
                    </h1>

                    <h2 className="mt-[18px]  md:mt-[41px] text-[24px] md:text-[31px] petrovsans-semibold text-black ]">Current Opening</h2>

                    <div className="mt-[18px]  md:mt-[41px] max-w-4xl mx-auto">

                        <div className="hidden md:flex flex-col gap-4">

                            <div className="flex justify-center gap-4">
                                {topThree.map((role, index) => (
                                    <span
                                        key={index}
                                        className="border border-[#6210FF] text-black px-4  rounded-full outfit-light text-sm md:text-base hover:bg-purple-50 transition"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>


                            <div className="flex justify-center gap-4">
                                {bottomFour.map((role, index) => (
                                    <span
                                        key={index + 3}
                                        className="border border-[#6210FF] text-black px-4 rounded-full outfit-light text-sm md:text-base hover:bg-purple-50 transition"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>


                        <div className="flex md:hidden justify-center gap-4">

                            <div className="flex flex-col gap-4">
                                {bottomFour.map((role, index) => (
                                    <span
                                        key={index + 3}
                                        className="border border-[#6210FF] text-black px-4 py-0 rounded-full outfit-light  text-sm hover:bg-purple-50 transition"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col gap-4">
                                {topThree.map((role, index) => (
                                    <span
                                        key={index}
                                        className="border border-[#6210FF] text-black px-4 py-0 rounded-full outfit-light text-sm hover:bg-purple-50 transition"
                                    >
                                        {role}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="mt-[36px] md:mt-[93px] text-[19px] petrovsans-book md:text-[23.62px] text-gray-800">
                        Work With Us:{' '}
                        <a
                            href="mailto:hr@vvworx.com"
                            className="block md:inline text-[#6210FF] text-[28.67px] petrovsans-semibold md:text-[35.44px] font-semibold"
                        >
                            hr@vvworx.com
                        </a>
                    </p>
                </div>
            </div>
        </>

    )

}