  import moment from "moment/moment";
  import { useEffect, useRef, useState } from "react";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useForm } from "react-hook-form";
  import { statuses } from "../constants/data";
  import toast from "react-hot-toast";
  import { useSelector, useDispatch } from "react-redux";
  import {
    fetchMeetings,
    createMeeting,
    updateMeeting,
    clearError,
  } from "../../../../store/features/meetings/meetingSlice";
  import {
    fetchUsers,
    fetchUserById,
  } from "../../../../store/features/users/userSlice";
  import { fetchClients } from "../../../../store/features/clients/clientSlice";

  const useMeetings = () => {
    const schema = yup.object({
      title: yup.string().required("Title is required"),
      description: yup.string().required("Description is required"),
      start_time: yup.string().required("Start Time is required"),
      end_time: yup
        .string()
        .required("End Time is required")
        .test(
          "is-after-start",
          "End time cannot be earlier than start time. Please select a valid time range.",
          function (value) {
            const { start_time } = this.parent;
            return new Date(value) > new Date(start_time);
          }
        ),
      location_status: yup.string().required("Location is required"),
      location: yup.string().required("Location is required"),
      status: yup.string().required("Status is required"),

    });

    const dispatch = useDispatch();
    const {
      meetings,
      loading: meetingsLoading,
      error,
    } = useSelector((state) => state.meetings);
    const {
      users,
      selectedUser,
      loading: usersLoading,
      error: usersError,
    } = useSelector((state) => state.users);

    const {
      clients,
      loading: clientsLoading,
      error: clientsError,
    } = useSelector((state) => state.clients);

    const {
      register,
      formState: { errors },
      handleSubmit,
      setValue,
      reset,
    } = useForm({
      resolver: yupResolver(schema),
      // mode: "all",
    });

    const [salespersons, setSalespersons] = useState();
    const userId = localStorage.getItem("user_id");
    const [status, setStatus] = useState("");
    const [selectedSalesPersons, setSelectedSalespersons] = useState(null);
    const [selectedClients, setSelectedClients] = useState([]);
    const [currentMeetingId, setCurrentMeetingId] = useState(null);
    const [currentMeeting, setCurrentMeeting] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isSalespersonDisabled, setIsSalespersonDisabled] = useState(false);
    const [starAndEndDate, setStarAndEndDate] = useState({
      startDate: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
      endDate: moment(new Date()).endOf("month").format("YYYY-MM-DD"),
    });

      useEffect(() => {
        if (users && users.length > 0) {
          setSalespersons(users); // ✅ This is the list for the ReactSelect options
        }
      }, [users]);

      useEffect(() => {
        // Skip this logic if we're editing an existing meeting
        if (currentMeetingId) return;
      
        if (selectedUser) {
          if (selectedUser.role === "BROKER") {
            const defaultSalesperson = {
              label: selectedUser.name,
              value: selectedUser._id,
            };
            setSelectedSalespersons(defaultSalesperson);
            setValue("salespersons", defaultSalesperson);
            setIsSalespersonDisabled(true); // Disable field for brokers
          } else {
            setSelectedSalespersons(null);
            setValue("salespersons", null);
            setIsSalespersonDisabled(false); // Enable for admins
          }
        }
      }, [selectedUser, currentMeetingId, setValue]);
      

    // Fetch meetings based on selected month
    useEffect(() => {
      dispatch(fetchMeetings(starAndEndDate.startDate));
    }, [starAndEndDate, dispatch]);

      // Fetch all necessary data on mount
      useEffect(() => {
          dispatch(fetchUsers());
          dispatch(fetchClients());
          dispatch(fetchUserById(userId));
        }, [dispatch, userId]);

    const onSubmit = async (data) => {
      // setError(null);
      setLoading(true);
      try {
        // Prepare data for the API
        const formData = {
          ...data,
          salespersons: selectedSalesPersons?.value,
          clients: selectedClients?.value,
        };

        if (currentMeetingId) {
          await dispatch(
            updateMeeting({ id: currentMeetingId, data: formData })
          ).unwrap();
          toast.success("Meeting updated successfully!");
          dispatch(fetchMeetings(starAndEndDate.startDate));
        } else {
          await dispatch(createMeeting(formData)).unwrap();
          toast.success("Meeting created successfully!");
          dispatch(fetchMeetings(starAndEndDate.startDate));
        }
        closeModal();
      } catch (error) {
        setLoading(false);
        console.error("Meeting Error:", error);
        toast.error(error || "Something went wrong!");
      } finally {
        setLoading(false); // Ensure loading state is turned off regardless of success or error
      }
    };

    useEffect(() => {
      if (currentMeetingId) {
        const current = meetings?.find((m) => m._id == currentMeetingId);
        setCurrentMeeting(current);
        for (const key in current) {
          if (key == "status") {
            setStatus({ value: current[key], label: current[key] });
          } else if (key == "salespersons") {
            setSelectedSalespersons({
              value: current[key]?._id,
              label: current[key]?.name,
            });
          } else if (key == "clients") {
            setSelectedClients({
              value: current[key]?._id,
              label: current[key]?.name,
            });
          } else if (key == "start_time") {
            setValue(key, moment(current[key]).format("YYYY-MM-DDTHH:mm"));
          } else if (key == "end_time") {
            setValue(key, moment(current[key]).format("YYYY-MM-DDTHH:mm"));
          } else {
            setValue(key, current[key]);
          }
        }
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
      setValue("salespersons", selectedValues);
    };

    const handleSelectClients = (selectedValues) => {
      setSelectedClients(selectedValues);
    };

    const [activeModal, setActiveModal] = useState(false);

    const closeModal = () => {
      reset();
      dispatch(clearError()); 
      setModalOpen(false);
      setActiveModal(false);
      setCurrentMeeting(null);
      setCurrentMeetingId(null);
      setStatus("");
      setSelectedSalespersons(null);
      setSelectedClients(null);

    };

    const openModal = async () => {
      
      await dispatch(fetchUserById(userId)); 
      setActiveModal(!activeModal);
    };

    const handleDiscard = () => {
      reset();
      closeModal(); // reset() will clear form and errors
      dispatch(clearError()); 
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
      error,
      isSalespersonDisabled,
      setValue,
      handleDiscard
    };
  };

  export default useMeetings;
