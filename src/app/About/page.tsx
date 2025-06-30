'use client';
import Image from 'next/image';
export default function AboutPage() {
const team = [

  {
    name: "Shivendra Singh",
    role: "Co-Founder",
    image: "/team-left.png",
    isFocused: false,
  },
  {
    name: "Aishwarya Chaudhary",
    role: "Business Strategy",
    image: "/team-aishwarya.png", 
    isFocused: true,
  },
  {
    name: "Aishwarya Chaudhary",
    role: "Business Strategy",
    image: "/team-right.png",
    isFocused: false,
  },
];
  return (
    <>
<section className="relative flex flex-col md:flex-row md:gap-20 items-end justify-between px-4 sm:px-8 lg:px-20 bg-gradient-to-tr from-[#6210FF] to-[#BE2FF4] text-white overflow-hidden">
  {/* Left: Text */}
  <div className=" py-[163px] px-auto ">
    <h1 className="font-bold text-[93.72px] sm:text-[45px] lg:text-[80px] leading-30" >
      Your Voice In <br />
      The Future Of <br />
      Marketing.
    </h1>
  </div>

  {/* Right */}
  <div className="relative w-full lg:w-1/2 flex items-center lg:justify-center">

    <Image
      src="/Markofinnovation.png"
      alt="Arc"
      className="absolute z-0 w-[180px] sm:w-[250px] lg:w-[609.53px] h-auto object-contain"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-43%, -90%)',
      }}
    />

    <Image
      src="/Marketingwoman.png"
      alt="Marketing Woman"
      className="relative z-10 w-[180px] sm:w-[250px] lg:w-[570px] h-auto object-contain"

    />
  </div>
</section>

<section className="min-h-[60vh] flex flex-col items-center justify-center bg-[#EEF0FF] px-4 py-16">

  <div className="flex items-center justify-center ">
    <Image
      src="/Group 26.png"
      alt="VUA WAH olg wow वा"
      className="w-full max-w-[90%] mx-auto my-auto sm:max-w-[80%] md:max-w-[70%] lg:w-[1169.73px] h-auto lg:mt-[211.04px] opacity-60"
    />
  </div>

  <p className=" text-[#6210FF] text-4xl font-extrabold text-center mt-[78.53px] mb-[20px] leading-[120%] tracking-[2%]">
    ‘Vua’ is the Voice that will lead the dialogue<br />
    for a future-forward world of Marketing.
  </p>
</section>


<section
  className="relative min-h-screen w-full bg-[url('/Whoarewe.png')] bg-cover bg-center text-white px-6 py-16 lg:py-32"
>
  <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
    
    {/* Left Side: */}
    <div className="relative w-full lg:w-1/2 hidden lg:block">

      <Image
        src="/Layer_1.png"
        alt="Decorative Arc"
        className="absolute top-1/2 left-1/2 transform -translate-x-[38%] -translate-y-[60%] w-[1200px] z-0"
      />

      <Image
        src="/astronaut.png"
        alt="Astronaut"
        className="relative z-10 mx-auto w-[519px] h-auto"
      />
    </div>

    {/* Right Side */}
    <div className="w-full lg:w-1/2 text-left">
      <h2
        className="text-4xl sm:text-5xl lg:text-[67px] font-thin mb-[77px]"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Who Are We?
      </h2>
      <p
        className="text-base sm:text-lg lg:text-[19.69px] leading-relaxed mb-4"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        We are a future-focused Marketing agency that aims to help brands leverage the latest in marketing creativity and technology to achieve their Growth KPIs.
        <span className="font-semibold text-white">
          {" "}Our 360-degree service portfolio of creative, digital and Mar-Tech solutions{" "}
        </span>
        empowers brands to lead, not follow, in a world shaped by innovation.
      </p>
      <p
        className="text-base sm:text-lg leading-relaxed"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        VUA is more than a brand—it’s a movement for those who seek to lead the next era of change.
      </p>
    </div>
  </div>
</section>



<section className="min-h-screen flex items-center justify-center bg-[#EEF0FF] px-8 py-12">
  <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-0">

   
    <div className="relative flex-shrink-0 flex flex-col items-start w-full md:w-auto">
      <div className="relative flex items-center justify-start w-full md:w-auto min-h-[220px]">
        <h2 className="text-[48px] sm:text-[90px] leading-[48px] sm:leading-[90px] font-extrabold text-[#6210FF] z-10 text-left">
          Our<br />Foundation
        </h2>
        <Image
          src={'/GlassRing.png'}
          alt="Glass Ring" width={ 100 } height = { 100 }
          className="absolute left-0 md:left-1/2 top-1/2 md:-translate-x-1/2 -translate-y-1/2 w-[264px] h-[110px] sm:w-[493.36px] sm:h-[448.91px] pointer-events-none select-none"
          style={{ zIndex: 1 }}
        />
      </div>
    </div>

<div className="flex flex-col gap-12 w-full md:w-1/2">
  {[
    {
      title: "Creativity",
      subtitle: "Creativity That Inspires",
    },
    {
      title: "Innovation",
      subtitle: "Technology That Keeps You Ahead",
    },
    {
      title: "Strategic Thinking",
      subtitle: "Strategy That Always Makes You Win",
    },
    {
      title: "Customer Centricity",
      subtitle: "Everything Is About “You”",
    },
  ].map(({ title, subtitle }, index) => (
    <div key={index}>
      <h3 className="text-[48px] font-extrabold leading-[56px] bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">
        {title}
      </h3>
      <p className="text-[18px] font-light leading-[28px] mt-1 bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text">
        {subtitle}
      </p>
    </div>
  ))}
</div>


  </div>
</section>

 <section className="bg-[#EEF0FF] py-16 px-6 md:px-20">
  <h2 className="text-[94.5px] font-extrabold text-center text-[#6210FF] mb-12">
    Director
  </h2>

  <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">

    <div className="md:col-span-5 flex justify-center">
      <div className="relative w-full max-w-[300px] h-[480px] sm:h-[475px]">
        <Image
          src="/vishal.png"
          alt="Vishal Sharma"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    </div>

    <div
      className="md:col-span-7 text-[#6210FF] leading-relaxed tracking-[0.08em] space-y-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <p>
        A seasoned leader with over <strong>25 years</strong> of diverse
        industry experience spanning{" "}
        <strong>
          Media, Telecom, Real Estate, Infrastructure, and Utilities
        </strong>
        , Vishal is recognized for his ability to develop and implement
        winning, comprehensive <strong>Marketing Communication</strong> and{" "}
        <strong>Branding Strategies</strong> in complex environments. His
        expertise as a brand marketing leader encompasses cross-functional
        knowledge of both <strong>Domestic And Global Markets</strong>.
      </p>
      <p>
        Prior to his entrepreneurial ventures, Vishal held{" "}
        <strong>Senior Managerial Positions</strong> leading{" "}
        <strong>Branding & Communications</strong> at prestigious
        organizations including{" "}
        <strong>
          Bharti Airtel, Vodafone, Reliance, Etisalat, Essel Group, Anarock,
          GreenCell Mobility, and PropertyPistol
        </strong>
        .
      </p>
    </div>
  </div>
</section>



    <section className="bg-[#EEF0FF] py-16 px-6 md:px-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">

    <div className="md:col-span-5 flex justify-center">
      <div className="relative w-full max-w-[300px] h-[480px] sm:h-[475px]">
        <Image
          src="/Shivendra.png"
          alt="Shivendra Singh"
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    </div>

    <div
      className="md:col-span-7 text-[#6210FF] leading-relaxed tracking-[0.08em] space-y-4"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      <p>
        A seasoned business leader with over <strong>17 years</strong> of
        experience in the <strong>Real Estate Industry</strong> across India
        and international markets, including the GCC, Europe, and North
        America. He has held key positions in prestigious organizations such as{" "}
        <strong>
          AllCheckDeals (InfoEdge), Proptiger.com, JLL, ANAROCK
        </strong>, and <strong>PropertyPistol</strong>. He has been
        instrumental in successfully managing both Indian and international
        portfolios, showcasing a proven ability to navigate diverse market
        dynamics.
      </p>
    </div>
  </div>
</section>



<section className="bg-black text-white py-20 px-4 sm:px-6 md:px-8 text-center">
  <h2 className="text-6xl md:text-[100px] font-extrabold bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] bg-clip-text text-transparent block mb-20">
    Our Team
  </h2>

  <div className="flex justify-center gap-8 sm:gap-12 md:gap-20 flex-wrap md:flex-nowrap">
    {team.map((member, index) => {
      const isVisible = member.isFocused ? "block" : "hidden md:block";
      return (
        <div
          key={index}
          className={`relative flex flex-col items-center transition-all duration-300 ${isVisible} ${
            member.isFocused ? "scale-110 z-10" : "blur-sm opacity-100"
          }`}
        >

          <div className="relative w-[240px] h-[340px] sm:w-[280px] sm:h-[400px] mb-[-60px] z-20">
            <Image
              src={member.image}
              alt={member.name}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="text-center mt-6">
            <p className="text-xl sm:text-2xl font-extrabold leading-tight">
                {member.name.split(" ")[0]}<br />
                {member.name.split(" ")[1]}
            </p>
            <p className="text-sm sm:text-base text-[#BE2FF4] font-semibold">
              {member.role}
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>

    </>
  );
}
