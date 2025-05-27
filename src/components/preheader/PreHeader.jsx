import React from 'react';
import GoogleTranslate from '../common/GoogleTranslate';

const PreHeader = () => {
  return (
    <div className='bg-green-600 px-6 py-2 w-full text-white'>
      <div className='container mx-auto flex flex-wrap justify-between items-center'>
        {/* Left Section - Government Info */}
        <div className='flex items-center space-x-2'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg'
            className='w-8 h-8'
            alt='Emblem of India'
          />
          <div>
            <p className='font-semibold text-white text-xs sm:text-sm'>
              Ministry of Skill Development and Entrepreneurship
            </p>
            <p className='text-xs text-green-100 hidden sm:block'>
              Kisaan First, India First
            </p>
          </div>
        </div>

        {/* Google Translate */}
        <div className='z-10 translate-container bg-white/10 rounded-md px-2 py-1'>
          <GoogleTranslate />
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
