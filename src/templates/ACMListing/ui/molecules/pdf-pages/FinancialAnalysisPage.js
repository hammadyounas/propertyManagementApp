// components/pdf-pages/FinancialAnalysisPage.js
import React from 'react';

const FinancialAnalysisPage = ({ acmData }) => {
  // Sample financial data - you can modify based on your data structure
  const financialData = {
    revenue: {
      residential: { amount: 173820, percentage: 93, grrpu: 805 },
      commercial: { amount: 0, percentage: 0, grrpu: 0 },
      parking: { amount: 5400, percentage: 3, grrpu: 25 },
      laundry: { amount: 5040, percentage: 3, grrpu: 25 },
      storage: { amount: 1800, percentage: 1, grrpu: 8 }
    },
    totalGrossIncome: { amount: 186060, grrpu: 861 },
    vacancy: { amount: 9303, percentage: 5, cpu: 517 },
    expenses: {
      administration: { amount: 11060, percentage: 6, cpu: 614 },
      municipalTaxes: { amount: 12446, percentage: 7, cpu: 691 },
      schoolTaxes: { amount: 2249, percentage: 1, cpu: 125 },
      insurance: { amount: 10029, percentage: 5, cpu: 557 },
      electricity: { amount: 784, percentage: 0, cpu: 44 },
      heating: { amount: 9303, percentage: 5, cpu: 517 },
      snowRemoval: { amount: 0, percentage: 0, cpu: 0 },
      elevator: { amount: 0, percentage: 0, cpu: 0 },
      equipmentRental: { amount: 4487, percentage: 2, cpu: 249 },
      maintenanceReserve: { amount: 9000, percentage: 5, cpu: 500 },
      wagesJanitor: { amount: 3120, percentage: 2, cpu: 173 },
      furnitureReserve: { amount: 0, percentage: 0, cpu: 0 }
    },
    totalExpenses: { amount: 71781, cpu: 3988 },
    netIncome: { amount: 114279, cpu: 6349, percentage: 39 }
  };

  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()}$`;
  };

  return (
    <div className="w-full bg-orange-200 min-h-screen p-8 flex flex-col" style={{ height: '1120px', width: '794px' }}>

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

      {/* Financial Analysis Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 tracking-wider">
          F I N A N C I A L &nbsp;&nbsp; A N A L Y S I S
        </h2>
      </div>

      {/* Revenue Section */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="font-bold text-gray-800 text-center">REVENUE</div>
          <div className="font-bold text-gray-800 text-center">YEARLY</div>
          <div className="font-bold text-gray-800 text-center">%GR</div>
          <div className="font-bold text-gray-800 text-center">RPU(M)</div>
        </div>
        
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-4 py-2 border-b">
            <div className="text-gray-700">RESIDENTIAL</div>
            <div className="text-center">{formatCurrency(financialData.revenue.residential.amount)}</div>
            <div className="text-center">{financialData.revenue.residential.percentage}%</div>
            <div className="text-center">{financialData.revenue.residential.grrpu}$</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b">
            <div className="text-gray-700">COMMERCIAL</div>
            <div className="text-center">-</div>
            <div className="text-center">-</div>
            <div className="text-center">-</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b">
            <div className="text-gray-700">PARKING</div>
            <div className="text-center">{formatCurrency(financialData.revenue.parking.amount)}</div>
            <div className="text-center">{financialData.revenue.parking.percentage}%</div>
            <div className="text-center">{financialData.revenue.parking.grrpu}$</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b">
            <div className="text-gray-700">LAUNDRY</div>
            <div className="text-center">{formatCurrency(financialData.revenue.laundry.amount)}</div>
            <div className="text-center">{financialData.revenue.laundry.percentage}%</div>
            <div className="text-center">{financialData.revenue.laundry.grrpu}$</div>
          </div>
          
          <div className="grid grid-cols-4 gap-4 py-2 border-b">
            <div className="text-gray-700">STORAGE</div>
            <div className="text-center">{formatCurrency(financialData.revenue.storage.amount)}</div>
            <div className="text-center">{financialData.revenue.storage.percentage}%</div>
            <div className="text-center">{financialData.revenue.storage.grrpu}$</div>
          </div>
        </div>

        {/* Total Gross Income */}
        <div className="grid grid-cols-4 gap-4 py-3 bg-gray-100 mt-4 font-bold">
          <div>TOTAL GROSS INCOME</div>
          <div className="text-center">{formatCurrency(financialData.totalGrossIncome.amount)}</div>
          <div className="text-center">-</div>
          <div className="text-center">{financialData.totalGrossIncome.grrpu}$</div>
        </div>

        {/* Vacancy */}
        <div className="grid grid-cols-4 gap-4 py-2 border-b">
          <div className="text-gray-700">VACANCY/BAD DEBT</div>
          <div className="text-center">{formatCurrency(financialData.vacancy.amount)}</div>
          <div className="text-center">{financialData.vacancy.percentage}%</div>
          <div className="text-center">{financialData.vacancy.cpu}$</div>
        </div>
      </div>

      {/* Expenses Section */}
      <div className="mb-8">
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="font-bold text-gray-800 text-center">EXPENSES</div>
          <div className="font-bold text-gray-800 text-center">YEARLY</div>
          <div className="font-bold text-gray-800 text-center">% ON GR</div>
          <div className="font-bold text-gray-800 text-center">CPU</div>
        </div>
        
        <div className="space-y-1 text-sm">
          {Object.entries(financialData.expenses).map(([key, expense]) => (
            <div key={key} className="grid grid-cols-4 gap-4 py-1">
              <div className="text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </div>
              <div className="text-center">{expense.amount > 0 ? formatCurrency(expense.amount) : '-'}</div>
              <div className="text-center">{expense.percentage > 0 ? `${expense.percentage}%` : '-'}</div>
              <div className="text-center">{expense.cpu > 0 ? `${expense.cpu}$` : '-'}</div>
            </div>
          ))}
        </div>

        {/* Total Expenses */}
        <div className="grid grid-cols-4 gap-4 py-3 bg-gray-100 mt-4 font-bold">
          <div>TOTAL EXPENSES</div>
          <div className="text-center">{formatCurrency(financialData.totalExpenses.amount)}</div>
          <div className="text-center">-</div>
          <div className="text-center">{financialData.totalExpenses.cpu}$</div>
        </div>

        {/* Net Income */}
        <div className="grid grid-cols-4 gap-4 py-3 bg-blue-100 mt-2 font-bold text-blue-800">
          <div>NET INCOME</div>
          <div className="text-center">{formatCurrency(financialData.netIncome.amount)}</div>
          <div className="text-center">{financialData.netIncome.percentage}%</div>
          <div className="text-center">{financialData.netIncome.cpu}$</div>
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

export default FinancialAnalysisPage;