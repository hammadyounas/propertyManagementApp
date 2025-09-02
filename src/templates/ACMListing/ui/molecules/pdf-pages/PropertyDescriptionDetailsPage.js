// components/pdf-pages/PropertyDescriptionDetailsPage.js
import React from 'react';

const PropertyDescriptionDetailsPage = ({ acmData }) => {
  // Sample detailed property data
  const propertyDetails = {
    recentCapitalExpenditures: {
      rooftop: '(2014)',
      furnaceAndHotWaterTank: '2017'
    },
    systems: {
      heatingSystem: 'CENTRAL FURNACE, GAS',
      hotWaterSystem: 'CENTRAL TANK, GAS',
      electricalPanels: 'BREAKERS',
      plumbing: 'COPPER AND PLASTIC'
    },
    conditions: {
      kitchens: '5 RENOVATED',
      flooring: 'HARDWOOD',
      bathrooms: '5 RENOVATED',
      roof: 'GOOD CONDITION',
      balconies: 'GOOD CONDITION',
      windows: 'GOOD CONDITION',
      doors: 'GOOD CONDITION'
    },
    features: {
      environmentalStudy: 'YES, PHASE 1 IN 2017',
      parkingSurface: 'ASPHALT',
      siding: 'BRICKS',
      intercomSystem: 'YES',
      exterior: 'STEEL',
      fireAlarmSystem: 'YES',
      janitorAgreement: 'NO'
    }
  };

  return (
    <div className="w-full bg-gray-200 min-h-screen p-8 flex flex-col" style={{ height: '1120px', width: '794px' }}>
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

      {/* Property Description Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wider">
          P R O P E R T Y &nbsp;&nbsp; D E S C R I P T I O N
        </h2>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-12">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Recent Capital Expenditures */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">RECENT CAPITAL EXPENDITURES</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">ROOFTOP</span>
                <span className="text-gray-800 font-medium">{propertyDetails.recentCapitalExpenditures.rooftop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">FURNACE AND HOT WATER TANK</span>
                <span className="text-gray-800 font-medium">{propertyDetails.recentCapitalExpenditures.furnaceAndHotWaterTank}</span>
              </div>
            </div>
          </div>

          {/* Systems */}
          <div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">HEATING SYSTEM</span>
                <span className="text-gray-800">{propertyDetails.systems.heatingSystem}</span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">HOT WATER SYSTEM</span>
                <span className="text-gray-800">{propertyDetails.systems.hotWaterSystem}</span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">ELECTRICAL PANELS</span>
                <span className="text-gray-800">{propertyDetails.systems.electricalPanels}</span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">PLUMBING</span>
                <span className="text-gray-800">{propertyDetails.systems.plumbing}</span>
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">CONDITION OF THE KITCHENS</span>
                <span className="text-gray-800">{propertyDetails.conditions.kitchens}</span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">CONDITION OF FLOORING</span>
                <span className="text-gray-800">{propertyDetails.conditions.flooring}</span>
              </div>
              
              <div className="flex justify-between border-b pb-2">
                <span className="font-semibold text-gray-700">CONDITION OF THE BATHROOMS</span>
                <span className="text-gray-800">{propertyDetails.conditions.bathrooms}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">ENVIRONMENTAL STUDY</span>
              <span className="text-gray-800">{propertyDetails.features.environmentalStudy}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">CONDITION OF ROOF</span>
              <span className="text-gray-800">{propertyDetails.conditions.roof}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">CONDITION OF BALCONIES</span>
              <span className="text-gray-800">{propertyDetails.conditions.balconies}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">PARKING SURFACE</span>
              <span className="text-gray-800">{propertyDetails.features.parkingSurface}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">SIDING</span>
              <span className="text-gray-800">{propertyDetails.features.siding}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">CONDITION OF DOORS</span>
              <span className="text-gray-800">{propertyDetails.conditions.doors}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">INTERCOM SYSTEM</span>
              <span className="text-gray-800">{propertyDetails.features.intercomSystem}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">EXTERIOR</span>
              <span className="text-gray-800">{propertyDetails.features.exterior}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">CONDITION OF WINDOWS</span>
              <span className="text-gray-800">{propertyDetails.conditions.windows}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">FIRE ALARM SYSTEM</span>
              <span className="text-gray-800">{propertyDetails.features.fireAlarmSystem}</span>
            </div>
            
            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-700">JANITOR AGREEMENT</span>
              <span className="text-gray-800">{propertyDetails.features.janitorAgreement}</span>
            </div>
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

export default PropertyDescriptionDetailsPage;