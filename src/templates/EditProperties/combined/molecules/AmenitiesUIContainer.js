import AmenitiesUI from "../../ui/molecules/AmenitiesUI";

const Amenities = ({
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
    <AmenitiesUI
      contract_type={contract_type}
      handleSelectContractType={handleSelectContractType}
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
