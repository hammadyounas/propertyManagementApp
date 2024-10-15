import useCalendar from "../../functionality/molecules/useCalendar";
import CalendarUI from "../../ui/molecules/CalendarUI";

const Calendar = ({
  setStarAndEndDate,
  setCurrentMeeting,
  setCurrentMeetingId,
  setModalOpen,
  scrollToDiv,
  openModal,
}) => {
  const {
    renderEventContent,
    handleMonthChange,
    meetings,
    getBackgroundColor,
    loading,
  } = useCalendar({
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
    />
  );
};

export default Calendar;
