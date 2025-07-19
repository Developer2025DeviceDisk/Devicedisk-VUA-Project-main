'use client';
import React, { useCallback, useState, useMemo } from 'react';
import Image from 'next/image';
import { ChevronDown, Search } from 'lucide-react';
import { countries, Country } from '@/lib/countries';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedCountry: Country;
  setSelectedCountry: (country: Country) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ 
  value, 
  onChange, 
  selectedCountry, 
  setSelectedCountry 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return countries.filter(country => 
      country.name.toLowerCase().startsWith(lowerSearchTerm) || // Starts with search term
      country.code.toLowerCase() === lowerSearchTerm // OR matches country code exactly
    );
  }, [searchTerm]);

  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setShowDropdown(false);
    setSearchTerm('');
  }, [setSelectedCountry]);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const numbersOnly = e.target.value.replace(/\D/g, '').slice(0, 15);
    onChange(numbersOnly);
  }, [onChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex items-center pb-2 border-b border-gray-400 focus-within:border-[#6210FF]">
        <button
          type="button"
          className="flex items-center cursor-pointer mr-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Image 
            src={selectedCountry.flag} 
            alt={selectedCountry.code} 
            width={28}
            height={22}
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
          className="flex-1 outfit-light bg-transparent text-[15px] md:text-[20px] outline-none text-black placeholder-gray-500"
          placeholder="Phone*"
          required
          inputMode="numeric"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-20 bg-[#EEF0FF] border border-gray-200 rounded shadow-md mt-2 w-full max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-[#EEF0FF]">
          <div className="sticky top-0 bg-[#EEF0FF] p-2 border-b">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search countries..."
                className="w-full pl-10 pr-4 py-2 text-md text-black bg-[#EEF0FF] border rounded-md focus:outline-none focus:ring-1 focus:ring-[#6210FF] placeholder-gray-500 outfit-light"
                autoFocus
              />
            </div>
          </div>
          
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className="flex items-center gap-2 px-4 py-2 hover:bg-[#DDD8FF] cursor-pointer w-full text-left bg-[#EEF0FF]"
              >
                <Image 
                  src={country.flag} 
                  alt={country.name} 
                  width={28}
                  height={22}
                  className="w-5 h-3" 
                  loading="lazy"
                />
                <span className="text-md outfit-light">{country.name}</span>
                <span className="ml-auto text-md font-semibold outfit-light">{country.dialCode}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-black bg-[#EEF0FF]">No countries found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default React.memo(PhoneInput);