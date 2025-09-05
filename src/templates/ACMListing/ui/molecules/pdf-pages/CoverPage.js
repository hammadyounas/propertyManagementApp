// components/pdf-pages/CoverPage.js
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

const CoverPage = ({ acmData }) => {
  const formatDate = (date) => {
    if (!date) return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();

    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }).toUpperCase();
    } catch (error) {
      return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }).toUpperCase();
    }
  };

  const baseProperty = acmData?.base_property || {};
  const address = baseProperty.address
  ? `${baseProperty.address || ''} ${baseProperty.street_name || ''} ${baseProperty.street_number || ''} ${baseProperty.city || ''}`.trim()
  : '8105 NOTRE-DAME E, MERCIER (MONTREAL)';

  return (
    <div className="w-full min-h-screen flex flex-col" style={{ height: '1120px', width: '794px' }}>
      {/* Header */}
      <div className="p-8 bg-primary-default">
        <div className='flex justify-between'>
          <div className=''>
            <img
              src="/assets/images/logo/BLACK-WHITE-LOGO.png"
              alt="logo"
              className='w-[200px] object-contain'
            />
          </div>
          <div>
            <ul className='text-lg font-medium'>
              <li className='flex items-center gap-2'><Icon className='text-2xl mt-1' icon="basil:phone-solid" /><a href="tel:+15149297355" className='text-gray-800'> +1 514-929-7355</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl mt-1' icon="heroicons-outline:envelope" /><a href="mailto:Info@Buzzrealties.Ca" className='text-gray-800'> Info@Buzzrealties.Ca</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl mt-1' icon="stash:globe-solid" /><a href="https://www.Buzzrealties.ca" target='_blank' className='text-gray-800'> www.Buzzrealties.ca</a></li>
              <li className='flex items-center gap-2'><Icon className='text-2xl mt-1' icon="heroicons:map-pin-16-solid" /> 8500 boul Décarie, 3rd floor, Montreal H4P 2N2</li>
            </ul>
          </div>
        </div>

        {/* base property address */}
        <h1 className="text-2xl mt-6 text-center uppercase">
          {address} | {acmData.base_property.no_of_units || 18} UNITS
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 w-full h-full relative">
        {/* Background Image (Full Width) */}
        <div className="col-span-2">
          <img
            src={acmData.base_property.image || '/assets/images/pdf-img/CoverPageImage.webp'}
            alt="property image"
            className='w-full h-full object-contain object-cover'
          />
        </div>

        {/* Right side - Blurred overlay with content */}
        <div className="col-span-1 relative z-10">
          <div className="w-[400px] -ml-20 mt-24 relative z-10">
            <div className="">
              {/* Glass morphism container */}
              <div className="relative w-full">
                {/* Backdrop blur effect */}
                <div
                  className="absolute inset-0 rounded-l-2xl"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                ></div>

                {/* Content overlay */}
                <div className="relative z-10 p-5 uppercase">
                  <div className="">
                    <h2 className="text-3xl font-bold text-primary-default">
                      COMPARATIVE
                    </h2>
                    <h3 className="text-4xl font-bold text-white">
                      MARKET
                    </h3>
                    <h4 className="text-4xl font-bold text-white pb-2">
                      ANALYSIS
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* other right side content */}
          <div className='mt-28 p-5 uppercase'>
            <h6 className='text-lg'>PREPARED FOR</h6>
            <p className='font-bold text-3xl'>{acmData.created_by?.name || 'Client Name'} </p>
            <p>{formatDate(acmData.createdAt)}</p>
          </div>

          <div className='mt-8 p-5 uppercase'>
            <h6 className='text-lg'>PREPARED BY</h6>
            <p className='font-bold text-3xl'>{acmData.created_by?.name || 'User Name'} </p>
            <p className='text-base'><span className='font-bold'>E-mail:</span> {acmData.created_by?.email || 'email@example.com'}</p>
            <p className='text-base'><span className='font-bold'>Phone:</span> {acmData.created_by?.contact_number || 'Phone Number'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;