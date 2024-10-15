import moment from "moment";
import { useEffect, useState } from "react";
import { dummyMeetings } from "../constants/data";

const useCalendar = ({
  setStarAndEndDate,
  setCurrentMeeting,
  setCurrentMeetingId,
  setModalOpen,
}) => {
  // Function to assign colors based on status
  const getBackgroundColor = (status) => {
    switch (status) {
      case "Scheduled":
        return "#007BFF"; // Blue
      case "Completed":
        return "#28A745"; // Green
      case "Canceled":
        return "#DC3545"; // Red
      case "Pending":
        return "#FFC107"; // Orange
      case "Rescheduled":
        return "#6F42C1"; // Purple
      default:
        return "#6C757D"; // Gray as fallback
    }
  };

  const renderEventContent = (eventInfo, e) => {
    return (
      <div
        style={{
          backgroundColor: eventInfo.backgroundColor,
          color: "white",
          width: "100%",
          padding: "5px",
          cursor: "pointer",
          textWrap: "wrap",
        }}
      >
        <p>
          <span>Title: </span> <span>{eventInfo.event.title}</span>
        </p>
      </div>
    );
  };

  const handleMonthChange = (e) => {
    const selectedDate = e.view.currentStart;
    const startOfMonth = new Date(selectedDate);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(selectedDate);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    setStarAndEndDate({
      startDate: moment(startOfMonth).valueOf(),
      endDate: moment(endOfMonth).valueOf(),
    });
    setCurrentMeeting(null);
    setCurrentMeetingId(null);
    setModalOpen(false);
  };

  return {
    renderEventContent,
    handleMonthChange,
    getBackgroundColor,
  };
};

export default useCalendar;
