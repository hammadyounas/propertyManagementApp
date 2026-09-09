import React, { useState, useEffect } from 'react';
import ACMReportTemplate from './ACMReportTemplate';

const PDFPreview = ({ acmData, isOpen, onClose }) => {
  const [scale, setScale] = useState(0.8); // Default scale for preview


  // Mock data for preview if no real data provided
  const mockData = {
    _id: "preview-123",
    base_property: {
      title: "Downtown Business Plaza",
      property_type: "Commercial Office",
      address: "123 Business District, Downtown, City 12345",
      description: "A premium commercial office building located in the heart of the business district. Features modern amenities, excellent accessibility, and prime location with high foot traffic.",
      no_of_units: 45,
      rooftop_year: "2020",
      furnace_hot_water_tank_year: "2021",
      images: [
        "/assets/images/all-img/property.jpeg",
        "/assets/images/all-img/post-2.png"
      ],
      property_status: "Active"
    },
    compare_property: [
      {
        title: "Central Office Complex",
        property_type: "Commercial Office",
        address: "456 Corporate Avenue, Downtown, City 12345",
        description: "Modern office complex with state-of-the-art facilities, conference rooms, and premium amenities.",
        no_of_units: 60,
        property_status: "Active",
        images: [
          "/assets/images/all-img/property.jpeg",
          "/assets/images/all-img/post-2.png"
        ],
      },
      {
        title: "Executive Business Center",
        property_type: "Commercial Office",
        address: "789 Executive Boulevard, Downtown, City 12345",
        description: "Premium business center with luxury finishes, executive suites, and top-tier amenities.",
        no_of_units: 35,
        property_status: "Active",
        images: [
          "/assets/images/all-img/property.jpeg",
          "/assets/images/all-img/post-2.png"
        ],
      },
      {
        title: "Innovation Hub Plaza",
        property_type: "Commercial Office",
        address: "321 Innovation Street, Downtown, City 12345",
        description: "Contemporary office space designed for tech companies and startups with flexible layouts.",
        no_of_units: 25,
        property_status: "Active",
        images: [
          "/assets/images/all-img/property.jpeg",
          "/assets/images/all-img/post-2.png"
        ],
      }
    ],
    created_by: {
      name: "John Smith"
    },
    createdAt: new Date(),
    updated_at: new Date(),
    isDeleted: false
  };

  // Use provided data or fallback to mock data
  const previewData = acmData && acmData.base_property && acmData.base_property.title ? acmData : mockData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[95vw] h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">PDF Preview - ACM Report</h2>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Scale:</label>
              <select 
                value={scale} 
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value={0.3}>30%</option>
                <option value={0.4}>40%</option>
                <option value={0.5}>50%</option>
                <option value={0.6}>60%</option>
                <option value={0.7}>70%</option>
                <option value={0.8}>80%</option>
                <option value={0.9}>90%</option>
                <option value={1.0}>100%</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-10">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Print Preview
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
            >
              Close
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-auto p-4 bg-gray-100">
          <div 
            className="mx-auto bg-white shadow-2xl border border-gray-300"
            style={{
              width: '210mm', // A4 width
              minHeight: '297mm', // A4 height
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              marginBottom: `${297 * (1 - scale)}mm` // Add space for scaled content
            }}
          >
            <ACMReportTemplate acmData={previewData} />
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              <strong>Preview Mode:</strong> This shows how your PDF will look when generated.
              {(!acmData || !acmData.base_property || !acmData.base_property.title) && (
                <span className="text-orange-600 ml-2">(Using sample data for preview)</span>
              )}
            </div>
            <div>
              <strong>Page Size:</strong> A4 (210mm × 297mm) | <strong>Scale:</strong> {Math.round(scale * 100)}% | 
              <strong>Pages:</strong> 8
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFPreview;
