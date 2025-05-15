import SalespersonInformationUI from "../../ui/molecules/SalespersonInformationUI";

const SalespersonInformation = ({
  register,
  errors,
  loading,
  salesPersonName,
  handleSelectSalespersonName,
  salesPersons,
  listingBrokerName,
  handleSelectListingBroker,
  listingBrokers,
  sellingBrokerName,
  handleSelectSellingBroker,
  sellingBrokers,
  user,
}) => {
  return (
    <SalespersonInformationUI
      register={register}
      errors={errors}
      loading={loading}
      salesPersonName={salesPersonName}
      handleSelectSalespersonName={handleSelectSalespersonName}
      salesPersons={salesPersons}
      listingBrokerName = {listingBrokerName}
      handleSelectListingBroker = {handleSelectListingBroker}
      listingBrokers = {listingBrokers}
      sellingBrokerName = {sellingBrokerName}
      handleSelectSellingBroker = {handleSelectSellingBroker}
      sellingBrokers = {sellingBrokers}
      user={user}
    />
  );
};

export default SalespersonInformation;
