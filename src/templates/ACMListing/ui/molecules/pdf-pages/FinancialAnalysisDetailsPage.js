import React from 'react';
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';
import { CASH_FLOW_CONFIG, FINANCING_CONFIG, getFinancingData, ROI_ANALYSIS_CONFIG } from '../../../functionality/pdfDataConstant';
import { formatCurrency, formatPercentage } from '../../../../../libs/utils/pdfFormats';

const FinancialAnalysisDetailsPage = ({ acmData }) => {

  const financialData = getFinancingData(acmData);

  const formatDisplayValue = (value, format) => {
    switch (format) {
      case 'currency':
        return formatCurrency(value);
      case 'percent':
        return formatPercentage(value);
      case 'number':
      default:
        return value.toLocaleString();
    }
  };

  const TableRow = ({ item, isTotal = false, colorClass = 'text-gray-600', bgClass = '' }) => (
    <div className={`grid grid-cols-3 gap-4 p-1 text-xs uppercase ${bgClass} ${isTotal ? 'font-bold' : 'font-semibold'}`}>
      <div className={`${isTotal ? 'font-bold' : 'text-gray-800 font-semibold whitespace-nowrap'}`}>
        {item.title || item.suggested_market_price}
      </div>
      <div className="text-center text-gray-600">
        {formatDisplayValue(item.cmhc_loan_option, item.format)}
      </div>
      <div className="text-center text-gray-600">
        {formatDisplayValue(item.current_mortgage, item.format)}
      </div>
    </div>
  );

  // ✅ Table Header Component
  const TableHeader = ({ first = '', second, third }) => (
    <div className="grid grid-cols-3 gap-4 p-1 bg-gray-100 font-bold text-sm uppercase tracking-wide border-b border-primary-default pb-2">
      <div>{first}</div>
      <div className="text-center">{second}</div>
      <div className="text-center">{third}</div>
    </div>
  );

  // ✅ Table Footer Component
  const TableFooter = ({ first, second, fourth }) => (
    <div className="grid grid-cols-4 gap-4 p-1 bg-gray-100 font-bold text-sm uppercase tracking-wide border-y border-primary-default">
      <div>{first}</div>
      <div className="text-center flex items-center justify-center">{second}</div>
      <div className="text-center flex items-center justify-center"></div>
      <div className="text-center flex items-center justify-center">{fourth}</div>
    </div>
  );

  return (
    <div className="w-full bg-gray-100 min-h-screen p-8 flex flex-col overflow-hidden"
      style={{ height: '1120px', width: '794px' }}>
      <PdfHeader title="FINANCIAL ANALYSIS" acmData={acmData} />

      {/* ✅ Financing Section */}
      <div className="mt-3">
        <h2 className="text-xl font-bold border-b border-primary-default pb-2">FINANCING </h2>
        <div className="border border-gray-200 rounded-lg mt-2">
          <TableHeader second="CMHC LOAN OPTION" third="CURRENT MORTGAGE" />
          <div className="divide-y divide-gray-200">
            {FINANCING_CONFIG?.map((key) => {
              const item = financialData.financing[key];
              return (
                <TableRow
                  key={key}
                  item={item}
                  colorClass=""
                />
              );
            })}
          </div>
        </div>
      </div>


      {/* ✅ Cash Flow Section */}
      <div className="mt-3">
        <h2 className="text-xl font-bold border-b border-primary-default pb-2">CASH FLOW </h2>
        <div className="border border-gray-200 rounded-lg mt-2">
          {/* <TableHeader second="NET INCOME" third="ANNUAL MORTGAGE COST" /> */}
          <div className="divide-y divide-gray-200">
            {CASH_FLOW_CONFIG?.map((key) => {
              const item = financialData.cash_flow[key];
              return (
                <TableRow
                  key={key}
                  item={item}
                  colorClass=""
                />
              );
            })}
          </div>
        </div>
      </div>


      {/* ✅ ROI Analysis Section */}
      <div className="mt-3">
        <h2 className="text-xl font-bold border-b border-primary-default flex pb-2">ROI ANALYSIS </h2>
        <div className="border border-gray-200 rounded-lg mt-2">
          {/* <TableHeader second="NET INCOME" third="ANNUAL MORTGAGE COST" /> */}
          <div className="divide-y divide-gray-200">
            {ROI_ANALYSIS_CONFIG?.map((key) => {
              const item = financialData.roi_analysis[key];
              return (
                <TableRow
                  key={key}
                  item={item}
                  colorClass=""
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* suggested market price */}
      <div className="mt-3">
        <div className="border border-gray-200 rounded-lg mt-2">
          <TableHeader first='SUGGESTED MARKET PRICE' second="Price Per Unit" third="Gross Income Multiplier" />
          <div className="divide-y divide-gray-200">
            <div className={`grid grid-cols-3 gap-4 p-1 text-sm uppercase font-semibold`}>
              <div className={`text-gray-800 font-semibold whitespace-nowrap`}>
                {formatDisplayValue(acmData?.base_property?.financial_analysis?.suggested_market_price, 'currency') || 0}
              </div>
              <div className="text-center text-gray-600">
                {formatDisplayValue(acmData?.base_property?.financial_analysis?.price_per_unit, 'currency') || 0}
              </div>
              <div className="text-center text-gray-600">
                {acmData?.base_property?.financial_analysis?.gross_income_multiplier || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysisDetailsPage;