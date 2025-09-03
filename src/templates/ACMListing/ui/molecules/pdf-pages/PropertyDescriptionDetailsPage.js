// components/pdf-pages/PropertyDescriptionDetailsPage.js
import React from 'react';
import { propertyExpendituresLeftColumnFields, propertyExpendituresRightColumnFields } from '../../../functionality/pdfDataConstant';
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';

const PropertyDescriptionDetailsPage = ({ acmData }) => {
  const baseProperty = acmData.base_property || {};

  console.log(baseProperty);
  return (
    <div
      className="w-full bg-gray-100 min-h-screen p-8 flex flex-col"
      style={{ height: '1120px', width: '794px' }}
    >
      {/* Header */}
      <PdfHeader acmData={acmData} title="PROPERTY DESCRIPTION" />

      <div className='mt-2'>
        <div className='flex justify-between gap-4'>
          <img src={baseProperty?.images[0] || '/assets/images/all-img/property.jpeg'} alt="Property Image" className={`w-[350px] h-[150px] object-cover ${baseProperty.images[0] ? '' : 'hidden'}`} />
          <img src={baseProperty?.images[1] || '/assets/images/all-img/post-2.png'} alt="Property Image" className={`w-[350px] h-[150px] object-cover ${baseProperty.images[1] ? '' : 'hidden'}`} />
        </div>

        <div className='flex justify-center py-2'>
          <h3 className='text-lg fort-bold text-center border-b-2 border-primary-default'>RECENT CAPITAL EXPENDITURES</h3>
        </div>
      </div>
      <div>
        <p>ROOFTOP {baseProperty.rooftop_year}</p>
        <p>FURNACE AND HOT WATER TANK {baseProperty.furnace_hot_water_tank_year}</p>
      </div>

      {/* Property Information Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 my-6 text-black-500">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {propertyExpendituresLeftColumnFields.map((field, index) => (
            <div key={index} className="flex justify-between items-center pb-2">
              <span className="font-semibold uppercase">{field.label}</span>
              <span className={`whitespace-nowrap capitalize ${baseProperty[field.key] ? '' : 'border-none'}`}>{baseProperty[field.key] || field.default}</span>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {propertyExpendituresRightColumnFields.map((field, index) => (
            <div key={index} className="flex justify-between items-center pb-2">
              <span className="font-semibold uppercase">{field.label}</span>
              <span className={`capitalize ${baseProperty[field.key] ? '' : 'border-none'}`}>{baseProperty[field.key] || field.default}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDescriptionDetailsPage;