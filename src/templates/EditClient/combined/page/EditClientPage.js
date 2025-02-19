
import useEditForm from "../../functional/organisms/useEditForm";
import EditFormUI from "../../ui/organisms/EditFormUI";

const EditClientPage = () => {
  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
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
    getDataLoading,
  } = useEditForm();
  return (
    <EditFormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
      control={control}
      getValues={getValues}
      setValue={setValue}
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
      getDataLoading={getDataLoading}
    />
  );
};

export default EditClientPage;
