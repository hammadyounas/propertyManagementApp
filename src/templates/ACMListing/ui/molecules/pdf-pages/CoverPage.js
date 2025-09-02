// components/pdf-pages/CoverPage.js
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React from 'react';

const CoverPage = ({ acmData }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ height: '1120px', width: '794px' }}>
      {/* Header */}
      <div className="p-8 bg-primary-default">
        <div className='flex justify-between'>
          <div className=''>
            <Image
              src="/assets/images/logo/BLACK-WHITE-LOGO.png"
              alt="logo"
              width={200}
              height={200}
            />
          </div>
          <div>
            <ul className='text-lg font-medium'>
              <li className='flex items-center gap-2'><Icon className='text-2xl' icon="line-md:phone-filled" /><a href="tel:+15149297355" className='text-gray-800'> +1 514-929-7355</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl' icon="heroicons-outline:envelope" /><a href="mailto:Info@Buzzrealties.Ca" className='text-gray-800'> Info@Buzzrealties.Ca</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl' icon="stash:globe-solid" /><a href="https://www.Buzzrealties.ca" target='_blank' className='text-gray-800'> www.Buzzrealties.ca</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl' icon="heroicons:map-pin-16-solid" /> 8500 boul Décarie, 3rd floor, Montreal H4P 2N2</li>
            </ul>
          </div>
        </div>

        {/* base property address */}
        <h1 className="text-2xl mt-6 text-center">
          {acmData.base_property.address?.toUpperCase() || '8105 NOTRE-DAME E, MERCIER (MONTREAL)'} | {acmData.base_property.no_of_units || 18} UNITS
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div>
          <img src={acmData.base_property.image} alt="property image" className='w-full h-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default CoverPage;