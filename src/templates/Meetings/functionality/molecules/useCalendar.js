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
      case "scheduled":
        return "#6F42C1"; // Blue #6F42C1
      case "completed":
        return "#28A745"; // Green
      case "cancelled":
        return "#db0404"; // Red
      case "pending":
        return "#F1B62E"; // Orange
      case "rescheduled":
        return "#f77605"; // Purple #FFC107
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
      startDate: moment(startOfMonth).format("YYYY-MM-DD"),
      endDate: moment(endOfMonth).format("YYYY-MM-DD"),
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
