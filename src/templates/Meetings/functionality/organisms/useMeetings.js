import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  // clients,
  // dummyMeetings,
  // salespersons,
  statuses,
} from "../constants/data";
import {
  postRequest,
  getRequest,
  patchRequest,
} from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";

const useMeetings = () => {
  const schema = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    start_time: yup.string().required("Start Time is required"),
    end_time: yup
    .string()
    .required("End Time is required")
    .test("is-after-start", "End time cannot be earlier than start time. Please select a valid time range.", function (value) {
      const { start_time } = this.parent;
      return new Date(value) > new Date(start_time);
    }),
    location_status: yup.string().required("Location is required"),
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

  const [salespersons, setSalespersons] = useState();
  const [clients, setClients] = useState();
  const [meetings, setMeetings] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("user_id");
  const userRole = localStorage.getItem("role");
  const [isSalespersonDisabled, setIsSalespersonDisabled] = useState(false);


  const fetchSalespersonAndClientsData = async () => {
    try {
      const response = await getRequest("users");
      const filteredSalespersons = response?.data?.filter((sp) => !sp.isDeleted);
      const salesPersonsMap = Object.fromEntries(
        filteredSalespersons?.map(({ _id, name, contact_number, email, role }) => [
          _id,
          { name, contact_number, email, role },
        ])
      );

      setSalespersons(filteredSalespersons);
      
      const userResponse = await getRequest(`user/${userId}`);
      const currentUser = userResponse?.data;
      
      if (currentUser.role === "BROKER") {
        setSelectedSalespersons({
          label: currentUser.name,
          value: currentUser._id,
        });
        setIsSalespersonDisabled(true);
      }
      
      console.log("Current User",currentUser);

      const clientsResponse = await getRequest("clients");
      const filteredClients = clientsResponse?.data?.filter((c) => !c.isDeleted);
      const clientMap = Object.fromEntries(
        filteredClients?.map(({ _id, name, phoneNumber, email }) => [
          _id,
          { name, phoneNumber, email },
        ])
      );

      setClients(filteredClients);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSalespersonAndClientsData();
  }, []);

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);
    try {
      // Prepare data for the API
      const formData = {
        ...data,
        salespersons: selectedSalesPersons?.value,
        clients: selectedClients?.value,

      };

      if (currentMeetingId) {
        const { _id, ...rest } = formData;
        // API call to update the user
        const response = await patchRequest(`meetings/${_id}`, rest);
        if (response) {
          toast.success("Meeting updated successfully!");
          fetchMeetings()
          closeModal(); // Redirect after successful registration
        } else {
          toast.error("Meeting update failed");
          throw new Error("Meeting update failed");
        }
      } else {
        // API call to register the user
        const response = await postRequest("meetings", formData);
        console.log(response.code >= 200 && response.data.status <= 300);
        if (response) {
          toast.success("Meeting created successfully!");
          console.log(response.data); // Log the API response if needed
          fetchMeetings()
          closeModal(); // Redirect after successful registration
        } else {
          toast.error("Meeting created failed");
          throw new Error("Meeting created failed");
        }
      }
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || 'Something went wrong');
      // toast.error(error.message || "An error occurred while meeting creation.");
    } finally {
      setLoading(false); // Ensure loading state is turned off regardless of success or error
    }
  };

  // const onSubmit = (data) => {
  //   setLoading(true);
  //   {
  //     setTimeout(() => {
  //       alert(`Form Submitted`);
  //       console.log("Form Data: ", data);
  //       if (currentMeetingId) {
  //         setMeetings((prevMeetings) =>
  //           prevMeetings.map((meeting) =>
  //             meeting.meeting_id === currentMeetingId ? data : meeting
  //           )
  //         );
  //       } else {
  //         setMeetings((prev) => [...prev, { meeting_id: uuidv4(), ...data }]);
  //       }

  //       closeModal();
  //       setLoading(false);
  //     }, 1500);
  //   }
  // };

  const [starAndEndDate, setStarAndEndDate] = useState({
    startDate: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
    endDate: moment(new Date()).endOf("month").format("YYYY-MM-DD"),
  });
  const [status, setStatus] = useState("");
  const [selectedSalesPersons, setSelectedSalespersons] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [currentMeetingId, setCurrentMeetingId] = useState(null);
  const [currentMeeting, setCurrentMeeting] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  

  // const [meetings, setMeetings] = useState(null);
  const [meetingsLoading, setMeetingsLoading] = useState(true);

    useEffect(() => {
      fetchMeetings();
    }, [starAndEndDate]);

    const fetchMeetings = async () => {
      try {
        setMeetingsLoading(true);
        const response = await getRequest(`meetings?startDate=${starAndEndDate.startDate}`)
        const filteredMeetings = response.data.filter(
          (meeting) => !meeting.isDeleted
        );
        console.log("Meetings",response.data); // Log the API response if needed
        setMeetings(filteredMeetings);
        setMeetingsLoading(false);
      } catch (error) {
        setMeetingsLoading(false);
        console.error("Error fetching data:", error);
      }
    };

  // useEffect(() => {
  //   setTimeout(() => {
  //     // setMeetings(dummyMeetings);
  //     setMeetingsLoading(false);
  //   }, 1200);
  // }, []);

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
    error,
    isSalespersonDisabled,
    setValue,
  };
};

export default useMeetings;
