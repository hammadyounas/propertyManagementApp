import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";

const CreateClientPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    push,
    status,
    handleSelectStatus,
    clientType,
    handleSelectClientType,
    salesPersonAssigned,
    handleSelectAssignedSalesperson,
    communicationChannels,
    handleSelectCommunicationChannel,
    clientStatus,
    clientTypes,
    preferredCommunicationChannels,
    salesPersons,
    handleFileUpload,
    handleRemoveCSV,
    csvData,
    getInputProps,
    getRootProps,
    acceptedFiles,
    inputType,
    setInputType,
  } = useForm();
  return (
    <FormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
      status={status}
      handleSelectStatus={handleSelectStatus}
      clientType={clientType}
      handleSelectClientType={handleSelectClientType}
      salesPersonAssigned={salesPersonAssigned}
      handleSelectAssignedSalesperson={handleSelectAssignedSalesperson}
      communicationChannels={communicationChannels}
      handleSelectCommunicationChannel={handleSelectCommunicationChannel}
      clientStatus={clientStatus}
      clientTypes={clientTypes}
      preferredCommunicationChannels={preferredCommunicationChannels}
      salesPersons={salesPersons}
      handleFileUpload={handleFileUpload}
      handleRemoveCSV={handleRemoveCSV}
      csvData={csvData}
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      acceptedFiles={acceptedFiles}
      inputType={inputType}
      setInputType={setInputType}
    />
  );
};

export default CreateClientPage;
