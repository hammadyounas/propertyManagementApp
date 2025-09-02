// components/pdf-pages/SoldPropertiesPage.js
import React from 'react';

const SoldPropertiesPage = ({ acmData }) => {
  // Sample sold properties data
  const soldProperties = [
    {
      address: '9964 PAPINEAU, AHUNTSIC',
      units: 25,
      price: 2445000,
      ppu: 98000,
      dateSold: '2019-08',
      gim: 23.0,
      capRate: '4.4%',
      unitSize: '6x4.5+11x3.5+.x2.5+5x.1.5',
      hotWater: 'LOCAL',
      heating: 'LOCAL',
      yearConstruction: '1973 BRICK AND WOOD',
      distance: '2.3KM'
    },
    {
      address: '10185 BERRI, AHUNTSIC',
      units: 16,
      price: 1750000,
      ppu: 109000,
      dateSold: '2019-09',
      gim: 22.7,
      capRate: '4.4%',
      unitSize: '8x4.5+8x3.5',
      hotWater: 'LOCAL',
      heating: 'LOCAL',
      yearConstruction: '1964 BRICK AND WOOD',
      distance: '0.7KM'
    },
    {
      address: '9740 PAPINEAU, AHUNTSIC',
      units: 31,
      price: 2920000,
      ppu: 94000,
      dateSold: '2019-04',
      gim: 22.1,
      capRate: '4.5%',
      unitSize: '4X4.5+18X3.5+9 STUDIOS',
      hotWater: 'LOCAL',
      heating: 'OWNER',
      yearConstruction: '1970 BRICK AND WOOD',
      distance: '2.4KM'
    },
    {
      address: '1759 HENRI-BOURASSA E, AHUNTSIC',
      units: 38,
      price: 3990000,
      ppu: 105000,
      dateSold: '2018-10',
      gim: 22.1,
      capRate: '4.5%',
      unitSize: '3X4.5+20X3.5+15 STUDIOS',
      hotWater: 'OWNER',
      heating: 'OWNER',
      yearConstruction: '1967 BRICK',
      distance: '2.2KM'
    }
  ];

  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()}$`;
  };

  return (
    <div className="w-full bg-purple-200 min-h-screen p-8 flex flex-col" style={{ height: '1120px', width: '794px' }}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {acmData.base_property.address?.toUpperCase() || '8105 NOTRE- DAME E, MERCIER (MONTREAL)'}
        </h1>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold">ADDRESS: </span>
            <span className="text-lg">{acmData.base_property.address || '8105 NOTRE-DAME E, MERCIER (MONTREAL)'}</span>
          </div>
          <div>
            <span className="text-lg font-semibold">UNITS: </span>
            <span className="text-lg">{acmData.base_property.no_of_units || 18}</span>
          </div>
        </div>
      </div>

      {/* Sold Properties Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wider">
          S O L D &nbsp;&nbsp; P R O P E R T I E S &nbsp;&nbsp; 1 2 &nbsp;&nbsp; M o n t h
        </h2>
      </div>

      {/* Property Cards */}
      <div className="space-y-6">
        {soldProperties.map((property, index) => (
          <div key={index} className="border-2 border-gray-300 rounded-lg p-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-3">
                <div className="text-lg font-bold text-blue-800">
                  {property.address}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">PRICE:</span> {formatCurrency(property.price)}
                  </div>
                  <div>
                    <span className="font-semibold">CAP RATE:</span> {property.capRate}
                  </div>
                  
                  <div>
                    <span className="font-semibold">COST PER UNIT:</span> {formatCurrency(property.ppu)}
                  </div>
                  <div>
                    <span className="font-semibold">DATE OF SALE:</span> {property.dateSold}
                  </div>
                  
                  <div>
                    <span className="font-semibold">GIM:</span> {property.gim}
                  </div>
                  <div>
                    <span className="font-semibold">NUMBER OF UNITS:</span> {property.units}
                  </div>
                </div>
              </div>

              {/* Right Column - Detailed Info */}
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold">HOT WATER RESPONSIBILITY:</span> {property.hotWater}
                </div>
                
                <div>
                  <span className="font-semibold">YEAR OF CONSTRUCTION:</span> {property.yearConstruction}
                </div>
                
                <div>
                  <span className="font-semibold">UNIT SIZE:</span> {property.unitSize}
                </div>
                
                <div>
                  <span className="font-semibold">HEATING RESPONSIBILITY:</span> {property.heating}
                </div>
                
                <div>
                  <span className="font-semibold">DISTANCE FROM SUBJECT PROPERTY:</span> {property.distance}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Source Information */}
      <div className="mt-8 text-xs text-gray-600">
        <p className="font-semibold">SOURCE OF PROPERTIES:</p>
        <p>JLR.CA, FCIQ.CA REGISTRE FONCIER DU QUEBEC, SCHL.CA</p>
        </div>
      </div>
  );
};

export default SoldPropertiesPage;