import Card from "../../../../components/combined/molecules/CardUIContainer";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import moment from "moment";
import Button from "../../../../components/ui/molecules/Button";

const CalendarUI = ({
  setCurrentMeetingId,
  renderEventContent,
  handleMonthChange,
  setModalOpen,
  meetings,
  getBackgroundColor,
  scrollToDiv,
  loading,
  openModal,
}) => {
  return (
    <Card className=" bg-white w-full 2xl:w-[62%]">
      <div className="flex justify-between items-center mb-4">
        <p className="h-8 font-semibold">
          {loading ? "Fetching meetings, please wait..." : " "}
        </p>
        <Button
          text="New Meeting"
          onClick={() => openModal()}
          className="btn-primary bg-primary-default"
        />
      </div>
      <FullCalendar
        // ref={calendarRef}
        // height={calendarHeight}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        events={meetings?.map((task, index) => ({
          start: moment().add(index, "days").toISOString(), // Schedule events on different days
          end: moment().add(index, "days").add(1, "hours").toISOString(),
          title: task.title,
          id: `${index}`,
          backgroundColor: getBackgroundColor(task.status), // Set background color based on status
        }))}
        // contentHeight={window.innerWidth <= 1440 ? undefined : "auto"}
        // height={window.innerWidth <= 1440 ? undefined : 800}
        eventClick={(clickInfo) => {
          // const task = clickInfo.event.id;
          // const selectedTask = getTask.find((task) => task.task_id === taskId);
          setCurrentMeetingId(clickInfo.event.id);
          setModalOpen(true);
          setTimeout(() => {
            scrollToDiv();
          }, 0);
        }}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={2}
        weekends={true}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        datesSet={handleMonthChange}
      />
    </Card>
  );
};

export default CalendarUI;
