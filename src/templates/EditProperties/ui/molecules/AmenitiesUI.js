import ReactSelect from "react-select";

const AmenitiesUI = ({
  contract_type,
  handleSelectContractType,
  availableFacilities,
  errors,
  loading,
  selectedSalespersons,
  handleSelectSalesperson,
  salesPerson,
}) => {
  return (
    <div className="mt-8">
      <h6>Contract Type & Broker</h6>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-[49%]">
          <div className="my-4">
            <div className="my-2 text-sm font-medium">Contract Type</div>
            <ReactSelect
              name="contract_type"
              // isMulti
              value={contract_type}
              onChange={handleSelectContractType}
              options={availableFacilities}
              placeholder="Contract Type"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.contract_type && contract_type.length == 0 && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.contract_type?.message}
              </p>
            )}
          </div>
        </div>
        <div className="w-full md:w-[49%]">
          <div className="my-4">
            <div className="my-2 text-sm font-medium">Broker*</div>
            <ReactSelect
              name="assigned_to"
              isMulti
              value={selectedSalespersons} // Pass the correctly formatted state
              onChange={handleSelectSalesperson}
              options={salesPerson?.map((person) => ({
                label: person.name,
                value: person._id, // Use a unique identifier for the value
              }))}
              placeholder="Broker"
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
