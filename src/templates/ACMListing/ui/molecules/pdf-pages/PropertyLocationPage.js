// components/pdf-pages/PropertyLocationPage.js
import React from 'react';

const PropertyLocationPage = ({ acmData }) => {
  return (
    <div className="w-full bg-yellow-200 min-h-screen p-8 flex flex-col" style={{ minHeight: '1023px', width: '794px' }}>
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

      {/* Main Content */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-700 mb-6">PROPERTY LOCATION ON THE MAP</h2>
        
        {/* Map Placeholder */}
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center mb-8">
          <div className="text-center">
            <div className="text-6xl text-gray-400 mb-4">🗺️</div>
            <span className="text-gray-500 text-lg">Interactive Map View</span>
            <p className="text-sm text-gray-400 mt-2">
              Property Location: {acmData.base_property.address}
            </p>
          </div>
        </div>
      </div>

      {/* Property Image */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-700 mb-6">PICTURE OF THE PROPERTY</h2>
        
        {/* Property Image Placeholder */}
        <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl text-gray-400 mb-4">🏢</div>
            <span className="text-gray-500 text-lg">Property Image</span>
            <p className="text-sm text-gray-400 mt-2">
              {acmData.base_property.no_of_units || 18} Units Building
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-8 left-8 right-8">
        <div className="text-center text-sm text-gray-600 border-t pt-4">
          <p className="font-semibold">+1 514-929-7355</p>
          <p>Info@Buzzrealties.Ca | www.Buzzrealties.ca</p>
          <p>8500 boul Décarie, 3rd floor, Montreal H4P 2N2</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyLocationPage;