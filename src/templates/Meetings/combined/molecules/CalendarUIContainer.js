import useCalendar from "../../functionality/molecules/useCalendar";
import CalendarUI from "../../ui/molecules/CalendarUI";

const Calendar = ({
  setStarAndEndDate,
  setCurrentMeeting,
  setCurrentMeetingId,
  setModalOpen,
  scrollToDiv,
  openModal,
  meetings,
  loading,
  closeModal,
  setValue,
}) => {
  const { renderEventContent, handleMonthChange, getBackgroundColor } =
    useCalendar({
      setStarAndEndDate,
      setCurrentMeeting,
      setCurrentMeetingId,
      setModalOpen,
    });
  return (
    <CalendarUI
      setCurrentMeetingId={setCurrentMeetingId}
      renderEventContent={renderEventContent}
      handleMonthChange={handleMonthChange}
      setModalOpen={setModalOpen}
      meetings={meetings}
      getBackgroundColor={getBackgroundColor}
      scrollToDiv={scrollToDiv}
      loading={loading}
      openModal={openModal}
      closeModal={closeModal}
      setValue={setValue}
    />
  );
};

export default Calendar;
