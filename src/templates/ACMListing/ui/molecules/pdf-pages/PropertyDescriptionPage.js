import React from 'react';
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';
import { propertyDescriptionLeftColumnFields, propertyDescriptionRightColumnFields } from '../../../functionality/pdfDataConstant';

const PropertyDescriptionPage = ({ acmData }) => {
  const baseProperty = acmData.base_property || {};

  return (
    <div
      className="w-full bg-gray-100 min-h-screen p-8 flex flex-col"
      style={{ height: '1120px', width: '794px' }}
    >
      {/* Header */}
      <PdfHeader acmData={acmData} title="PROPERTY DESCRIPTION" />

      {/* Property Information Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 my-12 text-black-500">
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {propertyDescriptionLeftColumnFields.map((field, index) => (
            <div key={index} className="flex justify-between items-center pb-2">
              <span className="font-semibold">{field.label}</span>
              <span className={`whitespace-nowrap capitalize ${baseProperty[field.key] ? '' : 'border-none'}`}>{baseProperty[field.key] || field.default}</span>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">
          {propertyDescriptionRightColumnFields.map((field, index) => (
            <div key={index} className="flex justify-between items-center pb-2">
              <span className="font-semibold">{field.label}</span>
              <span className={`whitespace-nowrap capitalize ${baseProperty[field.key] ? '' : 'border-none'}`}>{baseProperty[field.key] || field.default}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDescriptionPage;
