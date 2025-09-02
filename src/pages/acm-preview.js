import React, { useState } from 'react';
import PDFPreview from '../components/PDFPreview';

const ACMPreviewPage = () => {
  const [showPreview, setShowPreview] = useState(true);

  // Sample data for testing
  const sampleACMData = {
    _id: "preview-sample-123",
    base_property: {
      title: "Downtown Business Plaza",
      property_type: "Commercial Office",
      address: "123 Business District, Downtown, City 12345",
      description: "A premium commercial office building located in the heart of the business district. Features modern amenities, excellent accessibility, and prime location with high foot traffic.",
      no_of_units: 45,
      property_status: "Active"
    },
    compare_property: [
      {
        title: "Central Office Complex",
        property_type: "Commercial Office",
        address: "456 Corporate Avenue, Downtown, City 12345",
        description: "Modern office complex with state-of-the-art facilities, conference rooms, and premium amenities.",
        no_of_units: 60,
        property_status: "Active"
      },
      {
        title: "Executive Business Center",
        property_type: "Commercial Office",
        address: "789 Executive Boulevard, Downtown, City 12345",
        description: "Premium business center with luxury finishes, executive suites, and top-tier amenities.",
        no_of_units: 35,
        property_status: "Active"
      },
      {
        title: "Innovation Hub Plaza",
        property_type: "Commercial Office",
        address: "321 Innovation Street, Downtown, City 12345",
        description: "Contemporary office space designed for tech companies and startups with flexible layouts.",
        no_of_units: 25,
        property_status: "Active"
      }
    ],
    created_by: {
      name: "John Smith - Senior Analyst"
    },
    createdAt: new Date(),
    updated_at: new Date(),
    isDeleted: false
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ACM Report Preview</h1>
              <p className="text-sm text-gray-600">Test and preview your PDF design in real-time</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Preview Controls</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Sample Data Used</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Base Property:</strong> {sampleACMData.base_property.title}</div>
                <div><strong>Compare Properties:</strong> {sampleACMData.compare_property.length} properties</div>
                <div><strong>Created By:</strong> {sampleACMData.created_by.name}</div>
                <div><strong>Report ID:</strong> {sampleACMData._id}</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Preview Features</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Real-time A4 page preview</li>
                <li>• Adjustable scale (30% - 100%)</li>
                <li>• Print preview functionality</li>
                <li>• 8-page report with unique designs</li>
                <li>• Responsive preview window</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-800 mb-2">How to Use</h4>
            <p className="text-sm text-blue-700">
              Click "Show Preview" to see how your ACM report will look when generated as a PDF. 
              You can adjust the scale to see different sizes, and use "Print Preview" to see how it will look when printed.
              This allows you to test your design changes without generating the actual PDF file.
            </p>
          </div>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && (
        <PDFPreview 
          acmData={sampleACMData}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default ACMPreviewPage;
