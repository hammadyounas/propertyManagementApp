import AmenitiesUI from "../../ui/molecules/AmenitiesUI";

const Amenities = ({
  amenities,
  handleSelectAmenities,
  availableFacilities,
  errors,
  loading,
}) => {
  return (
    <AmenitiesUI
      amenities={amenities}
      handleSelectAmenities={handleSelectAmenities}
      availableFacilities={availableFacilities}
      errors={errors}
      loading={loading}
    />
  );
};

export default Amenities;
