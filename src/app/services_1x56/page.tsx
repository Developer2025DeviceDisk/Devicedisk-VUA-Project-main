import Image from 'next/image';

const services = [
  { title: "Web Development", description: "Building responsive websites." },
  { title: "UI/UX Design", description: "Crafting user-centered interfaces." },
  { title: "SEO Optimization", description: "Boosting your site visibility." },
];

export default function Services() {
  return (
    
    <>
    
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden bg-gradient-to-br from-[#BE2FF4] to-[#6210FFCC]">


        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#BE2FF4] to-transparent opacity-40 blur-[120px] rounded-full pointer-events-none"></div>


        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#6210FFCC] to-transparent opacity-40 blur-[120px] rounded-full pointer-events-none"></div>


        <style>
        {`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-50px); }
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        `}
        </style>

      <h1 className="text-white font-thin text-[48px] sm:text-[94px] mb-[60px] z-10 floating mt-[20px]">
  Your 360° Growth Engine
</h1>


        <p className="font-extrathin text-white text-[19.69px]  mx-[10px] max-w-6xl z-10 leading-[149%] tracking-[0.08em] floating" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit
        </p>

      </section>

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#BE2FF4] to-[#6210FFCC] overflow-hidden">

        {/* Optional gradient blur background effects */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#BE2FF4] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#6210FFCC] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Puzzle Image */}
     <Image src={'/puzzle.png'} alt="Puzzle Icon"  width={ 100 } height = { 100 } className="w-120 h-auto mb-[-6%] z-10" />

        {/* Heading */}
      <h1 className="text-white font-bold text-[48px] sm:text-[94px]  leading-[122.85px] z-10">
          Strategy
        </h1>

        {/* Paragraph */}
        <p className="text-white text-lg mt-2 mb-10 z-10">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>


        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[12px] justify-items-center  z-10">
          {[
            'GTM Strategy',
            'Brand strategy',
            'Brand Voice',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[8px] justify-items-center mb-10 z-10">
          {[
            'Campaign Strategy',
            'PR Strategy',
            'Social Media Strategy',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>








        {/* Explore More Button */}
        <button className="mt-4 px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10">
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>
      </section>











   








      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#BE2FF4] to-[#6210FFCC] overflow-hidden">

        {/* Optional gradient blur background effects */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#BE2FF4] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#6210FFCC] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Puzzle Image */}
       <Image src={'/groupcircle.png'} alt="Puzzle Icon" width={ 100 } height = { 100 } className="w-120 h-auto mb-[-20%] z-10" />

        {/* Heading */}
        <h1 className="text-white font-semibold text-[48px] sm:text-[94px]  z-10">
          Design & <br></br> Communications
        </h1>

        {/* Paragraph */}
        <p className="text-white text-lg mt-2 mb-10 z-10">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>


        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[12px] justify-items-center mb-2 z-10">
          {[
            'Brand Identity Design',
            'Website Design',
            'UI/UX Design',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[8px] justify-items-center mb-10 z-10">
          {[
            'Event Branding',
            'Office Branding',
            'Packaging ',
            'Print & Digital Creatives'

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>








        {/* Explore More Button */}
        <button className="mt-4 px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10">
          EXPLORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>
      </section>



      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#BE2FF4] to-[#6210FFCC] overflow-hidden">

        {/* Optional gradient blur background effects */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#BE2FF4] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#6210FFCC] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>




        {/* Heading */}
        <h1 className="flex text-white font-semibold text-[48px] sm:text-[94px] leading-[122.85px] z-10 mt-[5%]">
          Production <Image src={'/box.png'} alt="Puzzle Icon" width={ 100 } height = { 100 } className="w-50 h-auto  mt-[-3%] mb-[5%] ml-[28%] z-[-60] absolute" />
        </h1>

        {/* Paragraph */}
        <p className="text-white text-lg mt-2 mb-10 z-10">
         <Image src={'/box1.png'} alt="Puzzle Icon" width={ 100 } height = { 100 } className="w-30 h-auto ml-[-3%] mt-[-2%] mb-[5%] z-[-60] absolute" /> Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>


        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[12px] justify-items-center mb-2 z-10">
          {[
            'Brand Identity Design',
            'Website Design',
            'UI/UX Design',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[8px] justify-items-center mb-10 z-10">
          {[
            'Event Branding',
            'Office Branding',
            'Packaging ',
            'Print & Digital Creatives'

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>








        {/* Explore More Button */}
        <button className="mt-4 px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10">
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>
      </section>



   <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-br from-[#BE2FF4] to-[#6210FFCC] overflow-hidden">

        {/* Optional gradient blur background effects */}
        <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#BE2FF4] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#6210FFCC] to-transparent opacity-30 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Puzzle Image */}
        <Image src={'/cloud.png'} alt="Puzzle Icon" width={ 100 } height = { 100 } className="w-120 h-auto mb-[-20%] z-10" />

        {/* Heading */}
        <h1 className="text-white text-[20px] font-semibold text-[68px] sm:text-[94px]  z-10">
          Digital Marketing
        </h1>

        {/* Paragraph */}
        <p className="text-white text-lg mt-2 mb-10 z-10">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>


        <div className="flex flex-cols-3 gap-x-[8px] gap-y-[12px] justify-items-center mb-2 z-10">
          {[
            'Growth Marketing',
            'Social Media Management Packages',
            'SEO Optimization & Ranking',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[16.54px]
                 text-[13px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

       








        {/* Explore More Button */}
        <button className="mt-4 px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10">
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>
      </section>



<section>
  <div className="bg-black  flex items-center justify-center text-center px-4 pt-[40px]">
  <div>
    <h1 className="text-[48px] sm:text-[94px] leading-tight  font-medium text-transparent stroke-purple-500">
      Technological<br />
      Solution
    </h1>
  </div>
</div>

<div className="bg-black  flex items-center justify-center text-center px-4 pt-[40px]">
  <div>
   <h1
  className="text-[48px] sm:text-[94px] leading-tight font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]"
>
  Agent VUA
</h1>

<p className="text-[18px] text-[#BE2FF4] px-[10px] py-[20px]">AI Powered telecalling agent yo seamlessly handle <br></br>all  your inbound & outbound call </p>
<div className="bg-[#6210FF7A] p-6 rounded-xl">
   <h1 className="text-[40px] font-light text-white">The Impact of Agent Vua</h1>
  <div className="grid grid-cols-3 text-white gap-4 text-center py-[40px]">
   
    <div>
      <h3 className="text-lg font-light">Integrate With<br></br> Your CRM</h3>

    </div>
    <div>
      <h3 className="text-lg font-light">Integrated <br></br>Virtual Numbers</h3>

    </div>
    <div>
      <h3 className="text-lg font-light">Automate Pre-sales / <br></br>Customers Support Process</h3>

    </div>
  </div>
</div>






  </div>

  
</div>


<div className="bg-black  flex items-center justify-center text-center px-4 pt-[150px] ">
  <div>
   <h1
  className="text-[48px] sm:text-[94px] leading-tight font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]"
>
  Agent Vision
</h1>

<p className="text-[18px] text-[#BE2FF4] px-[10px] py-[20px]">AI Powered telecalling agent yo seamlessly handle <br></br>all  your inbound & outbound call </p>



 <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white text-center mt-5 text-[24px]">
  <div>Project walkthroughs</div>
  <div>Launch Videos</div>
  <div>Reel/content generation</div>
  <div>Production & films</div>
</div> 
  
  <div className="grid grid-cols-3 gap-4  text-center mt-14 ">
  <div> <h1
  className="text-[42px] leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6210FF] to-[#BE2FF4]"
>10%</h1><p className="text-white text-[24px]">Production <br></br>Budget</p></div>
  <div><h1
  className="text-[42px] leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6210FF] to-[#BE2FF4]"
>50X</h1><p className="text-white text-[24px]">Faster  <br></br>time to market</p></div>
  <div><h1
  className="text-[42px] leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6210FF] to-[#BE2FF4]"
>100%</h1><p className="text-white text-[24px]">Realistic <br></br> footage</p></div>

</div> 



  </div>

  
</div>


</section>



<section>
  

<div className="bg-black  flex items-center justify-center text-center px-4 pt-[150px]">
  <div>
   <h1
  className="text-[48px] sm:text-[94px] leading-tight font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]"
>
Agent XR
</h1>
<p className="text-[18px] text-[#BE2FF4] px-[10px] py-[20px]">Don’t leave it to their imagination, <br></br>immerse them in the experience </p>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-white text-center mt-5 text-[24px]">
  <div>Virtual Reality </div>
  <div>Digital twins</div>
  <div>Mixed reality</div>
  <div>Realistic renderings </div>
</div> 
  
  <div className="grid grid-cols-3  text-center mt-14 py-[30px] px-[10px]">
  <div> <h1
  className="text-[42px] leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6210FF] to-[#BE2FF4]"
>90%</h1><p className="text-white text-[24px]">Cost  Saving</p></div>
  <div><h1
  className="text-[42px] leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6210FF] to-[#BE2FF4]"
>50X</h1><p className="text-white text-[24px]">Faster <br></br>time to market</p></div>
  <div><h1
  className="text-[42px] leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6210FF] to-[#BE2FF4]"
>400%</h1><p className="text-white text-[24px]">Increased  <br></br> Engagement</p></div>

</div> 



  </div>

  
</div>





</section>


    </>


  );
}
