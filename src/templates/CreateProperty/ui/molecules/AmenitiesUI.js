import ReactSelect from "react-select";

const AmenitiesUI = ({
  amenities,
  handleSelectAmenities,
  availableFacilities,
}) => {
  return (
    <div className="mt-8">
      <h6>Amenities</h6>
      <div className="my-4">
        <ReactSelect
          isMulti
          value={amenities}
          onChange={handleSelectAmenities}
          options={availableFacilities}
          placeholder="Amenities"
          // isDisabled={loading}
        />
      </div>
    </div>
  );
};

export default AmenitiesUI;
