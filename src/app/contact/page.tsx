'use client';
import React from 'react';
import { useState } from 'react';
import Link from 'next/link';  

import Map from './map'; 
export default function ContactUs() {
    const openings = ['Brand Manager', 'UI Designer', 'Marketing Intern', 'Senior Designer', 'Animator', 'Business Development'];

    const topThree = openings.slice(0, 3);
    const bottomFour = openings.slice(3);

    const services = [
        'Branding',
        'Production',
        'Digital Marketing',
        'AI OBD Agent',
        'AI Production',
        'Strategy',
    ];
    
    const [selected, setSelected] = useState<number[]>([]);    
    const toggleSelection = (idx: number) => {
        setSelected((prev) =>
        prev.includes(idx)
            ? prev.filter((i) => i !== idx) 
            : [...prev, idx]               
        );
    };


    return (
        <>
    {/* <div id="contact" className=" flex flex-col bg-[#EEF0FF] items-center justify-center"> */}

    <div className="relative  min-h-screen bg-[#EEF0FF] pb-6 pt-[120px] py-12 px-8 md:px-20">
        <h1 className="text-[55px] md:text-[94.5px] md:text-6xl petrovsans-book text-center bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">Reach Us</h1>
        <p className="text-center text-[10px] md:text-[20px] md:max-w-[1176px] outfit-light leading-[149%] tracking-[0.08em] mx-auto mt-6 text-[#6210FF]">
           At Voix & Vision Worx, we are dedicated to transforming your aspirations into tangible achievements. We partner with businesses to navigate complex challenges and unlock new possibilities, leveraging our expertise to deliver innovative and impactful solutions. Our commitment is to your success, helping you connect, engage, and grow in an ever-evolving landscape. Contact us today to explore how our collaborative approach can help achieve your strategic goals.
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
                

                
                <p className='outfit-light leading-[149%] tracking-[0.08em] text-[19.69px] md:text-[20px] text-black'>Services <span className='leading-normal tracking-normal text-[14px] md:text-[18px]'>(Select from Below)</span></p>
                    <div className="flex flex-wrap gap-[8px] mt-[15px] md:gap-[16px]">
                    {services.map((item, idx) => {
                        const isSelected = selected.includes(idx);
                        return (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => toggleSelection(idx)}
                            className={`group border border-[#6210FF] outfit-light text-[13px] md:text-[20.5px] rounded-full px-2 py-1 md:px-4 transition whitespace-nowrap inline-block
                            ${
                                isSelected
                                ? 'bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-white'
                                : 'text-black'
                            }`}
                        >
                            <span
                            className={`transition ${
                                isSelected
                                ? ''
                                : 'group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text'
                            }`}
                            >
                            {item}
                            </span>
                        </button>
                        );
                    })}
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
                        className="mt-4 relative inline-flex items-center text-[24px] md:text-[35.81px] petrovsans-semibold gap-7 text-[#6210FF] px-6 tracking-[0.05em] font-semibold rounded-full"
                        style={{
                            background: 'linear-gradient(to right, #6210FF, #BE2FF4) border-box',
                            padding: '2px',
                        }}
                    >
                        <span className="bg-[#EEF0FF] rounded-full px-7 flex items-center gap-7">
                            Submit
                            <span className="text-[35.81px]">→</span>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div className="relative min-h-screen bg-[#EEF0FF] py-12">
        <div className='mt-[79px]'>
            <h1 className="text-[55px] md:text-[94.5px] petrovsans-book text-center text-[#6210FF]">Our Presence</h1>
        </div>
        <p className="text-center max-w-2xl mx-auto mt-6 text-[#6210FF]">
        </p>
        <div className="mt-16 flex justify-center w-full">
            <div className="w-full md:w-[100%]">
                <Map />
            </div>
        </div>

    </div>

    <div className="px-6 py-16 md:py-24 text-center bg-[#EEF0FF]">
        <h1 className="text-[40px] max-sm:px-20 md:text-[94.5px] petrovsans-book text-[#6210FF] leading-tight">
            <span className="whitespace-nowrap">Looking For</span>
            <br className='md:hidden'/>
            <span className="hidden md:inline"> </span>
            <span className="whitespace-nowrap">VUA Filling</span>
        </h1>

        <h2 className="mt-[18px]  md:mt-[41px] text-[24px] md:text-[31.5px] petrovsans-semibold text-black">Current Opening</h2>

        <div className="mt-[18px]  md:mt-[41px] max-w-4xl mx-auto">

            <div className="hidden justify-end md:flex flex-col gap-4">

                <div className="flex justify-center gap-4">
                    {topThree.map((role, index) => (
                        <span
                            key={index}
                            className="group border border-[#6210FF] text-black px-4  rounded-full outfit-light text-sm md:text-base"
                        >
                            <span className="group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text transition">
                                {role}
                            </span>
                        </span>

                    ))}
                </div>


                <div className="flex justify-center gap-4">
                    {bottomFour.map((role, index) => (
                        <span
                            key={index + 3}
                            className="group border border-[#6210FF] text-black px-4 rounded-full outfit-light text-sm md:text-base"
                        >
                            <span className="group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text transition">
                                {role}
                            </span>
                        </span>
                    ))}
                </div>
            </div>


            <div className="flex md:hidden justify-center gap-2">

                <div className="flex flex-col gap-2 items-end">
                    {bottomFour.map((role, index) => (
                        <span
                            key={index + 3}
                            className="group border border-[#6210FF] text-black rounded-full outfit-light text-xs inline-block text-center w-fit px-3 py-1"
                        >
                            <span className="group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text transition">
                                {role}
                            </span>
                        </span>
                    ))}
                </div>

                <div className="flex flex-col gap-2 items-start">
                    {topThree.map((role, index) => (
                        <span
                            key={index}
                            className="group border border-[#6210FF] text-black rounded-full outfit-light text-xs inline-block text-center w-fit px-3 py-1"
                        >
                            <span className="group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text transition">
                                {role}
                            </span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
        <p className="mt-[72px] md:mt-[93px] text-[19px] petrovsans-book md:text-[23.62px] text-gray-800">
            Work With Us:{' '}
            <a
                href="mailto:hr@vvworx.com"
                className="block md:inline text-[#6210FF] text-[28.67px] petrovsans-semibold md:text-[35.44px] font-semibold"
            >
                hr@vvworx.com
            </a>
        </p>
    </div>
            
        </>

    )

}