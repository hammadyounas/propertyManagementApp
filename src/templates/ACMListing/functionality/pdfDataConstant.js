export const propertyDescriptionLeftColumnFields = [
    { label: 'CADASTRAL NUMBER', key: 'cadastral_number', default: '____________' },
    { label: 'LAND AREA', key: 'land_area', default: '____________' },
    { label: 'NUMBER OF UNITS', key: 'no_of_units', default: '____________' },
    { label: 'NUMBER OF PARKINGS', key: 'no_of_parking_places', default: '____________' },
    { label: 'RESPONSIBILITY OF HEATING', key: 'responsibility_of_heating', default: '____________' },
    { label: 'RESPONSIBLE OF HOT HEATING', key: 'responsible_of_hot_heating', default: '____________' },
    { label: 'RESPONSIBILITY OF APPLIANCES', key: 'responsibility_of_appliances', default: '____________' },
    { label: 'WASHER/DRYER INSTALLATION', key: 'washer_dryer_installation', default: '____________' },
    { label: 'LAUNDRY', key: 'laundry', default: '____________' },
  ];
  
  export const propertyDescriptionRightColumnFields = [
    { label: 'MUNICIPAL ASSESSMENT - LAND', key: 'municipal_assessment_land', default: '____________' },
    { label: 'MUNICIPAL ASSESSMENT - BUILDING', key: 'municipal_assessment_building', default: '____________' },
    { label: 'TOTAL MUNICIPAL EVALUATION', key: 'total_municipal_evaluation', default: '____________' },
    { label: 'YEAR BUILT', key: 'year_built', default: '____________' },
    { label: 'BUILDING TYPE', key: 'property_type', default: '____________' },
    { label: 'CONSTRUCTION TYPE', key: 'construction_type', default: '____________' },
    { label: 'BUILDING STORIES', key: 'building_stories', default: '____________' },
    { label: 'OTHER INFORMATION', key: 'other_information', default: '____________' },
  ];
  
  export const propertyExpendituresLeftColumnFields = [
    { label: 'Heating System', key: 'heating_system', default: '____________' },
    { label: 'Hot Water System', key: 'hot_water_system', default: '____________' },
    { label: 'Electrical Panels', key: 'electrical_panels', default: '____________' },
    { label: 'Plumbing', key: 'plumbing', default: '____________' },
    { label: 'Siding', key: 'siding', default: '____________' },
    { label: 'Parking Surface', key: 'parking_surface', default: '____________' },
    { label: 'Environmental Study', key: 'environmental_study', default: '____________' },
    { label: 'Janitor Agreement', key: 'janitor_agreement', default: '____________' },
    { label: 'Fire Alarm System', key: 'fire_alarm_system', default: '____________' },
  ];

  export const propertyExpendituresRightColumnFields = [
    { label: 'Condition of Roof', key: 'condition_of_roof', default: '____________' },
    { label: 'Condition of the Kitchen', key: 'condition_of_kitchens', default: '____________' },
    { label: 'Condition of the Bathrooms', key: 'condition_of_bathrooms', default: '____________' },
    { label: 'Condition of Flooring', key: 'condition_of_flooring', default: '____________' },
    { label: 'Condition of the Balconies', key: 'condition_of_balconies', default: '____________' },
    { label: 'Condition of Doors', key: 'condition_of_doors', default: '____________' },
    { label: 'Condition of Windows', key: 'condition_of_windows', default: '____________' },
    { label: 'Intercom System', key: 'intercom_system', default: '____________' },
  ];

// financialDataConstant.js

/**
 * Financial data mapper function to transform acmData into structured format
 * @param {Object} acmData - The ACM data object containing base_property
 * @returns {Object} Structured financial data
 */
export const getFinancialData = (acmData) => {
  const baseProperty = acmData?.base_property || {};
  const revenue = baseProperty.revenue || {};
  const expenses = baseProperty.expenses || {};
  const toNumber = (val) => Number(val);

  return {
    revenue: {
      residential: {
        title: 'Residential',
        yearly: toNumber(revenue.residential?.yearly) || 0,
        percentage: toNumber(revenue.residential?.percentage_gr) || 0,
        rpu: toNumber(revenue.residential?.monthly_per_unit) || 0
      },
      commercial: {
        title: 'Commercial',
        yearly: toNumber(revenue.commercial?.yearly) || 0,
        percentage: toNumber(revenue.commercial?.percentage_gr) || 0,
        rpu: toNumber(revenue.commercial?.monthly_per_unit) || 0
      },
      parking: {
        title: 'Parking',
        yearly: toNumber(revenue.parking?.yearly) || 0,
        percentage: toNumber(revenue.parking?.percentage_gr) || 0,
        rpu: toNumber(revenue.parking?.monthly_per_unit) || 0
      },
      laundry: {
        title: 'Laundry',
        yearly: toNumber(revenue.laundry?.yearly) || 0,
        percentage: toNumber(revenue.laundry?.percentage_gr) || 0,
        rpu: toNumber(revenue.laundry?.monthly_per_unit) || 0
      },
      storage: {
        title: 'Storage',
        yearly: toNumber(revenue.storage?.yearly) || 0,
        percentage: toNumber(revenue.storage?.percentage_gr) || 0,
        rpu: toNumber(revenue.storage?.monthly_per_unit) || 0
      },
    },
    totalGrossIncome: {
      title: 'Total Gross Income',
      yearly: toNumber(revenue.total_gross_income) || 0,
      rpu: toNumber(revenue.gross_income_per_unit) || 0
    },
    expenses: {
      vacancy: {
        title: 'Vacancy/Bad Debt',
        assessment: toNumber(expenses.vacancy_bad_debt?.assessment) || 0,
        percentage: toNumber(expenses.vacancy_bad_debt?.percentage_gr) || 0,
        cpu: toNumber(expenses.vacancy_bad_debt?.cost_per_unit) || 0
      },
      administration: {
        title: 'Administration',
        assessment: toNumber(expenses.administration?.assessment) || 0,
        percentage: toNumber(expenses.administration?.percentage_gr) || 0,
        cpu: toNumber(expenses.administration?.cost_per_unit) || 0
      },
      municipalTaxes: {
        title: 'Municipal Taxes',
        assessment: toNumber(expenses.municipal_taxes?.assessment) || 0,
        percentage: toNumber(expenses.municipal_taxes?.percentage_gr) || 0,
        cpu: toNumber(expenses.municipal_taxes?.cost_per_unit) || 0
      },
      schoolTaxes: {
        title: 'School Taxes',
        assessment: toNumber(expenses.school_taxes?.assessment) || 0,
        percentage: toNumber(expenses.school_taxes?.percentage_gr) || 0,
        cpu: toNumber(expenses.school_taxes?.cost_per_unit) || 0
      },
      insurance: {
        title: 'Insurance',
        assessment: toNumber(expenses.insurance?.assessment) || 0,
        percentage: toNumber(expenses.insurance?.percentage_gr) || 0,
        cpu: toNumber(expenses.insurance?.cost_per_unit) || 0
      },
      electricity: {
        title: 'Electricity',
        assessment: toNumber(expenses.electricity?.assessment) || 0,
        percentage: toNumber(expenses.electricity?.percentage_gr) || 0,
        cpu: toNumber(expenses.electricity?.cost_per_unit) || 0
      },
      heating: {
        title: 'Heating',
        assessment: toNumber(expenses.heating?.assessment) || 0,
        percentage: toNumber(expenses.heating?.percentage_gr) || 0,
        cpu: toNumber(expenses.heating?.cost_per_unit) || 0
      },
      snowRemoval: {
        title: 'Snow Removal',
        assessment: toNumber(expenses.snow_removal?.assessment) || 0,
        percentage: toNumber(expenses.snow_removal?.percentage_gr) || 0,
        cpu: toNumber(expenses.snow_removal?.cost_per_unit) || 0
      },
      elevator: {
        title: 'Elevator',
        assessment: toNumber(expenses.elevator?.assessment) || 0,
        percentage: toNumber(expenses.elevator?.percentage_gr) || 0,
        cpu: toNumber(expenses.elevator?.cost_per_unit) || 0
      },
      equipmentRental: {
        title: 'Equipment Rental',
        assessment: toNumber(expenses.equipment_rental?.assessment) || 0,
        percentage: toNumber(expenses.equipment_rental?.percentage_gr) || 0,
        cpu: toNumber(expenses.equipment_rental?.cost_per_unit) || 0
      },
      maintenanceReserve: {
        title: 'Maintenance Reserve',
        assessment: toNumber(expenses.maintenance_reserve?.assessment) || 0,
        percentage: toNumber(expenses.maintenance_reserve?.percentage_gr) || 0,
        cpu: toNumber(expenses.maintenance_reserve?.cost_per_unit) || 0
      },
      wagesJanitor: {
        title: 'Wages/Janitor',
        assessment: toNumber(expenses.wages_janitor?.assessment) || 0,
        percentage: toNumber(expenses.wages_janitor?.percentage_gr) || 0,
        cpu: toNumber(expenses.wages_janitor?.cost_per_unit) || 0
      },
      furnitureReserve: {
        title: 'Furniture Reserve',
        assessment: toNumber(expenses.furniture_reserve?.assessment) || 0,
        percentage: toNumber(expenses.furniture_reserve?.percentage_gr) || 0,
        cpu: toNumber(expenses.furniture_reserve?.cost_per_unit) || 0
      }
    },
    totalExpenses: {
      title: 'Total Expenses',
      amount: toNumber(expenses.total_expenses) || 0,
      cpu: toNumber(expenses.total_expenses_per_unit) || 0
    },
    netIncome: {
      title: 'Net Income',
      amount: toNumber(expenses.net_income) || 0,
      cpu: toNumber(expenses.net_income_per_unit) || 0,
      percentage: toNumber(expenses.net_income_percentage) || 0
    }
  };
};

/**
 * Revenue configuration for consistent mapping
 */
export const REVENUE_CONFIG = [
  'residential',
  'commercial',
  'parking',
  'laundry',
  'storage'
];

/**
 * Expenses configuration for consistent mapping
 */
export const EXPENSES_CONFIG = [
  'vacancy',
  'administration',
  'municipalTaxes',
  'schoolTaxes',
  'insurance',
  'electricity',
  'heating',
  'snowRemoval',
  'elevator',
  'equipmentRental',
  'maintenanceReserve',
  'wagesJanitor',
  'furnitureReserve'
];


export const getFinancingData = (acmData) => {
  const baseProperty = acmData?.base_property || {};
  const financing = baseProperty.financing || {};
  const cash_flow = baseProperty.cash_flow || {};
  const roi_analysis = baseProperty.roi_analysis || {};
  const financial_analysis = baseProperty.financial_analysis || {};
  const toNumber = (val) => Number(val);

  return {
    financing: {
      institution: {
        title: 'Institution',
        cmhc_loan_option: financing.institution?.cmhc_loan_option || '',
        current_mortgage: financing.institution?.current_mortgage || '',
        format: 'string'
      },
      rate: {
        title: 'Rate',
        cmhc_loan_option: toNumber(financing.rate?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.rate?.current_mortgage) || 0,
        format: 'percent'
      },
      amortization: {
        title: 'Amortization',
        cmhc_loan_option: toNumber(financing.amortization?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.amortization?.current_mortgage) || 0,
        format: 'number'
      },
      term: {
        title: 'Term',
        cmhc_loan_option: toNumber(financing.term?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.term?.current_mortgage) || 0,
        format: 'number'
      },
      cap_rate: {
        title: 'Cap Rate',
        cmhc_loan_option: toNumber(financing.cap_rate?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.cap_rate?.current_mortgage) || 0,
        format: 'percent'
      },
      loan_amount: {
        title: 'Loan Amount',
        cmhc_loan_option: toNumber(financing.loan_amount?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.loan_amount?.current_mortgage) || 0,
        format: 'currency'
      },
      loan_to_value_percentage: {
        title: 'Loan to Value %',
        cmhc_loan_option: toNumber(financing.loan_to_value_percentage?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.loan_to_value_percentage?.current_mortgage) || 0,
        format: 'percent'
      },
      debt_coverage_ratio: {
        title: 'Debt Coverage Ratio',
        cmhc_loan_option: toNumber(financing.debt_coverage_ratio?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.debt_coverage_ratio?.current_mortgage) || 0,
        format: 'number'
      },
      down_payment: {
        title: 'Down Payment',
        cmhc_loan_option: toNumber(financing.down_payment?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(financing.down_payment?.current_mortgage) || 0,
        format: 'currency'
      },
    },
    cash_flow: {
      net_income: {
        title: 'Net Income',
        cmhc_loan_option: toNumber(cash_flow.net_income?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(cash_flow.net_income?.current_mortgage) || 0,
        format: 'currency'
      },
      annual_mortgage_cost: {
        title: 'Annual Mortgage Cost',
        cmhc_loan_option: toNumber(cash_flow.annual_mortgage_cost?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(cash_flow.annual_mortgage_cost?.current_mortgage) || 0,
        format: 'currency'
      },
      net_cash_after_mortgage: {
        title: 'Net Cash After Mortgage',
        cmhc_loan_option: toNumber(cash_flow.net_cash_after_mortgage?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(cash_flow.net_cash_after_mortgage?.current_mortgage) || 0,
        format: 'currency'
      },
    },
    roi_analysis: {
      cash_on_cash_return: {
        title: 'Cash on Cash Return',
        cmhc_loan_option: toNumber(roi_analysis.cash_on_cash_return?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(roi_analysis.cash_on_cash_return?.current_mortgage) || 0,
        format: 'percent'
      },
      cash_plus_principal: {
        title: 'Cash + Principal',
        cmhc_loan_option: toNumber(roi_analysis.cash_plus_principal?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(roi_analysis.cash_plus_principal?.current_mortgage) || 0,
        format: 'percent'
      },
      irr_with_market_appreciation: {
        title: 'IRR WITH 2% MARKET APPRECIATION',
        cmhc_loan_option: toNumber(roi_analysis.irr_with_market_appreciation?.cmhc_loan_option) || 0,
        current_mortgage: toNumber(roi_analysis.irr_with_market_appreciation?.current_mortgage) || 0,
        format: 'percent'
      },
    },
    financial_analysis: {
      suggested_market_price: toNumber(financial_analysis?.suggested_market_price) || 0,
      ppu: toNumber(financial_analysis?.price_per_unit) || 0,
      gim: toNumber(financial_analysis?.gross_income_multiplier) || 0,
      format: 'currency'
    }
  };
};

export const FINANCING_CONFIG = [
  'institution',
  'rate',
  'amortization',
  'term',
  'cap_rate',
  'loan_amount',
  'loan_to_value_percentage',
  'debt_coverage_ratio',
  'down_payment'
];

export const CASH_FLOW_CONFIG = [
  'net_income',
  'annual_mortgage_cost',
  'net_cash_after_mortgage'
];

export const ROI_ANALYSIS_CONFIG = [  
  'cash_on_cash_return',
  'cash_plus_principal',
  'irr_with_market_appreciation'
];

export const getSoldPropertiesData = (acmData) => {
  const baseProperty = acmData?.base_property || {};
  const compareProperties = acmData?.compare_property || [];

  const toNumber = (val) => Number(val) || 0;

  const formatProperty = (property) => ({
    address: property?.address || '',
    street_name: property?.street_name || '',
    street_number: property?.street_number || '',
    city: property?.city || '',
    price: toNumber(property?.price),
    date_sold: property?.createdAt || '',
    cost_per_unit: toNumber(property?.expenses?.total_expenses_per_unit),
    gross_income_multiplier: toNumber(property?.financial_analysis?.gross_income_multiplier),
    cap_rate: toNumber(property?.financial_analysis?.cap_rate),
    no_of_units: toNumber(property?.no_of_units),
    unit_size: toNumber(property?.unit_size),
    year_of_construction: toNumber(property?.year_built),
    heating_responsibility: property?.responsibility_of_heating || '',
    hot_water_responsibility: property?.responsible_of_hot_heating || '',
    distance: property?.distance || '', // Added missing distance field
    images: property?.images?.[0] || ''
  });

  return {
    propertiesData: [
      formatProperty(baseProperty),
      formatProperty(compareProperties[0] || {}),
      formatProperty(compareProperties[1] || {}),
      formatProperty(compareProperties[2] || {})
    ]
  };
};
