// components/pdf-pages/FinancialAnalysisDetailsPage.js
import React from 'react';

const FinancialAnalysisDetailsPage = ({ acmData }) => {
  // Sample financing data
  const financingData = {
    financing: {
      cmhcLoanOption: {
        capRate: '5.2%',
        loanAmount: 1860000,
        loanToValue: '71%',
        downPayment: 740000,
        rate: '2.62%',
        amortization: 30,
        term: 5,
        institution: 'PEOPLE TRUST',
        debtCoverageRatio: 1.43
      },
      currentMortgage: {
        capRate: '8%',
        loanAmount: 1293235,
        loanToValue: '50%',
        downPayment: 1306765,
        rate: '1.80%',
        amortization: 30,
        term: 2022,
        assumptionOption: 'YES',
        debtCoverageRatio: 25
      }
    },
    cashFlow: {
      netIncome: 114279,
      annualMortgageCost: 64332,
      netCashAfterMortgage: 49947,
      annualMortgageCostAlt: 84021,
      netCashAfterMortgageAlt: 30258
    },
    returnOnInvestment: {
      cashOnCashReturn: '4.0%',
      cashPlusPrincipal: '4.1%',
      irrWith2PercentAppreciation: '7.97%',
      cashOnCashReturnAlt: '3.8%',
      irrWith2PercentAppreciationAlt: '17.80%',
      cashPlusPrincipalAlt: '10.8%'
    },
    marketAnalysis: {
      ppu: 144000,
      gim: 14.0,
      suggestedMarketPrice: 2700000
    }
  };

  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()}$`;
  };

  return (
    <div className="w-full bg-green-200 min-h-screen border-2 border-black p-8 flex flex-col" style={{ minHeight: '1023px', width: '794px' }}>
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

      {/* Financing Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">FINANCING</h3>
        
        <div className="grid grid-cols-3 gap-8">
          {/* Headers */}
          <div className="font-bold text-center">CMHC LOAN OPTION</div>
          <div className="font-bold text-center">CURRENT MORTGAGE</div>
          <div className="font-bold text-center">ASSUMPTION OPTION</div>
          
          {/* Institution */}
          <div className="text-center">INSTITUTION</div>
          <div className="text-center font-semibold">{financingData.financing.currentMortgage.institution}</div>
          <div className="text-center">-</div>
          
          {/* Rate */}
          <div className="text-center">RATE</div>
          <div className="text-center">{financingData.financing.cmhcLoanOption.rate}</div>
          <div className="text-center">{financingData.financing.currentMortgage.rate}</div>
          
          {/* Amortization */}
          <div className="text-center">AMORTIZATION</div>
          <div className="text-center">{financingData.financing.cmhcLoanOption.amortization}</div>
          <div className="text-center">{financingData.financing.currentMortgage.amortization}</div>
          
          {/* Term */}
          <div className="text-center">TERM</div>
          <div className="text-center">{financingData.financing.cmhcLoanOption.term}</div>
          <div className="text-center">{financingData.financing.currentMortgage.term}</div>
          
          {/* Cap Rate */}
          <div className="text-center">CAP RATE</div>
          <div className="text-center">{financingData.financing.cmhcLoanOption.capRate}</div>
          <div className="text-center">{financingData.financing.currentMortgage.capRate}</div>
          
          {/* Loan Amount */}
          <div className="text-center">LOAN AMOUNT</div>
          <div className="text-center">{formatCurrency(financingData.financing.cmhcLoanOption.loanAmount)}</div>
          <div className="text-center">{formatCurrency(financingData.financing.currentMortgage.loanAmount)}</div>
          
          {/* Loan to Value % */}
          <div className="text-center">LOAN TO VALUE %</div>
          <div className="text-center">{financingData.financing.cmhcLoanOption.loanToValue}</div>
          <div className="text-center">{financingData.financing.currentMortgage.loanToValue}</div>
          
          {/* Down Payment */}
          <div className="text-center">DOWN PAYMENT</div>
          <div className="text-center">{formatCurrency(financingData.financing.cmhcLoanOption.downPayment)}</div>
          <div className="text-center">{formatCurrency(financingData.financing.currentMortgage.downPayment)}</div>
          
          {/* Debt Coverage Ratio */}
          <div className="text-center">DEBT COVERAGE RATIO</div>
          <div className="text-center">{financingData.financing.cmhcLoanOption.debtCoverageRatio}</div>
          <div className="text-center">{financingData.financing.currentMortgage.debtCoverageRatio}</div>
        </div>
      </div>

      {/* Cash Flow Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">CASH FLOW</h3>
        
        <div className="grid grid-cols-3 gap-8">
          <div></div>
          <div className="font-bold text-center">OPTION 1</div>
          <div className="font-bold text-center">OPTION 2</div>
          
          <div>NET INCOME</div>
          <div className="text-center">{formatCurrency(financingData.cashFlow.netIncome)}</div>
          <div className="text-center">{formatCurrency(financingData.cashFlow.netIncome)}</div>
          
          <div>ANNUAL MORTGAGE COST</div>
          <div className="text-center">{formatCurrency(financingData.cashFlow.annualMortgageCost)}</div>
          <div className="text-center">{formatCurrency(financingData.cashFlow.annualMortgageCostAlt)}</div>
          
          <div className="font-bold">NET CASH AFTER MORTGAGE</div>
          <div className="text-center font-bold">{formatCurrency(financingData.cashFlow.netCashAfterMortgage)}</div>
          <div className="text-center font-bold">{formatCurrency(financingData.cashFlow.netCashAfterMortgageAlt)}</div>
        </div>
      </div>

      {/* Return on Investment Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">RETURN ON INVESTMENT</h3>
        
        <div className="grid grid-cols-3 gap-8">
          <div></div>
          <div className="font-bold text-center">OPTION 1</div>
          <div className="font-bold text-center">OPTION 2</div>
          
          <div>CASH ON CASH RETURN</div>
          <div className="text-center">{financingData.returnOnInvestment.cashOnCashReturn}</div>
          <div className="text-center">{financingData.returnOnInvestment.cashOnCashReturnAlt}</div>
          
          <div>CASH + PRINCIPAL</div>
          <div className="text-center">{financingData.returnOnInvestment.cashPlusPrincipal}</div>
          <div className="text-center">{financingData.returnOnInvestment.cashPlusPrincipalAlt}</div>
          
          <div>IRR WITH 2% MARKET APPRECIATION</div>
          <div className="text-center">{financingData.returnOnInvestment.irrWith2PercentAppreciation}</div>
          <div className="text-center">{financingData.returnOnInvestment.irrWith2PercentAppreciationAlt}</div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="mb-8">
        <div className="grid grid-cols-3 gap-8 bg-blue-100 p-4 rounded">
          <div className="text-center">
            <div className="font-bold">PPU</div>
            <div className="text-lg">{formatCurrency(financingData.marketAnalysis.ppu)}</div>
          </div>
          <div className="text-center">
            <div className="font-bold">GIM</div>
            <div className="text-lg">{financingData.marketAnalysis.gim}</div>
          </div>
          <div className="text-center">
            <div className="font-bold">SUGGESTED MARKET PRICE</div>
            <div className="text-lg font-bold text-blue-800">{formatCurrency(financingData.marketAnalysis.suggestedMarketPrice)}</div>
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

export default FinancialAnalysisDetailsPage;