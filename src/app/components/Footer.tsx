'use client';

import Link from 'next/link';
export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#5F00F6] to-[#B933FF] text-white px-6 py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">


    <div className="space-y-6">
      <div>
        <h1 className="text-6xl font-semibold">Vă</h1>
        <p className="uppercase text-sm tracking-widest">Voix & Vision Worx</p>
      </div>
      <div>
        <p className="mb-2">Follow Us:</p>
       <div className="flex space-x-4 items-center">
  
  <a href="#" className="bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition">
    <i className="fab fa-linkedin-in"></i>
  </a>

  
  <a href="#" className="bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition">
    <i className="fab fa-facebook-f"></i>
  </a>

 
  <a href="#" className="bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition">
    <i className="fab fa-instagram"></i>
  </a>

 
  <a href="#" className="bg-white text-[#6210FF] w-10 h-10 flex items-center justify-center rounded-full text-xl hover:scale-110 transition">
    <i className="fab fa-behance"></i>
  </a>
</div>

      </div>
    </div>

   
    <div className="flex flex-col space-y-3 text-white font-medium text-lg">
      <Link href="/" className='text-white'>Home</Link>
      <Link href="/Services" className='text-white'>Services</Link>
      <a href="/About" className='text-white'>About</a>
      <a href="#">Work</a>
      <a href="#">Culture</a>
       <Link href="/ContactUs" className="text-white">Contact</Link>
      <a href="#">Careers</a>
    </div>

   
    <div className="space-y-6 text-white font-medium text-lg">
      <div className="flex items-center justify-between border-b border-white/60 pb-2">
        <span>Dubai</span>
  
      </div>
      <div className="border-b border-white/60 pb-2">Mumbai</div>
      <div className="border-b border-white/60 pb-2">Pune</div>
    </div>

  </div>
</footer>
  );
}
