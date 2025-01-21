import AddAndUpdateMeetingModalContentUI from "../../ui/molecules/AddAndUpdateMeetingModalContentUI";

const AddAndUpdateMeetingModalContent = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  statuses,
  status,
  handleSelectStatus,
  salespersons,
  selectedSalesPersons,
  handleSelectSalesperson,
  clients,
  selectedClients,
  handleSelectClients,
  closeModal,
  loading,
  currentMeetingId,
  error
}) => {
  return (
    <AddAndUpdateMeetingModalContentUI
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      statuses={statuses}
      status={status}
      handleSelectStatus={handleSelectStatus}
      salespersons={salespersons}
      selectedSalesPersons={selectedSalesPersons}
      handleSelectSalesperson={handleSelectSalesperson}
      clients={clients}
      selectedClients={selectedClients}
      handleSelectClients={handleSelectClients}
      closeModal={closeModal}
      loading={loading}
      currentMeetingId={currentMeetingId}
      error={error}
    />
  );
};

export default AddAndUpdateMeetingModalContent;
