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

    // Comprehensive validation
    let isValid = true;
    let errorMessage = '';

    // Validate required fields
    if (!formData.fullName.trim()) {
      isValid = false;
      errorMessage = 'Full name is required';
    } else if (!formData.phone.trim()) {
      isValid = false;
      errorMessage = 'Phone number is required';
    } else if (formData.phone.length < 8) {
      isValid = false;
      errorMessage = 'Phone number must be at least 8 digits';
    } else if (selected.length === 0) {
      isValid = false;
      errorMessage = 'Please select at least one service';
      setShowServicesError(true);
    }

    // Validate full name (only letters and spaces)
    if (formData.fullName.trim() && !/^[a-zA-Z\s]+$/.test(formData.fullName.trim())) {
      isValid = false;
      errorMessage = 'Full name should only contain letters and spaces';
    }

    // Validate phone number (only digits)
    if (formData.phone.trim() && !/^\d+$/.test(formData.phone.trim())) {
      isValid = false;
      errorMessage = 'Phone number should only contain digits';
    }

    // Validate company name if provided (letters, numbers, spaces, and common punctuation)
    if (formData.companyName.trim() && !/^[a-zA-Z0-9\s\-&.,()]+$/.test(formData.companyName.trim())) {
      isValid = false;
      errorMessage = 'Company name contains invalid characters';
    }

    if (!isValid) {
      alert(errorMessage);
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      return;
    }

    setIsLoading(true);

    try {
      const currentServicesList = content.servicesList || [];
      const selectedServices = selected.map((idx) => currentServicesList[idx]).filter(Boolean);
      
      const payload = {
        fullName: formData.fullName.trim(),
        companyName: formData.companyName.trim(),
        phone: selectedCountry.dialCode + formData.phone.trim(),
        services: selectedServices,
        message: formData.message.trim(),
      };

      console.log('Submitting payload:', payload);

      const response = await fetch('https://admin.vvworx.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit form');
      }

      console.log('Form submitted successfully:', result);
      setShowSuccessModal(true);
      setFormData({ fullName: '', companyName: '', phone: '', message: '' });
      setSelected([]);
    } catch (err) {
      console.error('Submission error:', err);
      alert(`Error submitting form: ${err instanceof Error ? err.message : 'Please try again.'}`);
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
          className='mt-4 cursor-pointer relative inline-flex items-center text-[24px] md:text-[35.81px] petrovsans-semibold gap-7 text-[#6210FF] px-6 tracking-[0.05em] font-semibold rounded-full disabled:opacity-70 disabled:cursor-not-allowed'
          style={{
            background:
              'linear-gradient(to right, #6210FF, #BE2FF4) border-box',
            padding: '2px',
          }}>
          <span className='bg-[#EEF0FF] rounded-full px-7 flex items-center gap-7'>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#6210FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Submit
                <span className='text-[35.81px]'>→</span>
              </>
            )}
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