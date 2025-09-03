// FinancialAnalysisPage.jsx
import React from 'react';
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';
import {getFinancialData,  REVENUE_CONFIG, EXPENSES_CONFIG } from '../../../functionality/pdfDataConstant';

const FinancialAnalysisPage = ({ acmData }) => {
  // ✅ Get structured financial data
  const financialData = getFinancialData(acmData);

  // ✅ Helper Functions
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  const formatPercentage = (value) => `${(Number(value) || 0).toFixed(2)}%`;

  // ✅ Calculate totals from mapped data
  const totalRevenue = REVENUE_CONFIG.reduce(
    (sum, key) => sum + (financialData.revenue[key]?.yearly || 0),
    0
  );

    // ✅ Calculate totals from mapped data
    const totalRevenuePerUnit = REVENUE_CONFIG.reduce(
      (sum, key) => sum + (financialData.revenue[key]?.rpu || 0),
      0
    );

  const totalExpenses = EXPENSES_CONFIG.reduce(
    (sum, key) => sum + (financialData.expenses[key]?.assessment || 0),
    0
  );

  const totalExpensesPerUnit = EXPENSES_CONFIG.reduce(
    (sum, key) => sum + (financialData.expenses[key]?.cpu || 0),
    0
  );

  const netIncome = totalRevenue - totalExpenses;

  const netIncomePerUnit = totalRevenuePerUnit - totalExpensesPerUnit;

  // ✅ Reusable Table Row Component
  const TableRow = ({ item, isTotal = false, colorClass = 'text-gray-600', bgClass = '' }) => (
    <div className={`grid grid-cols-4 gap-4 p-1 text-sm uppercase ${bgClass} ${isTotal ? 'font-bold' : ''}`}>
      <div className={`${isTotal ? 'font-bold' : 'text-gray-800 font-semibold'}`}>
        {item.title}
      </div>
      <div className={`text-center ${isTotal ? 'font-bold' : 'font-semibold'} ${colorClass}`}>
        {formatCurrency(item.yearly || item.assessment || item.amount)}
      </div>
      <div className="text-center text-gray-600">
        {!isTotal ? formatPercentage(item.percentage) : ''}
      </div>
      <div className="text-center text-gray-600">
        {!isTotal ? formatCurrency(item.rpu || item.cpu) : ''}
      </div>
    </div>
  );

  // ✅ Table Header Component
  const TableHeader = ({second, third, fourth}) => (
    <div className="grid grid-cols-4 gap-4 p-1 bg-gray-100 font-bold text-sm uppercase tracking-wide border-b border-primary-default">
      <div></div>
      <div className="text-center">{second}</div>
      <div className="text-center">{third}</div>
      <div className="text-center">{fourth}</div>
    </div>
  );

    // ✅ Table Header Component
    const TableFooter = ({first, second, fourth}) => (
      <div className="grid grid-cols-4 gap-4 p-1 bg-gray-100 font-bold text-sm uppercase tracking-wide border-y border-primary-default">
        <div>{first}</div>
        <div className="text-center flex items-center justify-center">{second}</div>
        <div className="text-center flex items-center justify-center"></div>
        <div className="text-center flex items-center justify-center">{fourth}</div>
      </div>
    );

  return (
    <div  className="w-full bg-gray-100 min-h-screen p-8 flex flex-col overflow-hidden"
    style={{ height: '1120px', width: '794px' }}>
      {/* ✅ Header */}
      <PdfHeader title="FINANCIAL ANALYSIS" />

      {/* ✅ Revenue Section */}
      <div className="mt-3">
        <h2 className="text-xl font-bold">REVENUE</h2>
        <div className="border border-gray-200 rounded-lg mt-2">
          <TableHeader second="YEARLY" third="% GR" fourth="RPU(M)" />
          <div className="divide-y divide-gray-200">
            {REVENUE_CONFIG.map((key) => {
              const item = financialData.revenue[key];
              return (
                <TableRow
                  key={key}
                  item={item}
                  colorClass=""
                />
              );
            })}
            {/* ✅ Revenue Total */}
          <TableFooter first="Total Gross Income" second={formatCurrency(totalRevenue)} fourth={formatCurrency(totalRevenuePerUnit)} />
          </div>
        </div>
      </div>

      {/* ✅ Expenses Section */}
      <div className="mt-3">
        <h2 className="text-xl font-bold">EXPENSES</h2>
        <div className="border border-gray-200 rounded-lg mt-2">
          <TableHeader second="ASSESSMENT" third="% ON GR" fourth="YEARLY CPU" />
          <div className="divide-y divide-gray-200">
            {EXPENSES_CONFIG.map((key) => {
              const item = financialData.expenses[key];
              return (
                <TableRow
                  key={key}
                  item={item}
                  colorClass=""
                />
              );
            })}
            {/* ✅ Expenses Total */}
            <TableFooter first="Total Expenses" second={formatCurrency(totalExpenses)} fourth={formatCurrency(totalExpensesPerUnit)} />
            
            <div className='mt-3'>
            <TableFooter first="Net Income" second={formatCurrency(netIncome)} fourth={formatCurrency(netIncomePerUnit)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialAnalysisPage;