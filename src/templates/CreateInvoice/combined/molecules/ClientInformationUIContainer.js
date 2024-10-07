import ClientInformationUI from "../../ui/molecules/ClientInformationUI";

const ClientInformation = ({
  register,
  errors,
  loading,
  clientName,
  handleSelectClientName,
  clients,
}) => {
  return (
    <ClientInformationUI
      register={register}
      errors={errors}
      loading={loading}
      clientName={clientName}
      handleSelectClientName={handleSelectClientName}
      clients={clients}
    />
  );
};

export default ClientInformation;
