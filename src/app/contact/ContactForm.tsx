'use client';
import React, { useState, useCallback } from 'react';
import PhoneInput from './phoneInput';
import { countries, Country } from '@/lib/countries';

// TypeScript interfaces for dynamic content
interface ContactContent {
  heroSection?: {
    title: string;
    description: string;
    formSectionTitle: string;
  };
  servicesList?: string[];
  servicesLabel?: string;
  servicesSubtext?: string;
  mapSection?: {
    title: string;
  };
  jobSection?: {
    title: string;
    subtitle: string;
    openings: string[];
    contactText: string;
    contactEmail: string;
  };
  styling?: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
  };
}

const ContactForm = React.memo(function ContactForm({ 
  content 
}: { 
  content: ContactContent 
}) {
  const [selected, setSelected] = useState<number[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(country => country.code === 'IN') || countries[0]  // Default to India
  );  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error states
    setShowServicesError(false);

    // Validate required fields
    let isValid = true;

    if (!formData.fullName || !formData.phone) {
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
      const currentServicesList = content.servicesList || [];
      const selectedServices = selected.map((idx) => currentServicesList[idx]);
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
      <form
        className='space-y-8 w-full'
        onSubmit={handleSubmit}>
        <input
          type='text'
          name='fullName'
          value={formData.fullName}
          onChange={handleInputChange}
          className='block outfit-light w-full border-b text-[15px] md:text-[20px] pb-2 border-gray-400 focus:outline-none focus:border-[#6210FF] text-black placeholder-gray-500'
          placeholder='Full Name*'
          required
        />

        <input
          type='text'
          name='companyName'
          value={formData.companyName}
          onChange={handleInputChange}
          className='outfit-light block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none focus:border-[#6210FF] text-black placeholder-gray-500'
          placeholder='Company Name'
        />

        <PhoneInput
          value={formData.phone}
          onChange={handlePhoneChange}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />

        <p className='outfit-light text-[19.69px] md:text-[20px] text-black'>
          {content.servicesLabel || 'Services'}{' '}
          <span className='text-[14px] md:text-[18px]'>
            {content.servicesSubtext || '(Select at least one)'}
          </span>
        </p>
        {showServicesError && (
          <p className='text-red-500 text-lg font-bold'>
            Please select at least one service
          </p>
        )}
        <div className='flex flex-wrap gap-[8px] mt-[15px] md:gap-[16px]'>
          {(content.servicesList || []).map((item, idx) => {
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
          className='outfit-light block w-full text-[15px] md:text-[20px] pb-2 border-b border-gray-400 focus:outline-none text-black placeholder-gray-500'
          placeholder='Message'
          rows={1}
        />

        <button
          type='submit'
          disabled={isLoading}
          className='mt-4 cursor-pointer relative inline-flex items-center text-[24px] md:text-[35.81px] petrovsans-semibold gap-7 text-[#6210FF] px-6 tracking-[0.05em] font-semibold rounded-full'
          style={{
            background:
              'linear-gradient(to right, #6210FF, #BE2FF4) border-box',
            padding: '2px',
          }}>
          <span className='bg-[#EEF0FF] rounded-full px-7 flex items-center gap-7'>
            Submit
            <span className='text-[35.81px]'>→</span>
          </span>
        </button>

        {showSuccessModal && (
          <div className='text-center py-4'>
            <p className='text-[#6210FF] text-lg petrovsans-semibold'>
              Thank you! We've received your message and will contact you soon.
            </p>
          </div>
        )}

      </form>
    </>
  );
});

export default ContactForm;