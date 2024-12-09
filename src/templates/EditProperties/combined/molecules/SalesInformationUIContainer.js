import SalesInformationUI from "../../ui/molecules/SalesInformationUI";

const SalesInformation = ({
  register,
  control,
  salesPerson,
  clients,
  errors,
  loading,
  getValues,
  selectedSalesperson,
  selectedClient,
  handleSelectSalesperson,
  handleSelectClient,
}) => {
  return (
    <SalesInformationUI
      register={register}
      control={control}
      salesPerson={salesPerson}
      clients={clients}
      errors={errors}
      loading={loading}
      getValues={getValues}
      selectedSalesperson={selectedSalesperson}
      selectedClient={selectedClient}
      handleSelectSalesperson={handleSelectSalesperson}
      handleSelectClient={handleSelectClient}
    />
  );
};

export default SalesInformation;
