import { 
  Wifi, 
  Car, 
  Shield, 
  Thermometer, 
  Droplets, 
  Zap, 
  Home, 
  Building, 
  TreePine, 
  Dumbbell, 
  Utensils, 
  Coffee, 
  Waves, 
  Mountain, 
  Camera, 
  Music, 
  Gamepad2, 
  BookOpen, 
  Heart, 
  Star,
  CheckCircle,
  Plus
} from "lucide-react";

const AmenitiesUI = ({ amenities, propertyDetails }) => {
  // Define amenity icons mapping
  const amenityIcons = {
    'wifi': Wifi,
    'parking': Car,
    'security': Shield,
    'heating': Thermometer,
    'hot water': Droplets,
    'electricity': Zap,
    'furnished': Home,
    'unfurnished': Home,
    'semi furnished': Home,
    'garden': TreePine,
    'gym': Dumbbell,
    'restaurant': Utensils,
    'cafe': Coffee,
    'pool': Waves,
    'mountain view': Mountain,
    'balcony': Camera,
    'sound system': Music,
    'gaming room': Gamepad2,
    'library': BookOpen,
    'spa': Heart,
    'premium': Star,
    'laundry': Droplets,
    'elevator': Building,
    'intercom': Shield,
    'fire alarm': Shield,
    'janitor': Building
  };

  // Generate comprehensive amenities from property details
  const generateAmenitiesFromProperty = (property) => {
    const generatedAmenities = [];
    
    if (!property) return generatedAmenities;

    // Building features
    if (property.intercom_system) generatedAmenities.push('Intercom System');
    if (property.fire_alarm_system) generatedAmenities.push('Fire Alarm System');
    if (property.janitor_agreement) generatedAmenities.push('Janitor Service');
    
    // Utilities
    if (property.heating_system) generatedAmenities.push('Heating System');
    if (property.hot_water_system) generatedAmenities.push('Hot Water System');
    if (property.electrical_panels) generatedAmenities.push('Electrical System');
    if (property.plumbing) generatedAmenities.push('Plumbing System');
    
    // Parking
    if (property.no_of_garages > 0) generatedAmenities.push(`${property.no_of_garages} Garage${property.no_of_garages > 1 ? 's' : ''}`);
    if (property.no_of_parking_places > 0) generatedAmenities.push(`${property.no_of_parking_places} Parking Space${property.no_of_parking_places > 1 ? 's' : ''}`);
    
    // Building conditions (if in good condition, treat as amenity)
    if (property.condition_of_kitchens?.toLowerCase().includes('excellent') || 
        property.condition_of_kitchens?.toLowerCase().includes('good')) {
      generatedAmenities.push('Modern Kitchen');
    }
    if (property.condition_of_bathrooms?.toLowerCase().includes('excellent') || 
        property.condition_of_bathrooms?.toLowerCase().includes('good')) {
      generatedAmenities.push('Modern Bathroom');
    }
    if (property.condition_of_flooring?.toLowerCase().includes('excellent') || 
        property.condition_of_flooring?.toLowerCase().includes('good')) {
      generatedAmenities.push('Quality Flooring');
    }
    
    // Ownership and contract type
    if (property.ownership_status === 'freehold') generatedAmenities.push('Freehold Ownership');
    if (property.contract_type === 'on market') generatedAmenities.push('On Market');
    
    // Property type specific amenities
    if (property.property_type === 'apartment') generatedAmenities.push('Apartment Living');
    if (property.property_type === 'house') generatedAmenities.push('House Living');
    if (property.property_type === 'commercial') generatedAmenities.push('Commercial Space');
    
    return generatedAmenities;
  };

  // Combine provided amenities with generated ones
  const allAmenities = [
    ...(amenities || []),
    ...generateAmenitiesFromProperty(propertyDetails)
  ];

  // Remove duplicates
  const uniqueAmenities = [...new Set(allAmenities)];

  const getAmenityIcon = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    
    // Check for specific matches first
    for (const [key, icon] of Object.entries(amenityIcons)) {
      if (amenityLower.includes(key)) {
        return icon;
      }
    }
    
    // Default icon
    return CheckCircle;
  };

  const getAmenityColor = (amenity) => {
    const amenityLower = amenity.toLowerCase();
    
    if (amenityLower.includes('garage') || amenityLower.includes('parking')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (amenityLower.includes('kitchen') || amenityLower.includes('bathroom')) return 'bg-green-100 text-green-800 border-green-200';
    if (amenityLower.includes('heating') || amenityLower.includes('hot water')) return 'bg-orange-100 text-orange-800 border-orange-200';
    if (amenityLower.includes('security') || amenityLower.includes('fire') || amenityLower.includes('intercom')) return 'bg-red-100 text-red-800 border-red-200';
    if (amenityLower.includes('modern') || amenityLower.includes('quality')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (amenityLower.includes('ownership') || amenityLower.includes('market')) return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!uniqueAmenities || uniqueAmenities.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-primary-default" />
          Amenities & Features
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
          <p className="text-gray-500">No amenities information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Star className="w-5 h-5 mr-2 text-primary-default" />
        Amenities & Features
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {uniqueAmenities.map((amenity, index) => {
          const IconComponent = getAmenityIcon(amenity);
          const colorClass = getAmenityColor(amenity);
          
          return (
            <div
              key={index}
              className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md hover:scale-105 ${colorClass}`}
            >
              <div className="flex-shrink-0 mr-3">
                <IconComponent className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{amenity}</p>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            <span className="font-medium">{uniqueAmenities.length}</span> amenities available
          </p>
          <div className="flex items-center text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 mr-1" />
            All amenities verified
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesUI;
