
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
      { name: "title", label: "Property Title", type: "text", required: true, placeholder: "Enter property title" },
      { name: "description", label: "Description", type: "textarea", required: true, placeholder: "Enter detailed property description" },
      { name: "property_type", label: "Property Type", type: "select", required: true, options: propertyTypes, placeholder: "Select property type" },
      { name: "property_status", label: "Property Status", type: "select", required: true, options: propertyStatus, placeholder: "Select property status" },
      { name: "ownership_status", label: "Ownership Status", type: "select", required: true, options: ownershipStatus, placeholder: "Select ownership status" },
      { name: "contract_type", label: "Contract Type", type: "select", required: false, options: contractTypes, placeholder: "Select contract type" }
    ],
    defaultExpanded: true
  },
  {
    title: "Location & Address",
    fields: [
      { name: "address", label: "Address", type: "text", required: true, placeholder: "Enter complete address" },
      { name: "street_number", label: "Street Number", type: "text", required: true, placeholder: "Enter street number" },
      { name: "street_name", label: "Street Name", type: "text", required: true, placeholder: "Enter street name" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "Enter city" },
      { name: "municipality", label: "Municipality", type: "text", required: true, placeholder: "Enter municipality" },
      { name: "cadastral_number", label: "Cadastral Number", type: "text", required: true, placeholder: "Enter cadastral number" },
      { name: "location_map_url", label: "Location Map URL", type: "textarea", required: false, placeholder: "Paste Google Maps iframe embed code" }
    ],
    defaultExpanded: true
  },
  {
    title: "Building Specifications",
    fields: [
      { name: "no_of_units", label: "Number of Units", type: "text", required: true, placeholder: "Enter number of units" },
      { name: "unit_size", label: "Unit Size", type: "text", required: true, placeholder: "Enter unit size" },
      { name: "year_built", label: "Year Built", type: "text", required: false, placeholder: "Enter year built" },
      { name: "building_type", label: "Building Type", type: "text", required: false, placeholder: "Enter building type" },
      { name: "construction_type", label: "Construction Type", type: "text", required: false, placeholder: "Enter construction type" },
      { name: "building_stories", label: "Building Stories", type: "text", required: false, placeholder: "Enter number of stories" },
      { name: "land_area", label: "Land Area", type: "text", required: false, placeholder: "Enter land area" }
    ],
    defaultExpanded: false
  },
  {
    title: "Parking & Garages",
    fields: [
      { name: "no_of_garages", label: "Number of Garages", type: "text", required: false, placeholder: "Enter number of garages" },
      { name: "no_of_parking_places", label: "Number of Parking Places", type: "text", required: false, placeholder: "Enter parking places" },
      { name: "parking_surface", label: "Parking Surface", type: "text", required: false, placeholder: "Enter parking surface type" }
    ],
    defaultExpanded: false
  },
  {
    title: "Utilities & Systems",
    fields: [
      { name: "responsibility_of_heating", label: "Responsibility of Heating", type: "text", required: false, placeholder: "Enter heating responsibility" },
      { name: "heating_system", label: "Heating System", type: "text", required: false, placeholder: "Enter heating system type" },
      { name: "responsible_of_hot_heating", label: "Responsible of Hot Water", type: "select", required: false, options: responsibleOfHotHeating, placeholder: "Enter hot water responsibility" },
      { name: "hot_water_system", label: "Hot Water System", type: "text", required: false, placeholder: "Enter hot water system" },
      { name: "responsibility_of_appliances", label: "Responsibility of Appliances", type: "select", required: false, options: responsibilityOfAppliances, placeholder: "Enter appliances responsibility" },
      { name: "electrical_panels", label: "Electrical Panels", type: "text", required: false, placeholder: "Enter electrical panels info" },
      { name: "plumbing", label: "Plumbing", type: "text", required: false, placeholder: "Enter plumbing details" },
      { name: "washer_dryer_installation", label: "Washer/Dryer Installation", type: "select", required: false, options: washerDryerInstallation, placeholder: "Enter washer/dryer info" },
      { name: "laundry", label: "Laundry", type: "select", required: false, options: laundryOptions, placeholder: "Enter laundry details" }
    ],
    defaultExpanded: false
  },
  {
    title: "Building Conditions",
    fields: [
      { name: "condition_of_roof", label: "Condition of Roof", type: "text", required: false, placeholder: "Enter roof condition" },
      { name: "condition_of_kitchens", label: "Condition of Kitchens", type: "text", required: false, placeholder: "Enter kitchen condition" },
      { name: "condition_of_bathrooms", label: "Condition of Bathrooms", type: "text", required: false, placeholder: "Enter bathroom condition" },
      { name: "condition_of_flooring", label: "Condition of Flooring", type: "text", required: false, placeholder: "Enter flooring condition" },
      { name: "condition_of_balconies", label: "Condition of Balconies", type: "text", required: false, placeholder: "Enter balcony condition" },
      { name: "condition_of_doors", label: "Condition of Doors", type: "text", required: false, placeholder: "Enter door condition" },
      { name: "condition_of_windows", label: "Condition of Windows", type: "text", required: false, placeholder: "Enter window condition" },
      { name: "siding", label: "Siding", type: "text", required: false, placeholder: "Enter siding details" }
    ],
    defaultExpanded: false
  },
  {
    title: "Building Features",
    fields: [
      { name: "intercom_system", label: "Intercom System", type: "text", required: false, placeholder: "Enter intercom system details" },
      { name: "fire_alarm_system", label: "Fire Alarm System", type: "text", required: false, placeholder: "Enter fire alarm details" },
      { name: "janitor_agreement", label: "Janitor Agreement", type: "text", required: false, placeholder: "Enter janitor agreement details" }
    ],
    defaultExpanded: false
  },
  {
    title: "Environmental Studies",
    fields: [
      { name: "environmental_study", label: "Environmental Study", type: "text", required: false, placeholder: "Enter environmental study details" },
      { name: "environmental_study_date", label: "Environmental Study Date", type: "date", required: false, placeholder: "" }
    ],
    defaultExpanded: false
  },
  {
    title: "Recent Capital Expenditures",
    fields: [
      { name: "recent_capital_expenditures.rooftop_year", label: "Rooftop Year", type: "text", required: false, placeholder: "Enter rooftop year" },
      { name: "recent_capital_expenditures.furnace_hot_water_tank_year", label: "Furnace/Hot Water Tank Year", type: "text", required: false, placeholder: "Enter furnace/hot water tank year" },
      { name: "recent_capital_expenditures.other_expenditures", label: "Other Expenditures", type: "textarea", required: false, placeholder: "Enter other expenditures" }
    ],
    defaultExpanded: false
  },
  {
    title: "Municipal Assessments",
    fields: [
      { name: "municipal_assessment_land", label: "Municipal Assessment Land", type: "text", required: false, placeholder: "Enter land assessment value" },
      { name: "municipal_assessment_building", label: "Municipal Assessment Building", type: "text", required: false, placeholder: "Enter building assessment value" },
      { name: "total_municipal_evaluation", label: "Total Municipal Evaluation", type: "text", required: false, placeholder: "Enter total evaluation" }
    ],
    defaultExpanded: false
  },
  {
    title: "Financial Information",
    fields: [
      { name: "price", label: "Price", type: "number", required: true, placeholder: "Enter property price" }
    ],
    defaultExpanded: true
  },
  {
    title: "Revenue Breakdown",
    fields: [
      // Residential Revenue
      { name: "revenue.residential.yearly", label: "Residential Yearly", type: "number", required: false, placeholder: "Enter residential yearly revenue" },
      { name: "revenue.residential.percentage_gr", label: "Residential Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "revenue.residential.monthly_per_unit", label: "Residential Monthly Per Unit", type: "number", required: false, placeholder: "Enter monthly per unit" },
      // Commercial Revenue
      { name: "revenue.commercial.yearly", label: "Commercial Yearly", type: "number", required: false, placeholder: "Enter commercial yearly revenue" },
      { name: "revenue.commercial.percentage_gr", label: "Commercial Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "revenue.commercial.monthly_per_unit", label: "Commercial Monthly Per Unit", type: "number", required: false, placeholder: "Enter monthly per unit" },
      // Parking Revenue
      { name: "revenue.parking.yearly", label: "Parking Yearly", type: "number", required: false, placeholder: "Enter parking yearly revenue" },
      { name: "revenue.parking.percentage_gr", label: "Parking Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "revenue.parking.monthly_per_unit", label: "Parking Monthly Per Unit", type: "number", required: false, placeholder: "Enter monthly per unit" },
      // Laundry Revenue
      { name: "revenue.laundry.yearly", label: "Laundry Yearly", type: "number", required: false, placeholder: "Enter laundry yearly revenue" },
      { name: "revenue.laundry.percentage_gr", label: "Laundry Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "revenue.laundry.monthly_per_unit", label: "Laundry Monthly Per Unit", type: "number", required: false, placeholder: "Enter monthly per unit" },
      // Storage Revenue
      { name: "revenue.storage.yearly", label: "Storage Yearly", type: "number", required: false, placeholder: "Enter storage yearly revenue" },
      { name: "revenue.storage.percentage_gr", label: "Storage Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "revenue.storage.monthly_per_unit", label: "Storage Monthly Per Unit", type: "number", required: false, placeholder: "Enter monthly per unit" },
      // Total Revenue
      { name: "revenue.total_gross_income", label: "Total Gross Income", type: "number", required: false, placeholder: "Enter total gross income" },
      { name: "revenue.gross_income_per_unit", label: "Gross Income Per Unit", type: "number", required: false, placeholder: "Enter gross income per unit" }
    ],
    defaultExpanded: false
  },
  {
    title: "Expenses Breakdown",
    fields: [
      // Vacancy/Bad Debt
      { name: "expenses.vacancy_bad_debt.assessment", label: "Vacancy/Bad Debt Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.vacancy_bad_debt.percentage_gr", label: "Vacancy/Bad Debt Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.vacancy_bad_debt.cost_per_unit", label: "Vacancy/Bad Debt Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // ADMINISTRATION
      { name: "expenses.administration.assessment", label: "Administration Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.administration.percentage_gr", label: "Administration Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.administration.cost_per_unit", label: "Administration Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Municipal Taxes
      { name: "expenses.municipal_taxes.assessment", label: "Municipal Taxes Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.municipal_taxes.percentage_gr", label: "Municipal Taxes Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.municipal_taxes.cost_per_unit", label: "Municipal Taxes Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // School Taxes
      { name: "expenses.school_taxes.assessment", label: "School Taxes Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.school_taxes.percentage_gr", label: "School Taxes Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.school_taxes.cost_per_unit", label: "School Taxes Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Insurance
      { name: "expenses.insurance.assessment", label: "Insurance Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.insurance.percentage_gr", label: "Insurance Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.insurance.cost_per_unit", label: "Insurance Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Electricity
      { name: "expenses.electricity.assessment", label: "Electricity Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.electricity.percentage_gr", label: "Electricity Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.electricity.cost_per_unit", label: "Electricity Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Heating
      { name: "expenses.heating.assessment", label: "Heating Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.heating.percentage_gr", label: "Heating Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.heating.cost_per_unit", label: "Heating Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Snow Removal
      { name: "expenses.snow_removal.assessment", label: "Snow Removal Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.snow_removal.percentage_gr", label: "Snow Removal Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.snow_removal.cost_per_unit", label: "Snow Removal Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Elevator
      { name: "expenses.elevator.assessment", label: "Elevator Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.elevator.percentage_gr", label: "Elevator Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.elevator.cost_per_unit", label: "Elevator Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // EQUIPMENT RENTAL
      { name: "expenses.equipment_rental.assessment", label: "Equipment Rental Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.equipment_rental.percentage_gr", label: "Equipment Rental Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.equipment_rental.cost_per_unit", label: "Equipment Rental Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // MAINTENTANCE RESERVE
      { name: "expenses.maintenance_reserve.assessment", label: "Maintenance Reserve Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.maintenance_reserve.percentage_gr", label: "Maintenance Reserve Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.maintenance_reserve.cost_per_unit", label: "Maintenance Reserve Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // WAGES/JANITOR
      { name: "expenses.wages_janitor.assessment", label: "Wages/Janitor Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.wages_janitor.percentage_gr", label: "Wages/Janitor Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.wages_janitor.cost_per_unit", label: "Wages/Janitor Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // FURNITURE RESERVE
      { name: "expenses.furniture_reserve.assessment", label: "Furniture Reserve Assessment", type: "number", required: false, placeholder: "Enter assessment" },
      { name: "expenses.furniture_reserve.percentage_gr", label: "Furniture Reserve Percentage GR", type: "number", required: false, placeholder: "Enter percentage" },
      { name: "expenses.furniture_reserve.cost_per_unit", label: "Furniture Reserve Cost Per Unit", type: "number", required: false, placeholder: "Enter cost per unit" },
      // Total Expenses
      { name: "expenses.total_expenses", label: "Total Expenses", type: "number", required: false, placeholder: "Enter total expenses" },
      { name: "expenses.total_expenses_per_unit", label: "Total Expenses Per Unit", type: "number", required: false, placeholder: "Enter total expenses per unit" }
    ],
    defaultExpanded: false
  },
  {
    title: "Financial Analysis",
    fields: [
      { name: "financial_analysis.net_income", label: "Net Income", type: "number", required: false, placeholder: "Enter net income" },
      { name: "financial_analysis.net_income_per_unit", label: "Net Income Per Unit", type: "number", required: false, placeholder: "Enter net income per unit" },
      { name: "financial_analysis.cap_rate", label: "Cap Rate", type: "number", required: false, placeholder: "Enter cap rate" },
      { name: "financial_analysis.suggested_market_price", label: "Suggested Market Price", type: "number", required: false, placeholder: "Enter suggested market price" },
      { name: "financial_analysis.gross_income_multiplier", label: "Gross Income Multiplier (GIM)", type: "number", required: false, placeholder: "Enter gross income multiplier" },
      { name: "financial_analysis.price_per_unit", label: "Price Per Unit (PPU)", type: "number", required: false, placeholder: "Enter price per unit" }
    ],
    defaultExpanded: false
  },
  {
    title: "Financing Information",
    fields: [
      // Institution
      { name: "financing.institution.cmhc_loan_option", label: "INSTITUTION", type: "text", required: false, placeholder: "Enter institution", row: 1, column: 2 },
      { name: "financing.institution.current_mortgage", label: "INSTITUTION", type: "text", required: false, placeholder: "Enter institution", row: 1, column: 3 },
      // Rate
      { name: "financing.rate.cmhc_loan_option", label: "RATE", type: "number", required: false, placeholder: "Enter rate", row: 2, column: 2 },
      { name: "financing.rate.current_mortgage", label: "RATE", type: "number", required: false, placeholder: "Enter rate", row: 2, column: 3 },
      // Amortization
      { name: "financing.amortization.cmhc_loan_option", label: "AMORTIZATION", type: "number", required: false, placeholder: "Enter amortization", row: 3, column: 2 },
      { name: "financing.amortization.current_mortgage", label: "AMORTIZATION", type: "number", required: false, placeholder: "Enter amortization", row: 3, column: 3 },
      // Term
      { name: "financing.term.cmhc_loan_option", label: "TERM", type: "number", required: false, placeholder: "Enter term", row: 4, column: 2 },
      { name: "financing.term.current_mortgage", label: "TERM", type: "number", required: false, placeholder: "Enter term", row: 4, column: 3 },
      // Cap Rate
      { name: "financing.cap_rate.cmhc_loan_option", label: "CAP RATE", type: "number", required: false, placeholder: "Enter cap rate", row: 5, column: 2 },
      { name: "financing.cap_rate.current_mortgage", label: "CAP RATE", type: "number", required: false, placeholder: "Enter cap rate", row: 5, column: 3 },
      // Loan Amount
      { name: "financing.loan_amount.cmhc_loan_option", label: "LOAN AMOUNT", type: "number", required: false, placeholder: "Enter loan amount", row: 6, column: 2 },
      { name: "financing.loan_amount.current_mortgage", label: "LOAN AMOUNT", type: "number", required: false, placeholder: "Enter loan amount", row: 6, column: 3 },
      // Loan to Value %
      { name: "financing.loan_to_value_percentage.cmhc_loan_option", label: "LOAN TO VALUE%", type: "number", required: false, placeholder: "Enter loan to value %", row: 7, column: 2 },
      { name: "financing.loan_to_value_percentage.current_mortgage", label: "LOAN TO VALUE%", type: "number", required: false, placeholder: "Enter loan to value %", row: 7, column: 3 },
      // Debt Coverage Ratio
      { name: "financing.debt_coverage_ratio.cmhc_loan_option", label: "DEBT COVERAGE RATIO", type: "number", required: false, placeholder: "Enter debt coverage ratio", row: 8, column: 2 },
      { name: "financing.debt_coverage_ratio.current_mortgage", label: "DEBT COVERAGE RATIO", type: "number", required: false, placeholder: "Enter debt coverage ratio", row: 8, column: 3 },
      // Down Payment
      { name: "financing.down_payment.cmhc_loan_option", label: "DOWN PAYMENT", type: "number", required: false, placeholder: "Enter down payment", row: 9, column: 2 },
      { name: "financing.down_payment.current_mortgage", label: "DOWN PAYMENT", type: "number", required: false, placeholder: "Enter down payment", row: 9, column: 3 },
    ],
    defaultExpanded: false,
    layout: "table"
  },
  {
    title: "Cash Flow Analysis",
    fields: [
      // Net Income
      { name: "cash_flow.net_income.cmhc_loan_option", label: "NET INCOME", type: "number", required: false, placeholder: "Enter net income", row: 1, column: 2 },
      { name: "cash_flow.net_income.current_mortgage", label: "NET INCOME", type: "number", required: false, placeholder: "Enter net income", row: 1, column: 3 },
      // Annual Mortgage Cost
      { name: "cash_flow.annual_mortgage_cost.cmhc_loan_option", label: "ANNUAL MORTGAGE COST", type: "number", required: false, placeholder: "Enter annual mortgage cost", row: 2, column: 2 },
      { name: "cash_flow.annual_mortgage_cost.current_mortgage", label: "ANNUAL MORTGAGE COST", type: "number", required: false, placeholder: "Enter annual mortgage cost", row: 2, column: 3 },
      // Net Cash After Mortgage
      { name: "cash_flow.net_cash_after_mortgage.cmhc_loan_option", label: "NET CASH AFTER MORTGAGE", type: "number", required: false, placeholder: "Enter net cash after mortgage", row: 3, column: 2 },
      { name: "cash_flow.net_cash_after_mortgage.current_mortgage", label: "NET CASH AFTER MORTGAGE", type: "number", required: false, placeholder: "Enter net cash after mortgage", row: 3, column: 3 }
    ],
    defaultExpanded: false,
    layout: "table"
  },
  {
    title: "ROI Analysis",
    fields: [
      // Cash on Cash Return
      { name: "roi_analysis.cash_on_cash_return.cmhc_loan_option", label: "CASH ON CASH RETURN", type: "number", required: false, placeholder: "Enter cash on cash return", row: 1, column: 2 },
      { name: "roi_analysis.cash_on_cash_return.current_mortgage", label: "CASH ON CASH RETURN", type: "number", required: false, placeholder: "Enter cash on cash return", row: 1, column: 3 },
      // Cash Plus Principal
      { name: "roi_analysis.cash_plus_principal.cmhc_loan_option", label: "CASH + PRINCIPAL", type: "number", required: false, placeholder: "Enter cash + principal", row: 2, column: 2 },
      { name: "roi_analysis.cash_plus_principal.current_mortgage", label: "CASH + PRINCIPAL", type: "number", required: false, placeholder: "Enter cash + principal", row: 2, column: 3 },
      // IRR with Market Appreciation
      { name: "roi_analysis.irr_with_market_appreciation.cmhc_loan_option", label: "IRR WITH 2% MARKET APPRECIATION", type: "number", required: false, placeholder: "Enter IRR with 2% market appreciation", row: 3, column: 2 },
      { name: "roi_analysis.irr_with_market_appreciation.current_mortgage", label: "IRR WITH 2% MARKET APPRECIATION", type: "number", required: false, placeholder: "Enter IRR with 2% market appreciation", row: 3, column: 3 }
    ],
    defaultExpanded: false,
    layout: "table"
  },
  {
    title: "Media",
    fields: [
      { name: "images", label: "Images", type: "file", required: true, placeholder: "Upload property images", accept: "image/*", multiple: true },
    ],
    defaultExpanded: true
  },
  {
    title: "Ownership & Management",
    fields: [
      { name: "assigned_to", label: "Broker", type: "multiselect", required: false, placeholder: "Select users to assign this property to", options: [] }, // Options should be populated with users from API
      { name: "owner_name", label: "Owner Name", type: "text", required: true, placeholder: "Enter owner name" },
      { name: "phone_number", label: "Phone Number", type: "tel", required: true, placeholder: "Enter phone number" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "Enter email address" },
      { name: "owner_address", label: "Owner Address", type: "text", required: true, placeholder: "Enter owner address" }
    ],
    defaultExpanded: true
  },
  {
    title: "Additional Information",
    fields: [
      { name: "other_information", label: "Other Information", type: "textarea", required: false, placeholder: "Enter any additional information" }
    ],
    defaultExpanded: false
  }
];