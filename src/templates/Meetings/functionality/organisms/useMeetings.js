import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { clients, salespersons, statuses } from "../constants/data";

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
    setActiveModal(false);
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
  };
};

export default useMeetings;
