export const propertyTypes = [
  {
    value: "residential",
    label: "Residential",
  },
  {
    value: "commercial",
    label: "Commercial",
  },
  {
    value: "plot",
    label: "Plot",
  },
  {
    value: "apartment",
    label: "Apartment",
  },
  {
    value: "house",
    label: "House",
  },
];

export const propertyStatus = [
  {
    value: "available",
    label: "Available",
  },
  {
    value: "under contract",
    label: "Under Contract",
  },
  {
    value: "leased",
    label: "Leased",
  },
  {
    value: "coming soon",
    label: "Coming Soon",
  },
  {
    value: "withdrawn",
    label: "Withdrawn",
  },
  {
    value: "sold",
    label: "Sold",
  },
  {
    value: "expired",
    label: "Expired",
  },
];

export const ownershipStatus = [
  {
    value: "freehold",
    label: "Freehold",
  },
  {
    value: "leasehold",
    label: "Leasehold",
  },
];

export const ownerDetailsStatus = [
  {
    value: "under_contract",
    label: "Under Contract",
  },
  {
    value: "available",
    label: "Available",
  },
  {
    value: "sold",
    label: "Sold",
  },
  {
    value: "expired",
    label: "Expired",
  },
];

export const furnishingStatus = [
  {
    value: "furnished",
    label: "Furnished",
  },
  {
    value: "semi furnished",
    label: "Semi Furnished",
  },
  {
    value: "unfurnished",
    label: "Unfurnished",
  },
];

export const availableFacilities = [
  {
    value: "on market",
    label: "On Market",
  },
  {
    value: "off market",
    label: "Off Market",
  }
];

export const salesPerson = [
  {
    value: "6751c0fbacb35ae00dd7d485",
    label: "Salesperson 1",
  },
  {
    value: "6751c0fbacb35ae00dd7d485",
    label: "Salesperson 2",
  },
  {
    value: "6751c0fbacb35ae00dd7d485",
    label: "Salesperson 3",
  },
];

export const clients = [
  {
    value: "Client 1",
    label: "Client 1",
  },
  {
    value: "Client 2",
    label: "Client 2",
  },
  {
    value: "Client 3",
    label: "Client 3",
  },
];

export const csvHeaderMap = {
  // Basic Property Information
  "Property Title": "title",
  "Property Type": "property_type",
  "Property Status": "property_status",
  "Ownership Status": "ownership_status",
  "Number of Units": "no_of_units",
  "Description": "description",
  
  // Location Information
  "Address": "address",
  "Street Number": "street_number",
  "Street Name": "street_name",
  "Cadastral Number": "cadastral_number",
  "City": "city",
  "Municipality": "municipality",
  
  // Pricing
  "Price": "price",
  "Unit Size": "unit_size",
  
  // Owner Information
  "Owner Name": "owner_name",
  "Phone Number": "phone_number",
  "Email": "email",
  "Owner Address": "owner_address",
  
  // Building Details
  "Contract Type": "contract_type",
  "Location Map URL": "location_map_url",
  "Year Built": "year_built",
  "Building Type": "building_type",
  "Construction Type": "construction_type",
  "Building Stories": "building_stories",
  "Land Area": "land_area",
  "Number of Garages": "no_of_garages",
  "Number of Parking Places": "no_of_parking_places",
  "Parking Surface": "parking_surface",
  
  // Building Systems
  "Responsibility of Heating": "responsibility_of_heating",
  "Heating System": "heating_system",
  "Responsible of Hot Water": "responsible_of_hot_water",
  "Hot Water System": "hot_water_system",
  "Responsibility of Appliances": "responsibility_of_appliances",
  "Electrical Panels": "electrical_panels",
  "Plumbing": "plumbing",
  "Washer/Dryer Installation": "washer_dryer_installation",
  "Laundry": "laundry",
  
  // Building Condition
  "Condition of Roof": "condition_of_roof",
  "Condition of Kitchens": "condition_of_kitchens",
  "Condition of Bathrooms": "condition_of_bathrooms",
  "Condition of Flooring": "condition_of_flooring",
  "Condition of Balconies": "condition_of_balconies",
  "Condition of Doors": "condition_of_doors",
  "Condition of Windows": "condition_of_windows",
  "Siding": "siding",
  
  // Building Features
  "Intercom System": "intercom_system",
  "Fire Alarm System": "fire_alarm_system",
  "Janitor Agreement": "janitor_agreement",
  
  // Studies and Reports
  "Environmental Study": "environmental_study",
  "Environmental Study Date": "environmental_study_date",
  "Rooftop Year": "recent_capital_expenditures.rooftop_year",
  "Furnace/Hot Water Tank Year": "recent_capital_expenditures.furnace_hot_water_tank_year",
  "Other Expenditures": "recent_capital_expenditures.other_expenditures",
  
  // Municipal Assessment
  "Municipal Assessment Land": "municipal_assessment_land",
  "Municipal Assessment Building": "municipal_assessment_building",
  "Total Municipal Evaluation": "total_municipal_evaluation",
  
  // Revenue - Residential
  "Residential Yearly": "revenue.residential.yearly",
  "Residential Percentage GR": "revenue.residential.percentage_gr",
  "Residential Monthly Per Unit": "revenue.residential.monthly_per_unit",
  
  // Revenue - Commercial
  "Commercial Yearly": "revenue.commercial.yearly",
  "Commercial Percentage GR": "revenue.commercial.percentage_gr",
  "Commercial Monthly Per Unit": "revenue.commercial.monthly_per_unit",
  
  // Revenue - Parking
  "Parking Yearly": "revenue.parking.yearly",
  "Parking Percentage GR": "revenue.parking.percentage_gr",
  "Parking Monthly Per Unit": "revenue.parking.monthly_per_unit",
  
  // Revenue - Laundry
  "Laundry Yearly": "revenue.laundry.yearly",
  "Laundry Percentage GR": "revenue.laundry.percentage_gr",
  "Laundry Monthly Per Unit": "revenue.laundry.monthly_per_unit",
  
  // Revenue - Storage
  "Storage Yearly": "revenue.storage.yearly",
  "Storage Percentage GR": "revenue.storage.percentage_gr",
  "Storage Monthly Per Unit": "revenue.storage.monthly_per_unit",
  
  // Total Income
  "Total Gross Income": "revenue.total_gross_income",
  "Gross Income Per Unit": "revenue.gross_income_per_unit",
  
  // Expenses - Vacancy
  "Vacancy/Bad Debt Assessment": "expenses.vacancy_bad_debt.assessment",
  "Vacancy/Bad Debt Percentage GR": "expenses.vacancy_bad_debt.percentage_gr",
  "Vacancy/Bad Debt Cost Per Unit": "expenses.vacancy_bad_debt.cost_per_unit",
  
  // Expenses - Administration
  "Administration Assessment": "expenses.administration.assessment",
  "Administration Percentage GR": "expenses.administration.percentage_gr",
  "Administration Cost Per Unit": "expenses.administration.cost_per_unit",
  
  // Expenses - Municipal Taxes
  "Municipal Taxes Assessment": "expenses.municipal_taxes.assessment",
  "Municipal Taxes Percentage GR": "expenses.municipal_taxes.percentage_gr",
  "Municipal Taxes Cost Per Unit": "expenses.municipal_taxes.cost_per_unit",
  
  // Expenses - School Taxes
  "School Taxes Assessment": "expenses.school_taxes.assessment",
  "School Taxes Percentage GR": "expenses.school_taxes.percentage_gr",
  "School Taxes Cost Per Unit": "expenses.school_taxes.cost_per_unit",
  
  // Expenses - Insurance
  "Insurance Assessment": "expenses.insurance.assessment",
  "Insurance Percentage GR": "expenses.insurance.percentage_gr",
  "Insurance Cost Per Unit": "expenses.insurance.cost_per_unit",
  
  // Expenses - Electricity
  "Electricity Assessment": "expenses.electricity.assessment",
  "Electricity Percentage GR": "expenses.electricity.percentage_gr",
  "Electricity Cost Per Unit": "expenses.electricity.cost_per_unit",
  
  // Expenses - Heating
  "Heating Assessment": "expenses.heating.assessment",
  "Heating Percentage GR": "expenses.heating.percentage_gr",
  "Heating Cost Per Unit": "expenses.heating.cost_per_unit",
  
  // Expenses - Snow Removal
  "Snow Removal Assessment": "expenses.snow_removal.assessment",
  "Snow Removal Percentage GR": "expenses.snow_removal.percentage_gr",
  "Snow Removal Cost Per Unit": "expenses.snow_removal.cost_per_unit",
  
  // Expenses - Elevator
  "Elevator Assessment": "expenses.elevator.assessment",
  "Elevator Percentage GR": "expenses.elevator.percentage_gr",
  "Elevator Cost Per Unit": "expenses.elevator.cost_per_unit",
  
  // Expenses - Equipment Rental
  "Equipment Rental Assessment": "expenses.equipment_rental.assessment",
  "Equipment Rental Percentage GR": "expenses.equipment_rental.percentage_gr",
  "Equipment Rental Cost Per Unit": "expenses.equipment_rental.cost_per_unit",
  
  // Expenses - Maintenance Reserve
  "Maintenance Reserve Assessment": "expenses.maintenance_reserve.assessment",
  "Maintenance Reserve Percentage GR": "expenses.maintenance_reserve.percentage_gr",
  "Maintenance Reserve Cost Per Unit": "expenses.maintenance_reserve.cost_per_unit",
  
  // Expenses - Wages/Janitor
  "Wages/Janitor Assessment": "expenses.wages_janitor.assessment",
  "Wages/Janitor Percentage GR": "expenses.wages_janitor.percentage_gr",
  "Wages/Janitor Cost Per Unit": "expenses.wages_janitor.cost_per_unit",
  
  // Expenses - Furniture Reserve
  "Furniture Reserve Assessment": "expenses.furniture_reserve.assessment",
  "Furniture Reserve Percentage GR": "expenses.furniture_reserve.percentage_gr",
  "Furniture Reserve Cost Per Unit": "expenses.furniture_reserve.cost_per_unit",
  
  // Total Expenses and Net Income
  "Total Expenses": "expenses.total_expenses",
  "Total Expenses Per Unit": "expenses.total_expenses_per_unit",
  "Net Income": "financial_analysis.net_income",
  "Net Income Per Unit": "financial_analysis.net_income_per_unit",
  "Cap Rate": "financial_analysis.cap_rate",
  "Gross Income Multiplier": "financial_analysis.gross_income_multiplier",
  "Suggested Market Price": "financial_analysis.suggested_market_price",
  "Price Per Unit": "financial_analysis.price_per_unit",
  
  // Financing - CMHC Loan Option
  "CMHC Loan Option Institution": "financing.institution.cmhc_loan_option",
  "CMHC Loan Option Rate": "financing.rate.cmhc_loan_option",
  "CMHC Loan Option Amortization": "financing.amortization.cmhc_loan_option",
  "CMHC Loan Option Term": "financing.term.cmhc_loan_option",
  "CMHC Loan Option Amount": "financing.loan_amount.cmhc_loan_option",
  "CMHC Loan Option Down Payment": "financing.down_payment.cmhc_loan_option",
  
  // Financing - Current Mortgage
  "Current Mortgage Institution": "financing.institution.current_mortgage",
  "Current Mortgage Rate": "financing.rate.current_mortgage",
  "Current Mortgage Amortization": "financing.amortization.current_mortgage",
  "Current Mortgage Term": "financing.term.current_mortgage",
  "Current Mortgage Loan Amount": "financing.loan_amount.current_mortgage",
  "Current Mortgage Down Payment": "financing.down_payment.current_mortgage",
  
  // Financial Analysis - Net Income
  "Net Income - Current Mortgage": "cash_flow.net_income.current_mortgage",
  "Net Income - CMHC Loan Option": "cash_flow.net_income.cmhc_loan_option",
  
  // Financial Analysis - Annual Mortgage Cost
  "Annual Mortgage Cost - Current Mortgage": "cash_flow.annual_mortgage_cost.current_mortgage",
  "Annual Mortgage Cost - CMHC Loan Option": "cash_flow.annual_mortgage_cost.cmhc_loan_option",
  
  // Financial Analysis - Net Cash After Mortgage
  "Net Cash After Mortgage - Current Mortgage": "cash_flow.net_cash_after_mortgage.current_mortgage",
  "Net Cash After Mortgage - CMHC Loan Option": "cash_flow.net_cash_after_mortgage.cmhc_loan_option",
  
  // Financial Analysis - Cash on Cash Return
  "Cash on Cash Return - Current Mortgage": "roi_analysis.cash_on_cash_return.current_mortgage",
  "Cash on Cash Return - CMHC Loan Option": "roi_analysis.cash_on_cash_return.cmhc_loan_option",
  
  // Financial Analysis - Cash Plus Principal
  "Cash Plus Principal - Current Mortgage": "roi_analysis.cash_plus_principal.current_mortgage",
  "Cash Plus Principal - CMHC Loan Option": "roi_analysis.cash_plus_principal.cmhc_loan_option",
  
  // Financial Analysis - IRR with Market Appreciation
  "IRR with Market Appreciation - Current Mortgage": "roi_analysis.irr_with_market_appreciation.current_mortgage",
  "IRR with Market Appreciation - CMHC Loan Option": "roi_analysis.irr_with_market_appreciation.cmhc_loan_option",
  
  // Additional Information
  "Broker": "assigned_to",
  "Other Information": "other_information"
};