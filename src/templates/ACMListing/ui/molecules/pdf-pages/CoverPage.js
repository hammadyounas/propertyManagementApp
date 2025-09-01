// components/pdf-pages/CoverPage.js
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
    <div className="w-full h-screen bg-white p-8 flex flex-col" style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {acmData.base_property.address?.toUpperCase() || '8105 NOTRE-DAME E, MERCIER (MONTREAL)'} | {acmData.base_property.no_of_units || 18} UNITS
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Column */}
        <div className="w-1/2 pr-8">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-2">PREPARED FOR</h2>
            <p className="text-xl font-bold text-gray-800">ABC CLIENT 01</p>
            <p className="text-lg text-gray-600 mt-2">{formatDate(new Date())}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-700 mb-2">PREPARED BY</h2>
            <p className="text-xl font-bold text-gray-800">YELENA KRUTOUS</p>
            <p className="text-sm text-gray-600">( AGENCY EXECUTIVE OFFICER )</p>
            <p className="text-sm text-gray-600 mt-2">+1 514-929-SELL (7355)</p>
            <p className="text-sm text-gray-600">Ykrutous@Hotmail.Com</p>
          </div>

          <div className="bg-blue-600 text-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2">COMPARATIVE</h1>
            <h1 className="text-3xl font-bold mb-2">MARKET</h1>
            <h1 className="text-3xl font-bold">ANALYSIS</h1>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/2 pl-8">
          {/* Contact Info Box */}
          <div className="bg-gray-100 p-6 rounded-lg mb-8">
            <p className="text-lg font-bold text-gray-800">+1 514-929-7355</p>
            <p className="text-sm text-gray-600">Info@Buzzrealties.Ca</p>
            <p className="text-sm text-gray-600">www.Buzzrealties.ca</p>
            <p className="text-sm text-gray-600 mt-2">
              8500 boul Décarie, 3rd floor,<br />
              Montreal H4P 2N2
            </p>
          </div>

          {/* Property Image Placeholder */}
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-500 text-lg">Property Image</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-300">
        <div className="text-center text-sm text-gray-600">
          <p className="font-semibold">Contact Information</p>
          <p>+1 514-929-7355 | Info@Buzzrealties.Ca | www.Buzzrealties.ca</p>
          <p>8500 boul Décarie, 3rd floor, Montreal H4P 2N2</p>
        </div>
      </div>
    </div>
  );
};

export default CoverPage;