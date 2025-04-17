import Modal from "../../../../components/combined/organisms/ModalUIContainer";
import useMeetings from "../../functionality/organisms/useMeetings";
import Calendar from "../molecules/CalendarUIContainer";
import MeetingDetails from "../molecules/MeetingDetailsUIContainer";
import Button from "../../../../components/ui/molecules/Button";
import AddAndUpdateMeetingModalContent from "../molecules/AddAndUpdateMeetingModalContentUIContainer";

const MeetingsPage = () => {
  const {
    starAndEndDate,
    setStarAndEndDate,
    currentMeetingId,
    setCurrentMeetingId,
    currentMeeting,
    setCurrentMeeting,
    modalOpen,
    setModalOpen,
    targetDivRef,
    scrollToDiv,
    activeModal,
    closeModal,
    openModal,
    register,
    errors,
    handleSubmit,
    onSubmit,
    status,
    handleSelectStatus,
    statuses,
    salespersons,
    selectedSalesPersons,
    handleSelectSalesperson,
    clients,
    selectedClients,
    handleSelectClients,
    loading,
    meetings,
    meetingsLoading,
    error,
    isSalespersonDisabled,
  } = useMeetings();
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:justify-between w-full">
      <Calendar
        setStarAndEndDate={setStarAndEndDate}
        setCurrentMeeting={setCurrentMeeting}
        setCurrentMeetingId={setCurrentMeetingId}
        setModalOpen={setModalOpen}
        scrollToDiv={scrollToDiv}
        openModal={openModal}
        meetings={meetings}
        loading={meetingsLoading}
        closeModal={closeModal}
      />
      {modalOpen && (
        <MeetingDetails
          setModalOpen={setModalOpen}
          targetDivRef={targetDivRef}
          currentMeeting={currentMeeting}
          openModal={openModal}
          closeModal={closeModal}
        />
      )}
      <Modal
        title={currentMeetingId ? "Update Meeting" : "New Meeting"}
        label={currentMeetingId ? "Update Meeting" : "New Meeting"}
        labelClass="btn-outline-dark"
        // uncontrol
        activeModal={activeModal}
        // scrollContent
        onClose={!loading ? closeModal : () => {}}
        centered
      >
        {
          <AddAndUpdateMeetingModalContent
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
            isSalespersonDisabled={isSalespersonDisabled}
          />
        }
      </Modal>
    </div>
  );
};

export default MeetingsPage;
