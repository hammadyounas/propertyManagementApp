// components/pdf-pages/PropertyDescriptionPage.js
import React from 'react';

const PropertyDescriptionPage = ({ acmData }) => {
  // Sample property data - you can modify this based on your actual data structure
  const propertyInfo = {
    cadastralNumber: '2 241 929',
    numberOfUnits: acmData.base_property.no_of_units || 18,
    yearBuilt: '1929',
    responsabilityOfAppliances: 'YES',
    responsabilityOfHeating: 'YES',
    constructionType: 'BRICK',
    laundry: 'YES',
    landArea: '8173 M2',
    numberOfParkings: '180 SQ',
    buildingType: 'APARTMENT',
    washerDryerInstallation: 'YES',
    responsibleOfHotHeating: 'YES',
    buildingStories: '2',
    municipalAssessmentLand: '1 400 000$',
    municipalAssessmentTotal: '2 700 000$'
  };

  return (
    <div className="w-full bg-blue-200 min-h-screen p-8 flex flex-col" style={{ minHeight: '1023px', width: '794px' }}>
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
            <span className="text-lg">{propertyInfo.numberOfUnits}</span>
          </div>
        </div>
      </div>

      {/* Property Description Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wider">
          P R O P E R T Y &nbsp;&nbsp; D E S C R I P T I O N
        </h2>
      </div>

      {/* Property Information Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
        <div className="space-y-6">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">CADASTRAL NUMBER</span>
            <span className="text-gray-800">{propertyInfo.cadastralNumber}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">NUMBER OF UNITS</span>
            <span className="text-gray-800">{propertyInfo.numberOfUnits}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">YEAR BUILT</span>
            <span className="text-gray-800">{propertyInfo.yearBuilt}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">RESPONSIBILITY OF APPLIANCES</span>
            <span className="text-gray-800">{propertyInfo.responsabilityOfAppliances}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">RESPONSIBILITY OF HEATING</span>
            <span className="text-gray-800">{propertyInfo.responsabilityOfHeating}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">CONSTRUCTION TYPE</span>
            <span className="text-gray-800">{propertyInfo.constructionType}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">LAUNDRY</span>
            <span className="text-gray-800">{propertyInfo.laundry}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">LAND AREA</span>
            <span className="text-gray-800">{propertyInfo.landArea}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">NUMBER OF PARKINGS</span>
            <span className="text-gray-800">{propertyInfo.numberOfParkings}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">BUILDING TYPE</span>
            <span className="text-gray-800">{propertyInfo.buildingType}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">WASHER/DRYER INSTALLATION</span>
            <span className="text-gray-800">{propertyInfo.washerDryerInstallation}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">RESPONSIBLE OF HOT HEATING</span>
            <span className="text-gray-800">{propertyInfo.responsibleOfHotHeating}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">BUILDING STORIES</span>
            <span className="text-gray-800">{propertyInfo.buildingStories}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">MUNICIPAL ASSESSMENT - LAND</span>
            <span className="text-gray-800">{propertyInfo.municipalAssessmentLand}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">MUNICIPAL ASSESSMENT - TOTAL</span>
            <span className="text-gray-800">{propertyInfo.municipalAssessmentTotal}</span>
          </div>
          
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold text-gray-700">OTHER INFORMATION</span>
            <span className="text-gray-800">NO</span>
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

export default PropertyDescriptionPage;