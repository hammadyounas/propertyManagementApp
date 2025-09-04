import React from 'react';
import CoverPage from '../templates/ACMListing/ui/molecules/pdf-pages/CoverPage';
import PropertyLocationPage from '../templates/ACMListing/ui/molecules/pdf-pages/PropertyLocationPage';
import PropertyDescriptionPage from '../templates/ACMListing/ui/molecules/pdf-pages/PropertyDescriptionPage';
import PropertyDescriptionDetailsPage from '../templates/ACMListing/ui/molecules/pdf-pages/PropertyDescriptionDetailsPage';
import FinancialAnalysisPage from '../templates/ACMListing/ui/molecules/pdf-pages/FinancialAnalysisPage';
import FinancialAnalysisDetailsPage from '../templates/ACMListing/ui/molecules/pdf-pages/FinancialAnalysisDetailsPage';
import SoldPropertiesPage from '../templates/ACMListing/ui/molecules/pdf-pages/SoldPropertiesPage';
import Summary from '../templates/ACMListing/ui/molecules/pdf-pages/Summary';

const ACMReportTemplate = ({ acmData }) => {
  return (
    <div id="acm-report" className="bg-white text-gray-900 font-sans" style={{ width: '100%', overflow: 'hidden' }}>
      {/* Page 1: Cover Page */}
      <div className="">
        <CoverPage acmData={acmData} />
      </div>

      {/* Page 2: Property Location */}
      <div className="page-container page-2 page-break-before">
        <PropertyLocationPage acmData={acmData} />
      </div>

      {/* Page 3: Property Description */}
      <div className="page-container page-3 page-break-before">
        <PropertyDescriptionPage acmData={acmData} />
      </div>

      {/* Page 4: Property Description Details */}
      <div className="page-container page-4 page-break-before">
        <PropertyDescriptionDetailsPage acmData={acmData} />
      </div>

      {/* Page 5: Financial Analysis */}
      <div className="page-container page-5 page-break-before">
        <FinancialAnalysisPage acmData={acmData} />
      </div>

      {/* Page 6: Financial Analysis Details */}
      <div className="page-container page-6 page-break-before">
        <FinancialAnalysisDetailsPage acmData={acmData} />
      </div>

      {/* Page 7: Sold Properties */}
      <div className="page-container page-7 page-break-before">
        <SoldPropertiesPage acmData={acmData} />
      </div>

      {/* Page 8: Summary/Recommendations (if needed) */}
      <div className="page-container page-7 page-break-before">
        <Summary acmData={acmData} />
      </div>
    </div>
  );
};

export default ACMReportTemplate;