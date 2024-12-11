import ReactSelect from "react-select";

const AmenitiesUI = ({
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
    <div className="mt-8">
      <h6>Amenities & Salesperson</h6>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-[49%]">
          <div className="my-4">
            <div className="my-2 text-sm font-medium">Amenities (Optional)</div>
            <ReactSelect
              name="amenities"
              isMulti
              value={amenities}
              onChange={handleSelectAmenities}
              options={availableFacilities}
              placeholder="Amenities"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.amenities && amenities.length == 0 && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.amenities?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-[49%]">
          <div className="my-4">
            <div className="my-2 text-sm font-medium">Salesperson*</div>
            <ReactSelect
              name="assigned_to"
              isMulti
              value={selectedSalespersons} // Pass the correctly formatted state
              onChange={handleSelectSalesperson}
              options={salesPerson.map((person) => ({
                label: person.name,
                value: person._id, // Use a unique identifier for the value
              }))}
              placeholder="Salesperson"
              isDisabled={loading}
              className="text-sm"
            />

            {errors?.assigned_to && selectedSalespersons.length == 0 && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.assigned_to?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesUI;
