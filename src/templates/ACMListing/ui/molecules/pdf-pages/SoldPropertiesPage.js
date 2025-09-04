import React from 'react';
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';
import { getSoldPropertiesData } from '../../../functionality/pdfDataConstant';
import { formatCurrency, formatPercentage } from '../../../../../libs/utils/pdfFormats';

const SoldPropertiesPage = ({ acmData }) => {
  const { propertiesData } = getSoldPropertiesData(acmData) || { propertiesData: [] };

  const formatValue = (value, type = 'text') => {
    if (!value && value !== 0) return 'N/A';
  
    if (type === 'currency') return formatCurrency(value);
    if (type === 'percent') return formatPercentage(value);
    if (type === 'date') {
      const date = new Date(value);
      if (isNaN(date)) return 'N/A'; // If invalid date
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
  
    return value;
  };
  

  const PropertyCard = ({ property }) => {
    return (
      <div className="border border-primary-default rounded-md my-2 p-2">
        {/* Header */}
        <h2 className="font-bold text-base mb-2 uppercase">{property.address + ' ' + property.street_name + ' ' + property.street_number + ' ' + property.city || 'Unknown Address'}</h2>

        <div className='grid grid-cols-5 gap-2'>
          {/* Image */}
          <div className="mb-4 col-span-2">
            <img
              src={property.images || '/assets/images/all-img/property.jpeg'}
              alt={property.address || 'Property'}
              className="w-full h-[130px] object-cover"
            />
          </div>
          {/* Details */}
          <div className="text-[10px] col-span-3 flex justify-between font-semibold uppercase space-x-2 w-full">
            <div className="w-full flex justify-between">
              <div className='space-y-2'>
              <p>Price</p>
              <p>Date of Sale</p>
              <p>Cost Per Unit</p>
              <p>Gross Income Multiplier</p>
              <p>Cap Rate</p>
              </div>
              <div className='space-y-2'>
              <p>{formatValue(property.price, 'currency')}</p>
              <p>{formatValue(property.date_sold, 'date')}</p>
              <p>{formatValue(property.cost_per_unit, 'currency')}</p>
              <p>{formatValue(property.gross_income_multiplier)}</p>
              <p>{formatValue(property.cap_rate, 'percent')}</p>
              </div>
            </div>
            <div className="space-y-2 w-full flex justify-between">
              <div className='space-y-2'>
                <p>Number of Units</p>
                <p>Unit Size</p>
                <p>Year of Construction</p>
                <p>Heating Responsibility</p>
                <p>Hot Water Responsibility</p>
                <p>Distance</p>
              </div>
              <div className='space-y-2'>
              <p>{formatValue(property.no_of_units)}</p>
              <p>{formatValue(property.unit_size)}</p>
              <p>{formatValue(property.year_of_construction)}</p>
              <p>{formatValue(property.heating_responsibility)}</p>
              <p>{formatValue(property.hot_water_responsibility)}</p>
              <p>{formatValue(property.distance)}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div
      className="w-full bg-gray-100 min-h-screen p-8 flex flex-col overflow-hidden"
      style={{ height: '1120px', width: '794px' }}
    >
      <PdfHeader title="SOLD PROPERTIES" />

      <div>
        {propertiesData?.map((property, index) => (
          <PropertyCard key={index} property={property} />
        ))}
      </div>
    </div>
  );
};

export default SoldPropertiesPage;