import ReactSelect from "react-select";

const AmenitiesUI = ({
  amenities,
  handleSelectAmenities,
  availableFacilities,
  errors,
  loading,
}) => {
  return (
    <div className="mt-8">
      <h6>Amenities</h6>
      <div className="my-4">
        <ReactSelect
          name="amenities"
          isMulti
          value={amenities}
          onChange={handleSelectAmenities}
          options={availableFacilities}
          placeholder="Amenities (optional)"
          isDisabled={loading}
        />
        {errors?.amenities && amenities.length == 0 && (
          <p className="text-sm text-danger-500 mt-2">
            {errors?.amenities?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AmenitiesUI;
