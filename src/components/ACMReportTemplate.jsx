import React from 'react';
import CoverPage from '../templates/ACMListing/ui/molecules/pdf-pages/CoverPage';
import PropertyLocationPage from '../templates/ACMListing/ui/molecules/pdf-pages/PropertyLocationPage';
import PropertyDescriptionPage from '../templates/ACMListing/ui/molecules/pdf-pages/PropertyDescriptionPage';
import PropertyDescriptionDetailsPage from '../templates/ACMListing/ui/molecules/pdf-pages/PropertyDescriptionDetailsPage';
import FinancialAnalysisPage from '../templates/ACMListing/ui/molecules/pdf-pages/FinancialAnalysisPage';
import FinancialAnalysisDetailsPage from '../templates/ACMListing/ui/molecules/pdf-pages/FinancialAnalysisDetailsPage';
import SoldPropertiesPage from '../templates/ACMListing/ui/molecules/pdf-pages/SoldPropertiesPage';

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
      <div className="page-container page-8 page-break-before">
        <div className="page-content">
          <div className="page-header">
            <h1 className="page-title">Summary & Recommendations</h1>
            <div className="page-number">Page 8</div>
          </div>
          
          <div className="recommendations-content">
            <div className="recommendations-section">
              <h3 className="section-title">Final Recommendations</h3>
              <div className="recommendations-grid">
                <div className="recommendation-item">
                  <div className="recommendation-number">1</div>
                  <div className="recommendation-content">
                    <h4 className="recommendation-title">Market Analysis Complete</h4>
                    <p className="recommendation-text">
                      Based on the comprehensive analysis of {acmData.compare_property?.length || 0} comparable properties, 
                      the market analysis provides valuable insights for investment decision-making.
                    </p>
                  </div>
                </div>
                
                <div className="recommendation-item">
                  <div className="recommendation-number">2</div>
                  <div className="recommendation-content">
                    <h4 className="recommendation-title">Property Valuation</h4>
                    <p className="recommendation-text">
                      The financial analysis indicates strong market positioning with favorable investment potential 
                      based on comparable property data and market trends.
                    </p>
                  </div>
                </div>
                
                <div className="recommendation-item">
                  <div className="recommendation-number">3</div>
                  <div className="recommendation-content">
                    <h4 className="recommendation-title">Next Steps</h4>
                    <p className="recommendation-text">
                      Consider conducting additional due diligence and professional consultation to finalize 
                      investment decisions based on this comprehensive market analysis.
                    </p>
                  </div>
                </div>
                
                <div className="recommendation-item">
                  <div className="recommendation-number">4</div>
                  <div className="recommendation-content">
                    <h4 className="recommendation-title">Contact Information</h4>
                    <p className="recommendation-text">
                      For questions about this report, please contact our team at +1 514-929-7355 or 
                      info@buzzrealties.ca for further assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-section">
              <h3 className="section-title">Report Information</h3>
              <div className="contact-card">
                <div className="contact-info">
                  <p className="contact-text">This ACM report provides a comprehensive market analysis for informed decision-making.</p>
                  <p className="contact-system">Generated by Property Management System</p>
                </div>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-label">Report ID:</span>
                    <span className="contact-value">ACM-{acmData._id || "NEW"}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Generated:</span>
                    <span className="contact-value">{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="contact-item">
                    <span className="contact-label">Properties:</span>
                    <span className="contact-value">{acmData.compare_property?.length || 0} compared</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-footer">
              <p className="footer-text">Report generated on {new Date().toLocaleString()}</p>
              <p className="footer-disclaimer">
                This ACM report provides a foundation for informed decision-making but should be supplemented with 
                additional market research and professional analysis as needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACMReportTemplate;