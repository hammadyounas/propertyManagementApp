import AmenitiesUI from "../../ui/molecules/AmenitiesUI";

const Amenities = ({
  amenities,
  handleSelectAmenities,
  availableFacilities,
  errors,
  loading,
  selectedSalespersons,
  handleSelectSalesperson,
  salesPerson,
}) => {
  return (
    <AmenitiesUI
      amenities={amenities}
      handleSelectAmenities={handleSelectAmenities}
      availableFacilities={availableFacilities}
      errors={errors}
      loading={loading}
      selectedSalespersons={selectedSalespersons}
      handleSelectSalesperson={handleSelectSalesperson}
      salesPerson={salesPerson}
    />
  );
};

export default Amenities;
