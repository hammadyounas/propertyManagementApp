import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  clients,
  dummyMeetings,
  salespersons,
  statuses,
} from "../constants/data";
import { v4 as uuidv4 } from "uuid";

const useMeetings = () => {
  const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    start_time: yup.string().required("Start Time is required"),
    end_time: yup.string().required("End Time is required"),
    location: yup.string().required("Location is required"),
    status: yup.string().required("Status is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data) => {
    setLoading(true);
    {
      setTimeout(() => {
        alert(`Form Submitted`);
        console.log("Form Data: ", data);
        if (currentMeetingId) {
          setMeetings((prevMeetings) =>
            prevMeetings.map((meeting) =>
              meeting.meeting_id === currentMeetingId ? data : meeting
            )
          );
        } else {
          setMeetings((prev) => [...prev, { meeting_id: uuidv4(), ...data }]);
        }

        closeModal();
        setLoading(false);
      }, 1500);
    }
  };

  const [starAndEndDate, setStarAndEndDate] = useState({
    startDate: moment(new Date()).startOf("month").valueOf(),
    endDate: moment(new Date()).endOf("month").valueOf(),
  });
  const [status, setStatus] = useState("");
  const [selectedSalesPersons, setSelectedSalespersons] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [currentMeetingId, setCurrentMeetingId] = useState(null);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [meetings, setMeetings] = useState(null);
  const [meetingsLoading, setMeetingsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMeetings(dummyMeetings);
      setMeetingsLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    if (currentMeetingId) {
      const current = meetings?.find((m) => m.meeting_id == currentMeetingId);
      setCurrentMeeting(current);
      for (const key in current) {
        if (key == "status") {
          setStatus({ value: current[key], label: current[key] });
        } else if (key == "salespersons") {
          setSelectedSalespersons(current[key]);
        } else if (key == "clients") {
          setSelectedClients(current[key]);
        } else if (key == "start_time") {
          setValue(key, moment(current[key]).format("YYYY-MM-DDTHH:mm"));
        } else if (key == "end_time") {
          setValue(key, moment(current[key]).format("YYYY-MM-DDTHH:mm"));
        } else {
          setValue(key, current[key]);
        }
      }
      // setValue("salespersons", current?.salespersons);
      // setValue("clients", current?.clients);
      setModalOpen(true);
    }
  }, [currentMeetingId]);

  // Sync external state with form values using setValue
  useEffect(() => {
    setValue("status", status?.value);
    setValue("salespersons", selectedSalesPersons);
    setValue("clients", selectedClients);
  }, [status, selectedSalesPersons, selectedClients, setValue]);

  const handleSelectStatus = (e) => {
    setStatus(e);
  };

  const handleSelectSalesperson = (selectedValues) => {
    setSelectedSalespersons(selectedValues);
  };

  const handleSelectClients = (selectedValues) => {
    setSelectedClients(selectedValues);
  };

  const [activeModal, setActiveModal] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setActiveModal(false);
    setCurrentMeeting(null);
    setCurrentMeetingId(null);
    setStatus("");
    setSelectedSalespersons([]);
    setSelectedClients([]);
    reset();
  };

  const openModal = () => {
    setActiveModal(!activeModal);
  };

  const targetDivRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToDiv = () => {
    if (window.innerWidth > 1500) {
      scrollToTop();
    } else if (targetDivRef.current) {
      targetDivRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return {
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
  };
};

export default useMeetings;
