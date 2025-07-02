'use client';
import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import PhoneInput from './phoneInput'; // Adjust the import path as needed
import { countries, Country } from '@/lib/countries'; // adjust path as needed

// Lazy load Map to avoid initial render weight
const Map = dynamic(() => import('./map'), { ssr: false });

const openings = [
  'Brand Manager',
  'UI Designer',
  'Marketing Intern',
  'Senior Designer',
  'Animator',
  'Business Development',
];
const topThree = openings.slice(0, 3);
const bottomFour = openings.slice(3);

const servicesList = [
  'Strategy',
  'Branding & Design',
  'Content & Production',
  'Digital Marketing',
  'Agent Vua',
  'Agent Vision',
  'Agent XR',
];

const ContactForm = React.memo(function ContactForm() {
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[8]); // Default to India
  const [showServicesError, setShowServicesError] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePhoneChange = useCallback((phone: string) => {
    setFormData((prev) => ({ ...prev, phone }));
  }, []);

  const toggleSelection = useCallback((idx: number) => {
    setSelected((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );
  //cc

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error states
    setShowServicesError(false);

    // Validate required fields
    let isValid = true;

    if (selected.length === 0) {
      setShowServicesError(true);
      isValid = false;
    }

    if (!formData.fullName || !formData.phone || !formData.message) {
      isValid = false;
    }

    // Validate phone number length
    if (formData.phone.length < 8) {
      isValid = false;
    }

    if (!isValid) {
      // Scroll to the first error
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    setIsLoading(true);

    try {
      const selectedServices = selected.map((idx) => servicesList[idx]);
      const payload = {
        ...formData,
        phone: selectedCountry.dialCode + formData.phone,
        services: selectedServices,
      };

      const response = await fetch('https://admin.vvworx.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit form');

      setShowSuccessModal(true);
      setFormData({ fullName: '', companyName: '', phone: '', message: '' });
      setSelected([]);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showSuccessModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-8 rounded-lg max-w-md w-full mx-4'>
            <h3 className='text-2xl font-bold text-[#6210FF] mb-4'>
              Thank You!
            </h3>
            <p className='mb-6'>
              We've received your message and will contact you as soon as
              possible.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className='w-full bg-[#6210FF] text-white py-2 rounded-md hover:bg-[#BE2FF4] transition'>
              Close
            </button>
          </div>
        </div>
      )}

      <form
        className='space-y-8 w-full'
        onSubmit={handleSubmit}>
        <input
          type='text'
          name='fullName'
          value={formData.fullName}
          onChange={handleInputChange}
          className='block outfit-light w-full border-b text-[15px] md:text-[20px] pb-2 border-gray-400 focus:outline-none focus:border-[#6210FF] text-black placeholder-black'
          placeholder='Full Name*'
          required
        />

        <input
          type='text'
          name='companyName'
          value={formData.companyName}
          onChange={handleInputChange}
          className='outfit-light block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none focus:border-[#6210FF] text-black placeholder-black'
          placeholder='Company Name'
        />

        <PhoneInput
          value={formData.phone}
          onChange={handlePhoneChange}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        <p className='outfit-light text-[19.69px] md:text-[20px] text-black'>
          Services{' '}
          <span className='text-[14px] md:text-[18px]'>
            (Select at least one)*
          </span>
        </p>
        {showServicesError && (
          <p className='text-red-500 text-lg font-bold'>
            Please select at least one service
          </p>
        )}
        <div className='flex flex-wrap gap-[8px] mt-[15px] md:gap-[16px]'>
          {servicesList.map((item, idx) => {
            const isSelected = selected.includes(idx);
            return (
              <button
                key={idx}
                type='button'
                onClick={() => {
                  toggleSelection(idx);
                  setShowServicesError(false); // Hide error when user selects something
                }}
                className={`group border border-[#6210FF] outfit-light text-[13px] md:text-[20.5px] rounded-full px-2 py-1 md:px-4 transition whitespace-nowrap inline-block
          ${isSelected ? 'bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-white' : 'text-black'}`}>
                <span
                  className={`transition ${
                    isSelected
                      ? ''
                      : 'group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text'
                  }`}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>

        <textarea
          name='message'
          value={formData.message}
          onChange={handleInputChange}
          className='outfit-light block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none focus:text-[#6210FF] text-black placeholder-black'
          placeholder='Message*'
          required
          rows={1}
        />

        <button
          type='submit'
          disabled={isLoading}
          className='mt-4 relative inline-flex items-center text-[24px] md:text-[35.81px] petrovsans-semibold gap-7 text-[#6210FF] px-6 tracking-[0.05em] font-semibold rounded-full'
          style={{
            background:
              'linear-gradient(to right, #6210FF, #BE2FF4) border-box',
            padding: '2px',
          }}>
          <span className='bg-[#EEF0FF] rounded-full px-7 flex items-center gap-7'>
            {isLoading ? 'Processing...' : 'Submit'}
            {isLoading ? (
              <span className='inline-block h-6 w-6 border-2 border-[#6210FF] border-t-transparent rounded-full animate-spin'></span>
            ) : (
              <span className='text-[35.81px]'>→</span>
            )}
          </span>
        </button>
      </form>
    </>
  );
});

export default function ContactUsPage() {
  return (
    <>
      <div className='relative min-h-screen bg-[#EEF0FF] pb-6 pt-[120px] py-12 px-8 md:px-20'>
        <h1 className='text-[55px] md:text-[94.5px] petrovsans-book text-center bg-gradient-to-r from-[#6210FF] to-[#BE2FF4] text-transparent bg-clip-text'>
          Reach Us
        </h1>
        <p className='text-center text-[10px] md:text-[20px] md:max-w-[1176px] outfit-light leading-[149%] tracking-[0.08em] mx-auto mt-6 text-[#6210FF]'>
          At Voix & Vision Worx, we are dedicated to transforming your
          aspirations into tangible achievements. We partner with businesses to
          navigate complex challenges and unlock new possibilities, leveraging
          our expertise to deliver innovative and impactful solutions. Our
          commitment is to your success, helping you connect, engage, and grow
          in an ever-evolving landscape. Contact us today to explore how our
          collaborative approach can help achieve your strategic goals.
        </p>
        <div className='mt-16 grid md:max-w-[1176px] md:grid-cols-2 gap-10 items-start'>
          <div>
            <h2 className='text-[40px] md:text-[51px] petrovsans-book text-center md:text-start text-[#6210FF] mb-6'>
              I am interested in
            </h2>
          </div>
          <ContactForm />
        </div>
      </div>

      <div className='relative min-h-screen bg-[#EEF0FF] py-12'>
        <div className='mt-[79px]'>
          <h1 className='text-[55px] md:text-[94.5px] petrovsans-book text-center text-[#6210FF]'>
            Our Presence
          </h1>
        </div>
        <div className='mt-16 flex justify-center w-full'>
          <div className='w-full md:w-[100%]'>
            <Map />
          </div>
        </div>
      </div>

      <div className='px-6 py-16 md:py-24 text-center bg-[#EEF0FF]'>
        <h1 className='text-[40px] max-sm:px-20 md:text-[94.5px] petrovsans-book text-[#6210FF] leading-tight'>
          Looking For
          <br className='md:hidden' />{' '}
          <span className='whitespace-nowrap'>VUA Filling</span>
        </h1>

        <h2 className='mt-[18px] md:mt-[41px] text-[24px] md:text-[31.5px] petrovsans-semibold text-black'>
          Current Opening
        </h2>

        <div className='mt-[18px] md:mt-[41px] max-w-4xl mx-auto hidden md:flex flex-col gap-4'>
          <div className='flex justify-center gap-4'>
            {topThree.map((role, index) => (
              <span
                key={index}
                className='group border border-[#6210FF] text-black px-4 rounded-full outfit-light text-sm md:text-base'>
                <span className='group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text transition'>
                  {role}
                </span>
              </span>
            ))}
          </div>

          <div className='flex justify-center gap-4'>
            {bottomFour.map((role, index) => (
              <span
                key={index + 3}
                className='group border border-[#6210FF] text-black px-4 rounded-full outfit-light text-sm md:text-base'>
                <span className='group-hover:bg-gradient-to-r group-hover:from-[#6210FF] group-hover:to-[#BE2FF4] group-hover:text-transparent group-hover:bg-clip-text transition'>
                  {role}
                </span>
              </span>
            ))}
          </div>
        </div>

        <p className='mt-[72px] md:mt-[93px] text-[19px] petrovsans-book md:text-[23.62px] text-gray-800'>
          Work With Us:{' '}
          <a
            href='mailto:hr@vvworx.com'
            className='block md:inline text-[#6210FF] text-[28.67px] petrovsans-semibold md:text-[35.44px] font-semibold'>
            hr@vvworx.com
          </a>
        </p>
      </div>
    </>
  );
}
