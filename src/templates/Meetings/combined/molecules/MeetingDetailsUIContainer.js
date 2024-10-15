import MeetingDetailsUI from "../../ui/molecules/MeetingDetailsUI";

const MeetingDetails = ({
  setModalOpen,
  targetDivRef,
  currentMeeting,
  openModal,
  closeModal,
}) => {
  return (
    <MeetingDetailsUI
      setModalOpen={setModalOpen}
      targetDivRef={targetDivRef}
      currentMeeting={currentMeeting}
      openModal={openModal}
      closeModal={closeModal}
    />
  );
};

export default MeetingDetails;
