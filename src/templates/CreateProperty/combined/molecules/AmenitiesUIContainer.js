import AmenitiesUI from "../../ui/molecules/AmenitiesUI";

const Amenities = ({
  amenities,
  handleSelectAmenities,
  availableFacilities,
}) => {
  return (
    <AmenitiesUI
      amenities={amenities}
      handleSelectAmenities={handleSelectAmenities}
      availableFacilities={availableFacilities}
    />
  );
};

export default Amenities;
