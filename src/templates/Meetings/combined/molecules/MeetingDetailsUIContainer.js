import MeetingDetailsUI from "../../ui/molecules/MeetingDetailsUI";

const MeetingDetails = ({ setModalOpen, targetDivRef }) => {
  return (
    <MeetingDetailsUI setModalOpen={setModalOpen} targetDivRef={targetDivRef} />
  );
};

export default MeetingDetails;
