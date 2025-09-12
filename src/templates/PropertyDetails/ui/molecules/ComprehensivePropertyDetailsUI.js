import { Icon } from "@iconify/react/dist/iconify.js";
import { 
  Home, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar, 
  Building, 
  Car, 
  Wifi, 
  Shield, 
  Thermometer, 
  Droplets, 
  Zap, 
  Wrench, 
  CheckCircle,
  Star,
  Phone,
  Mail,
  Navigation,
  FileText,
  TrendingUp,
  Calculator,
  CreditCard,
  PieChart
} from "lucide-react";
import { formatCurrency } from "../../../../libs/utils/pdfFormats";

const ComprehensivePropertyDetailsUI = ({ propertyDetails }) => {
  if (!propertyDetails) return null;

  const getStatusColor = (status) => {
    const colors = {
      'available': 'bg-green-100 text-green-800',
      'under contract': 'bg-yellow-100 text-yellow-800',
      'leased': 'bg-blue-100 text-blue-800',
      'coming soon': 'bg-purple-100 text-purple-800',
      'withdrawn': 'bg-gray-100 text-gray-800',
      'sold': 'bg-red-100 text-red-800',
      'expired': 'bg-orange-100 text-orange-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getConditionColor = (condition) => {
    if (!condition) return 'text-gray-500';
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes('excellent') || conditionLower.includes('new')) return 'text-green-600';
    if (conditionLower.includes('good') || conditionLower.includes('fair')) return 'text-primary-default';
    if (conditionLower.includes('poor') || conditionLower.includes('needs')) return 'text-red-600';
    return 'text-gray-900';
  };

  return (
    <div className="space-y-8">
      {/* Property Header */}
      <div className="bg-black-500 text-white rounded-xl p-6 border border-primary-default mt-4">
          <div className="flex justify-between items-center max-sm:flex-col w-full">
            <div>
            <h1 className="text-2xl text-white">{propertyDetails.title}</h1>
            <div className="flex items-center text-primary-default my-2">
            <Icon
          icon="heroicons-outline:map-pin"
          className="text-primary-default mr-2 text-lg"
        />
              <span className="text-sm">{propertyDetails.address + " " + propertyDetails.street_name + " " + propertyDetails.street_number + " " + propertyDetails.city}</span>
            </div>
            </div>
            <div className="flex items-center space-x-4 text-white">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(propertyDetails.property_status)}`}>
                {propertyDetails.property_status}
              </span>
              <span className="text-2xl font-bold text-white">
                {formatCurrency(propertyDetails.price)}
              </span>
            </div>
          </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Building className="w-6 h-6 text-primary-default mr-3" />
            <div>
              <p className="text-sm text-gray-600">Property Type</p>
              <p className="font-medium text-gray-900 capitalize">{propertyDetails.property_type}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Home className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Units</p>
              <p className="font-medium text-gray-900">{propertyDetails.no_of_units || "N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <MapPin className="w-6 h-6 text-purple-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Land Area</p>
              <p className="font-medium text-gray-900">{propertyDetails.land_area || "N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-orange-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Year Built</p>
              <p className="font-medium text-gray-900">{propertyDetails.year_built || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {propertyDetails.description && (
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary-default" />
            Property Description
          </h3>
          <p className="text-gray-700 leading-relaxed">{propertyDetails.description}</p>
        </div>
      )}

      {/* Building Specifications */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Building className="w-5 h-5 mr-2 text-primary-default" />
          Building Specifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600">Building Type</label>
              <p className="text-gray-900">{propertyDetails.building_type || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Construction Type</label>
              <p className="text-gray-900">{propertyDetails.construction_type || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Building Stories</label>
              <p className="text-gray-900">{propertyDetails.building_stories || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Unit Size</label>
              <p className="text-gray-900">{propertyDetails.unit_size || "N/A"}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600">Ownership Status</label>
              <p className="text-gray-900 capitalize">{propertyDetails.ownership_status || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Contract Type</label>
              <p className="text-gray-900 capitalize">{propertyDetails.contract_type || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Municipality</label>
              <p className="text-gray-900">{propertyDetails.municipality || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">City</label>
              <p className="text-gray-900">{propertyDetails.city || "N/A"}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600">Street Number</label>
              <p className="text-gray-900 text-sm">{propertyDetails.street_number || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Street Name</label>
              <p className="text-gray-900 text-sm">{propertyDetails.street_name || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Cadastral Number</label>
              <p className="text-gray-900 text-sm">{propertyDetails.cadastral_number || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Parking & Garages */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Car className="w-5 h-5 mr-2 text-primary-default" />
          Parking & Garages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-sm">
            <label className="font-medium text-gray-600">Number of Garages</label>
            <p className="text-gray-900 text-sm font-semibold">{propertyDetails.no_of_garages || "N/A"}</p>
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-600">Parking Places</label>
            <p className="text-gray-900 text-sm font-semibold">{propertyDetails.no_of_parking_places || "N/A"}</p>
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-600">Parking Surface</label>
            <p className="text-gray-900 text-sm">{propertyDetails.parking_surface || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Utilities & Systems */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Zap className="w-5 h-5 mr-2 text-primary-default" />
          Utilities & Systems
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600 flex items-center">
                <Thermometer className="w-4 h-4 mr-1" />
                Heating System
              </label>
              <p className="text-gray-900">{propertyDetails.heating_system || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Heating Responsibility</label>
              <p className="text-gray-900">{propertyDetails.responsibility_of_heating || "N/A"}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600 flex items-center">
                <Droplets className="w-4 h-4 mr-1" />
                Hot Water System
              </label>
              <p className="text-gray-900">{propertyDetails.hot_water_system || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Hot Water Responsibility</label>
              <p className="text-gray-900">{propertyDetails.responsible_of_hot_water || "N/A"}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600 flex items-center">
                <Wrench className="w-4 h-4 mr-1" />
                Electrical Panels
              </label>
              <p className="text-gray-900">{propertyDetails.electrical_panels || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Plumbing</label>
              <p className="text-gray-900">{propertyDetails.plumbing || "N/A"}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-sm">
            <label className="font-medium text-gray-600">Appliances Responsibility</label>
            <p className="text-gray-900">{propertyDetails.responsibility_of_appliances || "N/A"}</p>
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-600">Washer/Dryer Installation</label>
            <p className="text-gray-900">{propertyDetails.washer_dryer_installation || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Building Conditions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-primary-default" />
          Building Conditions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600">Roof Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_roof)}`}>
                {propertyDetails.condition_of_roof || "N/A"}
              </p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Kitchen Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_kitchens)}`}>
                {propertyDetails.condition_of_kitchens || "N/A"}
              </p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Bathroom Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_bathrooms)}`}>
                {propertyDetails.condition_of_bathrooms || "N/A"}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600">Flooring Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_flooring)}`}>
                {propertyDetails.condition_of_flooring || "N/A"}
              </p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Balcony Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_balconies)}`}>
                {propertyDetails.condition_of_balconies || "N/A"}
              </p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Door Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_doors)}`}>
                {propertyDetails.condition_of_doors || "N/A"}
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600">Window Condition</label>
              <p className={`font-medium ${getConditionColor(propertyDetails.condition_of_windows)}`}>
                {propertyDetails.condition_of_windows || "N/A"}
              </p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Siding</label>
              <p className="text-gray-900">{propertyDetails.siding || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Building Features */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-primary-default" />
          Building Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-sm">
            <label className="font-medium text-gray-600">Intercom System</label>
            <p className="text-gray-900">{propertyDetails.intercom_system || "N/A"}</p>
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-600">Fire Alarm System</label>
            <p className="text-gray-900">{propertyDetails.fire_alarm_system || "N/A"}</p>
          </div>
          <div className="text-sm">
            <label className="font-medium text-gray-600">Janitor Agreement</label>
            <p className="text-gray-900">{propertyDetails.janitor_agreement || "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Financial Information */}
      {(propertyDetails.revenue || propertyDetails.expenses || propertyDetails.financial_analysis) && (
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary-default" />
            Financial Information
          </h3>
          
          {/* Revenue Section */}
          {propertyDetails.revenue && (
            <div className="mb-8">
              <h4 className="text-base font-semibold text-gray-600 mb-4 flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                Revenue Breakdown
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {propertyDetails.revenue.residential && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-800 mb-2 text-base">Residential</h5>
                    <p className="text-sm text-green-700">Yearly: {formatCurrency(propertyDetails.revenue.residential.yearly)}</p>
                    <p className="text-sm text-green-700">Monthly/Unit: {formatCurrency(propertyDetails.revenue.residential.monthly_per_unit)}</p>
                  </div>
                )}
                {propertyDetails.revenue.commercial && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-800 mb-2 text-base">Commercial</h5>
                    <p className="text-sm text-blue-700">Yearly: {formatCurrency(propertyDetails.revenue.commercial.yearly)}</p>
                    <p className="text-sm text-blue-700">Monthly/Unit: {formatCurrency(propertyDetails.revenue.commercial.monthly_per_unit)}</p>
                  </div>
                )}
                {propertyDetails.revenue.parking && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-purple-800 mb-2 text-base">Parking</h5>
                    <p className="text-sm text-purple-700">Yearly: {formatCurrency(propertyDetails.revenue.parking.yearly)}</p>
                    <p className="text-sm text-purple-700">Monthly/Unit: {formatCurrency(propertyDetails.revenue.parking.monthly_per_unit)}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2 text-base">Total Gross Income</h5>
                  <p className="text-base font-semibold text-gray-900">{formatCurrency(propertyDetails.revenue.total_gross_income)}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-800 mb-2 text-base">Gross Income Per Unit</h5>
                  <p className="text-base font-semibold text-gray-900">{formatCurrency(propertyDetails.revenue.gross_income_per_unit)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Financial Analysis */}
          {propertyDetails.financial_analysis && (
            <div className="mb-8">
              <h4 className="text-base font-semibold text-gray-600 mb-4 flex items-center">
                <Calculator className="w-4 h-4 mr-2 text-primary-default" />
                Financial Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2 text-base">Net Income</h5>
                  <p className="text-base font-semibold text-blue-900">{formatCurrency(propertyDetails.financial_analysis.net_income)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2 text-base">Cap Rate</h5>
                  <p className="text-base font-semibold text-green-900">{propertyDetails.financial_analysis.cap_rate ? `${propertyDetails.financial_analysis.cap_rate}%` : "N/A"}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2 text-base">Price Per Unit</h5>
                  <p className="text-base font-semibold text-purple-900">{formatCurrency(propertyDetails.financial_analysis.price_per_unit)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Owner Information */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Users className="w-5 h-5 mr-2 text-primary-default" />
          Owner Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-sm">
              <label className=" font-medium text-gray-600">Owner Name</label>
              <p className="text-gray-900 font-semibold">{propertyDetails.owner_name || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600 flex items-center">
                <Phone className="w-4 h-4 mr-1" />
                Phone Number
              </label>
              <p className="text-gray-900">{propertyDetails.phone_number || "N/A"}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="text-sm">
              <label className="font-medium text-gray-600 flex items-center">
                <Mail className="w-4 h-4 mr-1" />
                Email
              </label>
              <p className="text-gray-900">{propertyDetails.email || "N/A"}</p>
            </div>
            <div className="text-sm">
              <label className="font-medium text-gray-600">Owner Address</label>
              <p className="text-gray-900">{propertyDetails.owner_address || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      {propertyDetails.other_information && (
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary-default" />
            Additional Information
          </h3>
          <p className="text-gray-700 leading-relaxed">{propertyDetails.other_information}</p>
        </div>
      )}
    </div>
  );
};

export default ComprehensivePropertyDetailsUI;
