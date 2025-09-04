// components/pdf-pages/CoverPage.js
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import React from 'react';

const PdfHeader = ({ acmData, title, titleClass }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };

  // Destructure with defaults for safer access
  const baseProperty = acmData?.base_property || {};
  const address = baseProperty.address || '8105 NOTRE-DAME E, MERCIER (MONTREAL)';
  const units = baseProperty.no_of_units || 18;

  return (
      <div className="">
        <div className='flex justify-between'>
          <div className=''>
            <img
              src="/assets/images/logo/BLACK-LOGO.png"
              alt="logo"
              className='w-[200px] object-contain'
            />
          </div>
          <div>
            <ul className='text-lg font-medium'>
              <li className='flex items-center gap-2'><Icon className='text-2xl flex items-center' icon="basil:phone-solid" /><a href="tel:+15149297355" className='text-gray-800'> +1 514-929-7355</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl flex items-center' icon="heroicons-outline:envelope" /><a href="mailto:Info@Buzzrealties.Ca" className='text-gray-800'> Info@Buzzrealties.Ca</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl flex items-center' icon="stash:globe-solid" /><a href="https://www.Buzzrealties.ca" target='_blank' className='text-gray-800'> www.Buzzrealties.ca</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl flex items-center' icon="heroicons:map-pin-16-solid" /> 8500 boul Décarie, 3rd floor, Montreal H4P 2N2</li>
            </ul>
          </div>
        </div>

        <div className={`${titleClass} ${title ? 'flex justify-center mt-6' : 'hidden'}`}>
        <h2 className="text-3xl font-semibold text-black-500 border-b-2 border-primary-default pb-4 tracking-wider text-center">
          {title}
        </h2>
      </div>

        {/* base property address */}
        <div className='mt-6 flex justify-between'>
          <h1 className="text-xl mt-6 text-center">
            ADDRESS: {address.toUpperCase()}
          </h1>
          <h1 className="text-xl mt-6 text-center">
            {units} UNITS
          </h1>
        </div>
      </div>
  );
};

export default PdfHeader;