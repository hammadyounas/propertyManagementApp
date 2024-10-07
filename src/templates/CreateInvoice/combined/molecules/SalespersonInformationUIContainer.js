import SalespersonInformationUI from "../../ui/molecules/SalespersonInformationUI";

const SalespersonInformation = ({
  register,
  errors,
  loading,
  salesPersonName,
  handleSelectSalespersonName,
  salesPersons,
}) => {
  return (
    <SalespersonInformationUI
      register={register}
      errors={errors}
      loading={loading}
      salesPersonName={salesPersonName}
      handleSelectSalespersonName={handleSelectSalespersonName}
      salesPersons={salesPersons}
    />
  );
};

export default SalespersonInformation;
