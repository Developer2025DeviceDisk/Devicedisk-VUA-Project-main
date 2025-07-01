'use client';
import React, { useCallback, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { countries, Country } from '@/lib/countries';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void; // Changed this line

}

const PhoneInput: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange, 
  selectedCountry, 
  setSelectedCountry 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCountrySelect = useCallback((country: Country) => {
  setSelectedCountry(country); // Now this should match the expected type
  setShowDropdown(false);
}, [setSelectedCountry]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit length
    const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 15);
    onChange(numbersOnly);
  }, [onChange]);

  return (
    <div className="relative w-full">
      <div className="flex items-center pb-2 border-b border-gray-400 focus-within:border-[#6210FF]">
        <button
          type="button"
          className="flex items-center cursor-pointer mr-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img 
            src={selectedCountry.flag} 
            alt={selectedCountry.code} 
            className="w-6 h-4 mr-1" 
            loading="lazy"
          />
          <span className="text-black outfit-light text-[15px] md:text-[20px]">
            {selectedCountry.dialCode}
          </span>
          <ChevronDown size={16} className="text-black ml-1" />
        </button>

        <input
          type="tel"
          value={value}
          onChange={handlePhoneChange}
          className="flex-1 outfit-light bg-transparent text-[15px] md:text-[20px] outline-none text-black placeholder-black"
          placeholder="Phone*"
          required
          inputMode="numeric"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-20 bg-white border border-gray-200 rounded shadow-md mt-2 w-full max-h-64 overflow-y-auto">
          {countries.map((country) => (
            <button
              key={country.code}
              type="button"
              onClick={() => handleCountrySelect(country)}
              className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer w-full text-left"
            >
              <img 
                src={country.flag} 
                alt={country.name} 
                className="w-5 h-3" 
                loading="lazy"
              />
              <span className="text-sm text-black">{country.name}</span>
              <span className="ml-auto text-sm text-gray-500">{country.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(PhoneInput);