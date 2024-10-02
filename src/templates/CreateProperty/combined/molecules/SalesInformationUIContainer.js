import SalesInformationUI from "../../ui/molecules/SalesInformationUI";

const SalesInformation = ({
  register,
  control,
  salesPerson,
  clients,
  errors,
  loading,
  getValues,
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
    />
  );
};

export default SalesInformation;
