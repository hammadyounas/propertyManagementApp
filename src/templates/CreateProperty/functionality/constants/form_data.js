
const propertyTypes = [
  { label: "Residential", value: "residential" },
  { label: "Commercial", value: "commercial" },
  { label: "Plot", value: "plot" },
  { label: "Apartment", value: "apartment" },
  { label: "House", value: "house" }
];

const propertyStatus = [
  { label: "Available", value: "available" },
  { label: "Under Contract", value: "under contract" },
  { label: "Leased", value: "leased" },
  { label: "Coming Soon", value: "coming soon" },
  { label: "Withdrawn", value: "withdrawn" },
  { label: "Sold", value: "sold" },
  { label: "Expired", value: "expired" }
];

const ownershipStatus = [
  { label: "Freehold", value: "freehold" },
  { label: "Leasehold", value: "leasehold" }
];

const contractTypes = [
  { label: "On Market", value: "on market" },
  { label: "Off Market", value: "off market" }
];

// responsible_of_hot_heating responsibility_of_appliances washer_dryer_installation laundry
const responsibleOfHotHeating = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const responsibilityOfAppliances = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const washerDryerInstallation = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const laundryOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

// All form sections with complete schema fields
export const formSections = [
  {
    title: "Basic Property Information",
    fields: [
      { name: "title", label: "Property Title", type: "text", required: true, placeholder: "Enter Property Title" },
      { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter Detailed Property Description" },
      { name: "property_type", label: "Property Type", type: "select", required: true, options: propertyTypes, placeholder: "Select Property Type" },
      { name: "property_status", label: "Property Status", type: "select", required: true, options: propertyStatus, placeholder: "Select Property Status" },
      { name: "ownership_status", label: "Ownership Status", type: "select", required: true, options: ownershipStatus, placeholder: "Select Ownership Status" },
      { name: "contract_type", label: "Contract Type", type: "select", required: false, options: contractTypes, placeholder: "Select Contract Type" }
    ],
    defaultExpanded: true
  },
  {
    title: "Location & Address",
    fields: [
      { name: "address", label: "Address", type: "text", required: true, placeholder: "Enter Complete Address" },
      { name: "street_number", label: "Street Number", type: "text", required: true, placeholder: "Enter Street Number" },
      { name: "street_name", label: "Street Name", type: "text", required: true, placeholder: "Enter Street Name" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "Enter City" },
      { name: "municipality", label: "Municipality", type: "text", required: true, placeholder: "Enter Municipality" },
      { name: "cadastral_number", label: "Cadastral Number", type: "text", required: true, placeholder: "Enter Cadastral Number" },
      { name: "location_map_url", label: "Location Map URL", type: "textarea", required: false, placeholder: "Paste Google Maps Iframe Embed Code" }
    ],
    defaultExpanded: true
  },
  {
    title: "Building Specifications",
    fields: [
      { name: "no_of_units", label: "Number of Units", type: "text", required: true, placeholder: "Enter Number of Units" },
      { name: "unit_size", label: "Unit Size", type: "text", required: true, placeholder: "Enter Unit Size" },
      { name: "year_built", label: "Year Built", type: "text", required: false, placeholder: "Enter Year Built" },
      { name: "building_type", label: "Building Type", type: "text", required: false, placeholder: "Enter Building Type" },
      { name: "construction_type", label: "Construction Type", type: "text", required: false, placeholder: "Enter Construction Type" },
      { name: "building_stories", label: "Building Stories", type: "text", required: false, placeholder: "Enter Number of Stories" },
      { name: "land_area", label: "Land Area", type: "text", required: false, placeholder: "Enter Land Area" }
    ],
    defaultExpanded: false
  },
  {
    title: "Parking & Garages",
    fields: [
      { name: "no_of_garages", label: "Number of Garages", type: "text", required: false, placeholder: "Enter Number of Garages" },
      { name: "no_of_parking_places", label: "Number of Parking Places", type: "text", required: false, placeholder: "Enter Number of Parking Places" },
      { name: "parking_surface", label: "Parking Surface", type: "text", required: false, placeholder: "Enter Parking Surface Type" }
    ],
    defaultExpanded: false
  },
  {
    title: "Utilities & Systems",
    fields: [
      { name: "responsibility_of_heating", label: "Responsibility of Heating", type: "text", required: false, placeholder: "Enter Heating Responsibility" },
      { name: "heating_system", label: "Heating System", type: "text", required: false, placeholder: "Enter Heating System Type" },
      { name: "responsible_of_hot_heating", label: "Responsible of Hot Water", type: "select", required: false, options: responsibleOfHotHeating, placeholder: "Enter Hot Water Responsibility" },
      { name: "hot_water_system", label: "Hot Water System", type: "text", required: false, placeholder: "Enter Hot Water System" },
      { name: "responsibility_of_appliances", label: "Responsibility of Appliances", type: "select", required: false, options: responsibilityOfAppliances, placeholder: "Enter Appliances Responsibility" },
      { name: "electrical_panels", label: "Electrical Panels", type: "text", required: false, placeholder: "Enter Electrical Panels Info" },
      { name: "plumbing", label: "Plumbing", type: "text", required: false, placeholder: "Enter Plumbing Details" },
      { name: "washer_dryer_installation", label: "Washer/Dryer Installation", type: "select", required: false, options: washerDryerInstallation, placeholder: "Enter Washer/Dryer Info" },
      { name: "laundry", label: "Laundry", type: "select", required: false, options: laundryOptions, placeholder: "Enter Laundry Details" }
    ],
    defaultExpanded: false
  },
  {
    title: "Building Conditions",
    fields: [
      { name: "condition_of_roof", label: "Condition of Roof", type: "text", required: false, placeholder: "Enter Roof Condition" },
      { name: "condition_of_kitchens", label: "Condition of Kitchens", type: "text", required: false, placeholder: "Enter Kitchen Condition" },
      { name: "condition_of_bathrooms", label: "Condition of Bathrooms", type: "text", required: false, placeholder: "Enter Bathroom Condition" },
      { name: "condition_of_flooring", label: "Condition of Flooring", type: "text", required: false, placeholder: "Enter Flooring Condition" },
      { name: "condition_of_balconies", label: "Condition of Balconies", type: "text", required: false, placeholder: "Enter Balcony Condition" },
      { name: "condition_of_doors", label: "Condition of Doors", type: "text", required: false, placeholder: "Enter Door Condition" },
      { name: "condition_of_windows", label: "Condition of Windows", type: "text", required: false, placeholder: "Enter Window Condition" },
      { name: "siding", label: "Siding", type: "text", required: false, placeholder: "Enter Siding Details" }
    ],
    defaultExpanded: false
  },
  {
    title: "Building Features",
    fields: [
      { name: "intercom_system", label: "Intercom System", type: "text", required: false, placeholder: "Enter Intercom System Details" },
      { name: "fire_alarm_system", label: "Fire Alarm System", type: "text", required: false, placeholder: "Enter Fire Alarm Details" },
      { name: "janitor_agreement", label: "Janitor Agreement", type: "text", required: false, placeholder: "Enter Janitor Agreement Details" }
    ],
    defaultExpanded: false
  },
  {
    title: "Environmental Studies",
    fields: [
      { name: "environmental_study", label: "Environmental Study", type: "text", required: false, placeholder: "Enter Environmental Study Details" },
      { name: "environmental_study_date", label: "Environmental Study Date", type: "date", required: false, placeholder: "" }
    ],
    defaultExpanded: false
  },
  {
    title: "Recent Capital Expenditures",
    fields: [
      { name: "recent_capital_expenditures.rooftop_year", label: "Rooftop Year", type: "text", required: false, placeholder: "Enter Rooftop Year" },
      { name: "recent_capital_expenditures.furnace_hot_water_tank_year", label: "Furnace/Hot Water Tank Year", type: "text", required: false, placeholder: "Enter Furnace/Hot Water Tank Year" },
      { name: "recent_capital_expenditures.other_expenditures", label: "Other Expenditures", type: "textarea", required: false, placeholder: "Enter Other Expenditures" }
    ],
    defaultExpanded: false
  },
  {
    title: "Municipal Assessments",
    fields: [
      { name: "municipal_assessment_land", label: "Municipal Assessment Land", type: "text", required: false, placeholder: "Enter Land Assessment Value" },
      { name: "municipal_assessment_building", label: "Municipal Assessment Building", type: "text", required: false, placeholder: "Enter Building Assessment Value" },
      { name: "total_municipal_evaluation", label: "Total Municipal Evaluation", type: "text", required: false, placeholder: "Enter Total Evaluation" }
    ],
    defaultExpanded: false
  },
  {
    title: "Financial Information",
    fields: [
      { name: "price", label: "Price", type: "number", required: true, placeholder: "Enter Property Price" }
    ],
    defaultExpanded: true
  },
  {
    title: "Revenue Breakdown",
    fields: [
      // Residential Revenue
      { name: "revenue.residential.yearly", label: "Residential Yearly", type: "number", required: false, placeholder: "Enter Residential Yearly Revenue" },
      { name: "revenue.residential.percentage_gr", label: "Residential Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "revenue.residential.monthly_per_unit", label: "Residential Monthly Per Unit", type: "number", required: false, placeholder: "Enter Monthly Per Unit" },
      // Commercial Revenue
      { name: "revenue.commercial.yearly", label: "Commercial Yearly", type: "number", required: false, placeholder: "Enter Commercial Yearly Revenue" },
      { name: "revenue.commercial.percentage_gr", label: "Commercial Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "revenue.commercial.monthly_per_unit", label: "Commercial Monthly Per Unit", type: "number", required: false, placeholder: "Enter Monthly Per Unit" },
      // Parking Revenue
      { name: "revenue.parking.yearly", label: "Parking Yearly", type: "number", required: false, placeholder: "Enter Parking Yearly Revenue" },
      { name: "revenue.parking.percentage_gr", label: "Parking Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "revenue.parking.monthly_per_unit", label: "Parking Monthly Per Unit", type: "number", required: false, placeholder: "Enter Monthly Per Unit" },
      // Laundry Revenue
      { name: "revenue.laundry.yearly", label: "Laundry Yearly", type: "number", required: false, placeholder: "Enter Laundry Yearly Revenue" },
      { name: "revenue.laundry.percentage_gr", label: "Laundry Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "revenue.laundry.monthly_per_unit", label: "Laundry Monthly Per Unit", type: "number", required: false, placeholder: "Enter Monthly Per Unit" },
      // Storage Revenue
      { name: "revenue.storage.yearly", label: "Storage Yearly", type: "number", required: false, placeholder: "Enter Storage Yearly Revenue" },
      { name: "revenue.storage.percentage_gr", label: "Storage Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "revenue.storage.monthly_per_unit", label: "Storage Monthly Per Unit", type: "number", required: false, placeholder: "Enter Monthly Per Unit" },
      // Total Revenue
      { name: "revenue.total_gross_income", label: "Total Gross Income", type: "number", required: false, placeholder: "Enter Total Gross Income" },
      { name: "revenue.gross_income_per_unit", label: "Gross Income Per Unit", type: "number", required: false, placeholder: "Enter Gross Income Per Unit" }
    ],
    defaultExpanded: false
  },
  {
    title: "Expenses Breakdown",
    fields: [
      // Vacancy/Bad Debt
      { name: "expenses.vacancy_bad_debt.assessment", label: "Vacancy/Bad Debt Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.vacancy_bad_debt.percentage_gr", label: "Vacancy/Bad Debt Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.vacancy_bad_debt.cost_per_unit", label: "Vacancy/Bad Debt Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // ADMINISTRATION
      { name: "expenses.administration.assessment", label: "Administration Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.administration.percentage_gr", label: "Administration Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.administration.cost_per_unit", label: "Administration Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Municipal Taxes
      { name: "expenses.municipal_taxes.assessment", label: "Municipal Taxes Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.municipal_taxes.percentage_gr", label: "Municipal Taxes Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.municipal_taxes.cost_per_unit", label: "Municipal Taxes Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // School Taxes
      { name: "expenses.school_taxes.assessment", label: "School Taxes Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.school_taxes.percentage_gr", label: "School Taxes Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.school_taxes.cost_per_unit", label: "School Taxes Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Insurance
      { name: "expenses.insurance.assessment", label: "Insurance Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.insurance.percentage_gr", label: "Insurance Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.insurance.cost_per_unit", label: "Insurance Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Electricity
      { name: "expenses.electricity.assessment", label: "Electricity Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.electricity.percentage_gr", label: "Electricity Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.electricity.cost_per_unit", label: "Electricity Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Heating
      { name: "expenses.heating.assessment", label: "Heating Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.heating.percentage_gr", label: "Heating Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.heating.cost_per_unit", label: "Heating Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Snow Removal
      { name: "expenses.snow_removal.assessment", label: "Snow Removal Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.snow_removal.percentage_gr", label: "Snow Removal Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.snow_removal.cost_per_unit", label: "Snow Removal Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Elevator
      { name: "expenses.elevator.assessment", label: "Elevator Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.elevator.percentage_gr", label: "Elevator Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.elevator.cost_per_unit", label: "Elevator Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // EQUIPMENT RENTAL
      { name: "expenses.equipment_rental.assessment", label: "Equipment Rental Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.equipment_rental.percentage_gr", label: "Equipment Rental Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.equipment_rental.cost_per_unit", label: "Equipment Rental Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // MAINTENTANCE RESERVE
      { name: "expenses.maintenance_reserve.assessment", label: "Maintenance Reserve Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.maintenance_reserve.percentage_gr", label: "Maintenance Reserve Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.maintenance_reserve.cost_per_unit", label: "Maintenance Reserve Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // WAGES/JANITOR
      { name: "expenses.wages_janitor.assessment", label: "Wages/Janitor Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.wages_janitor.percentage_gr", label: "Wages/Janitor Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.wages_janitor.cost_per_unit", label: "Wages/Janitor Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // FURNITURE RESERVE
      { name: "expenses.furniture_reserve.assessment", label: "Furniture Reserve Assessment", type: "number", required: false, placeholder: "Enter Assessment" },
      { name: "expenses.furniture_reserve.percentage_gr", label: "Furniture Reserve Percentage GR", type: "number", required: false, placeholder: "Enter Percentage" },
      { name: "expenses.furniture_reserve.cost_per_unit", label: "Furniture Reserve Cost Per Unit", type: "number", required: false, placeholder: "Enter Cost Per Unit" },
      // Total Expenses
      { name: "expenses.total_expenses", label: "Total Expenses", type: "number", required: false, placeholder: "Enter Total Expenses" },
      { name: "expenses.total_expenses_per_unit", label: "Total Expenses Per Unit", type: "number", required: false, placeholder: "Enter Total Expenses Per Unit" }
    ],
    defaultExpanded: false
  },
  {
    title: "Financial Analysis",
    fields: [
      { name: "financial_analysis.net_income", label: "Net Income", type: "number", required: false, placeholder: "Enter Net Income" },
      { name: "financial_analysis.net_income_per_unit", label: "Net Income Per Unit", type: "number", required: false, placeholder: "Enter Net Income Per Unit" },
      { name: "financial_analysis.cap_rate", label: "Cap Rate", type: "number", required: false, placeholder: "Enter Cap Rate" },
      { name: "financial_analysis.suggested_market_price", label: "Suggested Market Price", type: "number", required: false, placeholder: "Enter Suggested Market Price" },
      { name: "financial_analysis.gross_income_multiplier", label: "Gross Income Multiplier (GIM)", type: "number", required: false, placeholder: "Enter Gross Income Multiplier" },
      { name: "financial_analysis.price_per_unit", label: "Price Per Unit (PPU)", type: "number", required: false, placeholder: "Enter Price Per Unit" }
    ],
    defaultExpanded: false
  },
  {
    title: "Financing Information",
    fields: [
      // Institution
      { name: "financing.institution.cmhc_loan_option", label: "INSTITUTION", type: "text", required: false, placeholder: "Enter Institution", row: 1, column: 2 },
      { name: "financing.institution.current_mortgage", label: "INSTITUTION", type: "text", required: false, placeholder: "Enter Institution", row: 1, column: 3 },
      { name: "financing.institution.assumption", label: "INSTITUTION", type: "text", required: false, placeholder: "Enter Institution", row: 1, column: 4 },
      // Rate
      { name: "financing.rate.cmhc_loan_option", label: "RATE", type: "number", required: false, placeholder: "Enter Rate", row: 2, column: 2 },
      { name: "financing.rate.current_mortgage", label: "RATE", type: "number", required: false, placeholder: "Enter Rate", row: 2, column: 3 },
      { name: "financing.rate.assumption", label: "RATE", type: "number", required: false, placeholder: "Enter Rate", row: 2, column: 4 },
      // Amortization
      { name: "financing.amortization.cmhc_loan_option", label: "AMORTIZATION", type: "number", required: false, placeholder: "Enter Amortization", row: 3, column: 2 },
      { name: "financing.amortization.current_mortgage", label: "AMORTIZATION", type: "number", required: false, placeholder: "Enter Amortization", row: 3, column: 3 },
      { name: "financing.amortization.assumption", label: "AMORTIZATION", type: "number", required: false, placeholder: "Enter Amortization", row: 3, column: 4 },
      // Term
      { name: "financing.term.cmhc_loan_option", label: "TERM", type: "number", required: false, placeholder: "Enter Term", row: 4, column: 2 },
      { name: "financing.term.current_mortgage", label: "TERM", type: "number", required: false, placeholder: "Enter Term", row: 4, column: 3 },
      { name: "financing.term.assumption", label: "TERM", type: "number", required: false, placeholder: "Enter Term", row: 4, column: 4 },
      // Cap Rate
      { name: "financing.cap_rate.cmhc_loan_option", label: "CAP RATE", type: "number", required: false, placeholder: "Enter Cap Rate", row: 5, column: 2 },
      { name: "financing.cap_rate.current_mortgage", label: "CAP RATE", type: "number", required: false, placeholder: "Enter Cap Rate", row: 5, column: 3 },
      { name: "financing.cap_rate.assumption", label: "CAP RATE", type: "number", required: false, placeholder: "Enter Cap Rate", row: 5, column: 4 },
      // Loan Amount
      { name: "financing.loan_amount.cmhc_loan_option", label: "LOAN AMOUNT", type: "number", required: false, placeholder: "Enter Loan Amount", row: 6, column: 2 },
      { name: "financing.loan_amount.current_mortgage", label: "LOAN AMOUNT", type: "number", required: false, placeholder: "Enter Loan Amount", row: 6, column: 3 },
      { name: "financing.loan_amount.assumption", label: "LOAN AMOUNT", type: "number", required: false, placeholder: "Enter Loan Amount", row: 6, column: 4 },
      // Loan to Value %
      { name: "financing.loan_to_value_percentage.cmhc_loan_option", label: "LOAN TO VALUE%", type: "number", required: false, placeholder: "Enter Loan to Value %", row: 7, column: 2 },
      { name: "financing.loan_to_value_percentage.current_mortgage", label: "LOAN TO VALUE%", type: "number", required: false, placeholder: "Enter Loan to Value %", row: 7, column: 3 },
      { name: "financing.loan_to_value_percentage.assumption", label: "LOAN TO VALUE%", type: "number", required: false, placeholder: "Enter Loan to Value %", row: 7, column: 4 },
      // Debt Coverage Ratio
      { name: "financing.debt_coverage_ratio.cmhc_loan_option", label: "DEBT COVERAGE RATIO", type: "number", required: false, placeholder: "Enter Debt Coverage Ratio", row: 8, column: 2 },
      { name: "financing.debt_coverage_ratio.current_mortgage", label: "DEBT COVERAGE RATIO", type: "number", required: false, placeholder: "Enter Debt Coverage Ratio", row: 8, column: 3 },
      { name: "financing.debt_coverage_ratio.assumption", label: "DEBT COVERAGE RATIO", type: "number", required: false, placeholder: "Enter Debt Coverage Ratio", row: 8, column: 4 },
      // Down Payment
      { name: "financing.down_payment.cmhc_loan_option", label: "DOWN PAYMENT", type: "number", required: false, placeholder: "Enter Down Payment", row: 9, column: 2 },
      { name: "financing.down_payment.current_mortgage", label: "DOWN PAYMENT", type: "number", required: false, placeholder: "Enter Down Payment", row: 9, column: 3 },
      { name: "financing.down_payment.assumption", label: "DOWN PAYMENT", type: "number", required: false, placeholder: "Enter Down Payment", row: 9, column: 4 },
    ],
    defaultExpanded: false,
    layout: "table"
  },
  {
    title: "Cash Flow Analysis",
    fields: [
      // Net Income
      { name: "cash_flow.net_income.cmhc_loan_option", label: "NET INCOME", type: "number", required: false, placeholder: "Enter Net Income", row: 1, column: 2 },
      { name: "cash_flow.net_income.current_mortgage", label: "NET INCOME", type: "number", required: false, placeholder: "Enter Net Income", row: 1, column: 3 },
      { name: "cash_flow.net_income.assumption", label: "NET INCOME", type: "number", required: false, placeholder: "Enter Net Income", row: 1, column: 4 },
      // Annual Mortgage Cost
      { name: "cash_flow.annual_mortgage_cost.cmhc_loan_option", label: "ANNUAL MORTGAGE COST", type: "number", required: false, placeholder: "Enter Annual Mortgage Cost", row: 2, column: 2 },
      { name: "cash_flow.annual_mortgage_cost.current_mortgage", label: "ANNUAL MORTGAGE COST", type: "number", required: false, placeholder: "Enter Annual Mortgage Cost", row: 2, column: 3 },
      { name: "cash_flow.annual_mortgage_cost.assumption", label: "ANNUAL MORTGAGE COST", type: "number", required: false, placeholder: "Enter Annual Mortgage Cost", row: 2, column: 4 },
      // Net Cash After Mortgage
      { name: "cash_flow.net_cash_after_mortgage.cmhc_loan_option", label: "NET CASH AFTER MORTGAGE", type: "number", required: false, placeholder: "Enter Net Cash After Mortgage", row: 3, column: 2 },
      { name: "cash_flow.net_cash_after_mortgage.current_mortgage", label: "NET CASH AFTER MORTGAGE", type: "number", required: false, placeholder: "Enter Net Cash After Mortgage", row: 3, column: 3 },
      { name: "cash_flow.net_cash_after_mortgage.assumption", label: "NET CASH AFTER MORTGAGE", type: "number", required: false, placeholder: "Enter Net Cash After Mortgage", row: 3, column: 4 }
    ],
    defaultExpanded: false,
    layout: "table"
  },
  {
    title: "ROI Analysis",
    fields: [
      // Cash on Cash Return
      { name: "roi_analysis.cash_on_cash_return.cmhc_loan_option", label: "CASH ON CASH RETURN", type: "number", required: false, placeholder: "Enter Cash on Cash Return", row: 1, column: 2 },
      { name: "roi_analysis.cash_on_cash_return.current_mortgage", label: "CASH ON CASH RETURN", type: "number", required: false, placeholder: "Enter Cash on Cash Return", row: 1, column: 3 },
      { name: "roi_analysis.cash_on_cash_return.assumption", label: "CASH ON CASH RETURN", type: "number", required: false, placeholder: "Enter Cash on Cash Return", row: 1, column: 4 },
      // Cash Plus Principal
      { name: "roi_analysis.cash_plus_principal.cmhc_loan_option", label: "CASH + PRINCIPAL", type: "number", required: false, placeholder: "Enter Cash + Principal", row: 2, column: 2 },
      { name: "roi_analysis.cash_plus_principal.current_mortgage", label: "CASH + PRINCIPAL", type: "number", required: false, placeholder: "Enter Cash + Principal", row: 2, column: 3 },
      { name: "roi_analysis.cash_plus_principal.assumption", label: "CASH + PRINCIPAL", type: "number", required: false, placeholder: "Enter Cash + Principal", row: 2, column: 4 },
      // IRR with Market Appreciation
      { name: "roi_analysis.irr_with_market_appreciation.cmhc_loan_option", label: "IRR WITH 2% MARKET APPRECIATION", type: "number", required: false, placeholder: "Enter IRR with 2% Market Appreciation", row: 3, column: 2 },
      { name: "roi_analysis.irr_with_market_appreciation.current_mortgage", label: "IRR WITH 2% MARKET APPRECIATION", type: "number", required: false, placeholder: "Enter IRR with 2% Market Appreciation", row: 3, column: 3 },
      { name: "roi_analysis.irr_with_market_appreciation.assumption", label: "IRR WITH 2% MARKET APPRECIATION", type: "number", required: false, placeholder: "Enter IRR with 2% Market Appreciation", row: 3, column: 4 }
    ],
    defaultExpanded: false,
    layout: "table"
  },
  {
    title: "Media",
    fields: [
      { name: "images", label: "Images", type: "file", required: true, placeholder: "Upload Property Images", accept: "image/*", multiple: true },
    ],
    defaultExpanded: true
  },
  {
    title: "Ownership & Management",
    fields: [
      { name: "assigned_to", label: "Broker", type: "multiselect", required: false, placeholder: "Select Users to Assign This Property To", options: [] }, // Options should be populated with users from API
      { name: "owner_name", label: "Owner Name", type: "text", required: true, placeholder: "Enter Owner Name" },
      { name: "phone_number", label: "Phone Number", type: "tel", required: true, placeholder: "Enter Phone Number" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter Email Address" },
      { name: "owner_address", label: "Owner Address", type: "text", required: true, placeholder: "Enter Owner Address" }
    ],
    defaultExpanded: true
  },
  {
    title: "Additional Information",
    fields: [
      { name: "other_information", label: "Other Information", type: "textarea", required: false, placeholder: "Enter Any Additional Information" }
    ],
    defaultExpanded: false
  }
];