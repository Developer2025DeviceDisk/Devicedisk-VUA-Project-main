import Image from 'next/image';
const services = [
  { title: "Web Development", description: "Building responsive websites." },
  { title: "UI/UX Design", description: "Crafting user-centered interfaces." },
  { title: "SEO Optimization", description: "Boosting your site visibility." },
];

export default function Services() {
  return (
    
    <>

    <section className="max-sm:px-[22px] relative min-h-screen flex flex-col items-center justify-center text-center md:px-6 py-20 overflow-hidden bg-gradient-to-b from-[#BE2FF4] to-[#6210FF] ">

        {/* <div className="absolute top-0 left-0 w-2/3 h-2/3 bg-gradient-to-br from-[#BE2FF4] to-transparent opacity-40 blur-[120px] rounded-full pointer-events-none"></div> */}

        {/* <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-[#6210FFCC] to-transparent opacity-40 blur-[120px] rounded-full pointer-events-none"></div> */}

          <style>
          {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .floating {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes orbit-border-vector6 {
            0%   { top: -75vh; left: -25vw; transform: rotate(0deg); }
            25%  { top: -75vh; left: 25vw; transform: rotate(90deg); }
            50%  { top: 25vh; left: 25vw; transform: rotate(180deg); }
            75%  { top: 25vh; left: -25vw; transform: rotate(270deg); }
            100% { top: -75vh; left: -25vw; transform: rotate(360deg); }
          }
          @keyframes orbit-border-vector7 {
            0%   { top: -25vh; left: -35vw; transform: rotate(180deg); }
            25%  { top: 25vh; left: -10vw; transform: rotate(270deg); }
            50%  { top: -25vh; left: 25vw; transform: rotate(0deg); }
            75%  { top: -75vh; left: -10vw; transform: rotate(90deg); }
            100% { top: -25vh; left: -35vw; transform: rotate(180deg); }
          }
          .border-orbit {
            position: fixed;
            width: 300vw;
            height: 300vh;
            pointer-events: none;
            z-index: 0;
          }
          .orbit-image-vector6 {
            width: 130%;
            height: 130%;
            position: fixed;
            animation: orbit-border-vector6 15s linear infinite;
          }
          .orbit-image-vector7 {
            width: 150%;
            height: 150%;
            position: fixed;
            animation: orbit-border-vector7 15s linear infinite;
          }
          

          @media (max-width: 768px) {
            .orbit-image-vector6, .orbit-image-vector7 {
            width: 250%;
            height: 250%;
            }
          }
          `}
          </style>

          <div className="absolute top-0 left-0 z-0 border-orbit">
            <Image
              src="/Vector6.png"
              alt="Vector6 Rotating"
              width={800}
              height={600}
              className="orbit-image-vector6 object-contain"
            />
          </div>

          <div className="absolute top-0 left-0 z-0 border-orbit">
            <Image
              src="/Vector7.png"
              alt="Vector7 Rotating"
              width={800}
              height={600}
              className="orbit-image-vector7 object-contain"
            />
          </div>

          <h1 className="text-white petrovsans-book max-sm:text-[45px] md:text-[94px] mb-[60px] z-10 floating mt-[150px] max-sm:leading-[55px] md:leading-[122.8px]">
            <span className="max-sm:block md:inline">Your 360°</span> <span className="max-sm:block md:inline">Growth Engine</span>
          </h1>

          <p className="text-white justify-center mx-[10px] max-w-6xl z-10 max-sm:text-[16px] md:text-[19.69px] leading-[1.49] text-center mb-[322px] floating outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit
          </p>

                 

        {/* Puzzle Image */}
     <Image src={'/puzzle.png'} alt="Puzzle Icon"  width={ 100 } height = { 100 } className="w-120 h-auto mb-[-6%] z-10" />

        {/* Heading */}
        <h1 className="text-white text-[45px] md:text-[131.76px]  leading-[122.85px] z-10 petrovsans-semibold">
          Strategy
        </h1>

        {/* Paragraph */}
        <p className="text-white max-sm:[11.74px] md:text-[31.5px] mt-2 mb-10 z-10 outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[12px] mb-2 z-10 outfit-light" >
          {[
            'GTM Strategy',
            'Brand strategy',
            'Brand Voice',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[8px] mb-10 z-10 outfit-light">
          {[
            'Campaign Strategy',
            'PR Strategy',
            'Social Media Strategy',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Explore More Button */}
        <button className="mt-4 mb-[200px] px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10 text-[18.36px] outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}>
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>


        {/* Group Circle Image */}
       <Image src={'/groupcircle.png'} alt="Group Circle Icon" width={ 100 } height = { 100 } className="w-120 h-auto mb-[-20%] z-10" />

        {/* Heading */}
        <h1 className="text-white petrovsans-semibold text-[48px] md:text-[131.5px] z-10">
          Design & <br></br> Communications
        </h1>

        {/* Paragraph */}
        <p className="text-white max-sm:[11.74px] md:text-[31.5px] mt-2 mb-10 z-10 outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[12px] mb-2 z-10 outfit-light">
          {[
            'Brand Identity Design',
            'Website Design',
            'UI/UX Design',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[8px] mb-10 z-10 outfit-light">
          {[
            'Event Branding',
            'Office Branding',
            'Packaging',
            'Print & Digital Creatives'

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Explore More Button */}
        <button className="mt-4 mb-[200px] px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10 text-[18.36px] outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49'  }}>
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>


        {/* Heading */}
        <h1 className="flex text-white petrovsans-semibold text-[48px] md:text-[131.5px] leading-[122.85px] z-10 mt-[5%]">
          Production <Image src={'/box.png'} alt="Puzzle Icon" width={ 100 } height = { 100 } className="w-50 h-auto  mt-[-3%] mb-[5%] ml-[28%] z-[-60] absolute" />
        </h1>

        {/* Paragraph */}
        <p className="text-white max-sm:[11.74px] md:text-[31.5px] mt-2 mb-10 z-10 outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}>
         <Image src={'/box1.png'} alt="Puzzle Icon" width={ 100 } height = { 100 } className="w-30 h-auto ml-[-3%] mt-[-2%] mb-[5%] z-[-60] absolute " /> 
         Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[12px] mb-2 z-10 outfit-light">
          {[
            'Influencer Marketing',
            'Blogs / Articles',
            'Conceptualization of Content',
            'Motion Graphics',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[8px] mb-10 z-10 outfit-light">
          {[
            'Creative Copywriting',
            'Office High Quality Video Shoot & Production',
            'Reel Production',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] font-light border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Explore More Button */}
        <button className="mt-4 mb-[200px] px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10 text-[18.36px] outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49'  }}>
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>

        {/* Cloud Image */}
        <Image src={'/cloud.png'} alt="Cloud Icon" width={ 100 } height = { 100 } className="w-120 h-auto mb-[-20%] z-10" />

        {/* Heading */}
        <h1 className="text-white text-[45px] petrovsans-semibold md:text-[131.5px] z-10">
          Digital Marketing
        </h1>

        {/* Paragraph */}
        <p className="text-white max-sm:[11.74px] md:text-[31.5px] mt-2 mb-10 z-10 outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}> 
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        </p>

        <div className="flex flex-wrap justify-center gap-x-[8px] gap-y-[12px] mb-2 z-10 outfit-light">
          {[
            'Growth Marketing',
            'Social Media Management Packages',
            'SEO Optimization & Ranking',

          ].map((tag, idx) => (
            <button
              key={idx}
              className="inline-flex items-center justify-center h-[26px] px-[12px] max-sm:px-[8px]
                 max-sm:text-[12px] md:text-[20.56px] border border-[#F52FFF] rounded-[13.78px]
                 text-center whitespace-nowrap leading-none text-white"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Explore More Button */}
        <button className="mt-4 mb-[200px] px-6 py-2 text-white border border-white rounded-full flex items-center gap-2 z-10 text-[18.36px] outfit-light" style={{ letterSpacing: '0.08em', lineHeight: '1.49' }}>
          EXPLORE MORE
          <Image src={'/vector.png'} alt="Arrow Icon" width={ 100 } height = { 100 } className="w-8 h-3" />
        </button>

      </section>

      {/* Technological Solutions Section */}
      <section className="bg-black py-20 px-4 md:px-8">
        
        {/* Main Title */}
        <div className="flex items-center justify-center text-center mb-16">
          <h1 className="max-sm:text-[54px] md:text-[140px] leading-tight petrovsans-book z-50"
          >
            <span className="md:hidden" style={{ 
              color: 'transparent', 
              WebkitTextStroke: '2px #6210FF',
              textShadow: '0 0 0 #6210FF'
            }}>
              Technological<br />
              Solution
            </span>
            <span className="hidden md:block" style={{ 
              color: 'transparent', 
              WebkitTextStroke: '4px #6210FF' 
            }}>
              Technological<br />
              Solution
            </span>
          </h1>
        </div>

        {/* Agent VUA Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center">
            <h1 className="text-[48px] md:text-[131px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-8" style={{ lineHeight: '1.80' }}>
              Agent VUA
            </h1>

            <p className="text-[17px] md:text-[31px] text-[#BE2FF4] outfit-light px-4 py-5 mb-14">
              AI Powered telecalling agent to seamlessly handle <span className="md:block">all your inbound & outbound call</span>
            </p>

            <div className="bg-[#6210FF7A] p-4 md:p-8 rounded-3xl">
              <h1 className="text-[24px] md:text-[55px] text-white mb-8 md:mb-12" style={{ fontFamily: 'Outfit' }}>
                The Impact of Agent Vua
              </h1>

              <div className="grid grid-cols-3 text-white gap-2 md:gap-7 text-center">
                <div className="px-1 md:px-2">
                  <h3 className="text-[14px] md:text-[35.04px] outfit-light leading-tight">
                    Integrate With<br />
                    Your CRM
                  </h3>
                </div>
                <div className="px-1 md:px-2">
                  <h3 className="text-[14px] md:text-[35.04px] outfit-light leading-tight">
                    Integrated<br />
                    Virtual Numbers
                  </h3>
                </div>
                <div className="px-1 md:px-2">
                  <h3 className="text-[14px] md:text-[35.04px] outfit-light leading-tight">
                    Automate Pre-Sales/ Customers
                    Support Process
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agent Vision Section */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center">
            <h1 className="text-[48px] md:text-[131px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-8">
              Agent Vision
            </h1>

            <p className="text-[17px] md:text-[31px] text-[#BE2FF4] px-4 py-5 mb-12 outfit-light">
              Fast, affordable production quality films
            </p>

            <div className="flex flex-row flex-nowrap w-full text-white text-center mb-16 text-[13px] md:text-[35.04px] outfit-light leading-none">
              <div className="flex-1 py-4">Project<br />Walkthroughs</div>
              <div className="flex-1 py-4">Launch <br/> Videos</div>
              <div className="flex-1 py-4">Reel/Content<br />Generation</div>
              <div className="flex-1 py-4">Production & Films</div>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-center px-4 leading-none">
              <div className="py-2">
                <h1 className="text-[28px] md:text-[65px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  10%
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light">
                  Production<br />
                  Budget
                </p>
              </div>
              <div className="py-2">
                <h1 className="text-[28px] md:text-[65px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  50X
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light">
                  Faster time<br />
                  to market
                </p>
              </div>
              <div className="py-2">
                <h1 className="text-[28px] md:text-[65px] petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  100%
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light">
                  Realistic<br />
                  footage
                </p>
              </div>
            </div>
          </div>
        </div>

  

<div className="bg-black flex items-center justify-center text-center px-4 pt-[150px]">
  <div>
   <h1 className="text-[48px] sm:text-[131px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4]">
    Agent XR
   </h1>
   <p className="text-[17px] sm:text-[31px] text-[#BE2FF4] leading-none outfit-light mx-2 my-4 px-2 py-4 sm:m-8 sm:px-[10px] sm:py-[30px] text-center">
     Don’t leave it to their imagination, <span className="md:block">immerse them in the experience </span> 
   </p>
  
    <div className="grid grid-cols-4 gap-3 text-white outfit-light text-center mb-16 text-[14px] md:text-[35.04px]">
      <div className="py-4">Virtual Reality</div>
      <div className="py-4">Digital twins</div>
      <div className="py-4">Mixed reality</div>
      <div className="py-4">Realistic renderings</div>
    </div> 
  
  <div className="grid grid-cols-3 gap-3 text-center mb-[80px]">
              <div className="py-2">
                <h1 className="text-[28px] md:text-[65px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  90%
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light leading-none">
                  Cost Saving
                </p>
              </div>
              <div className="py-2">
                <h1 className="text-[28px] md:text-[65px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  50X
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light leading-none">
                  Faster time<br />
                  to market
                </p>
              </div>
              <div className="py-2">
                <h1 className="text-[28px] md:text-[65px] leading-tight petrovsans-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] mb-4">
                  400%
                </h1>
                <p className="text-white text-[18px] md:text-[35.04px] outfit-light leading-none">
                  Increased<br />
                  Engagement
                </p>
              </div>
            </div>
  </div>
</div>

      </section>

    </>

  );
}

