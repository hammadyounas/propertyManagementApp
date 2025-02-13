import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getAllPropertiesByIds } from "../../../../libs/api/properties";
import { patchRequest } from "../../../../libs/utils/request_handler";
import { API_URL } from "../../../../configs";
import { setUser } from "../../../../store/authSlice";

export default function useProfile() {
  const { user } = useSelector((state) => state.auth);
  const [status, setStatus] = useState("");
  const [propertiesAssigned, setPropertiesAssigned] = useState([]);
   const [loading, setLoading] = useState(false);
   const dispatch = useDispatch()
   const [isEditing, setIsEditing] = useState(false)
   const [loadingAvatar, setLoadingAvatar] = useState(false)

   const handleFileChange = async (event) => {
     const file = event.target.files[0];
     if (!file) return;

     const formData = new FormData();
     formData.append("avatar", file);

     try {
     setLoadingAvatar(true)
       const response = await patchRequest("profile/upload-avatar", formData, {
         headers: { "Content-Type": "multipart/form-data" },
       });
      if (response?.data) {
        dispatch(setUser(response?.data));
        toast.success("Profile picture updated successfully!");
      }
      setLoadingAvatar(false)
     } catch (error) {
      setLoadingAvatar(false)
      if (error.response) {
        const { data } = error?.response;
        console.error("Server error:", data);
        toast.error(data.message || "Something went wrong");
      } 
     } finally {
       setLoadingAvatar(false)
     }
   };

const handleCancel = () => {
  setIsEditing(false);

  if (user?._id) {
    setValue("name", user?.name);
    setValue("email", user?.email);
    setValue("contact_number", user?.contact_number);
    setValue("address", user?.address);
    setValue("licence_number", user?.licence_number);
    setValue("licence_type", user?.licence_type);
    setValue("notes", user?.notes);
    setValue(
      "status",
      salespersonStatus.find((status) => status.value === user?.status)
    );
    setStatus(
      salespersonStatus.find((status) => status.value === user?.status)
    );
    setValue("joining_date", user?.joining_date);
    setValue("assigned_properties", propertiesAssigned);
  }
  clearErrors();
};


  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    getValues,
    clearErrors
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Name is required"),
        email: yup
          .string()
          .email("Enter a valid email")
          .required("Email is required"),
        contact_number: yup.string().required("Contact number is required"),
        address: yup.string().required("Address is required"),
        licence_number: yup.string().required("License number is required"),
        licence_type: yup.string().required("License type is required"),
        // status: yup.string().required("Status is required"),
        // assigned_properties: yup.array().min(1, "Assign at least one property"),
      })
    ),
  });

  const salespersonStatus = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  useEffect(() => {
    if (user?._id) {
      const statusOption = salespersonStatus.find(
        (status) => status.value === user?.status
      );
      setValue("name", user?.name);
      setValue("email", user?.email);
      setValue("contact_number", user?.contact_number);
      setValue("address", user?.address);
      setValue("licence_number", user?.licence_number);
      setValue("licence_type", user?.licence_type);
      setValue("notes", user?.notes);
      setValue("status", statusOption);
      setStatus(statusOption);
      setValue("joining_date", user?.joining_date);
    }
  }, [user]);

  const fetchAvailableProperties = async () => {
    if (user?.assigned_properties?.lenth) {
      const assignedProperties = await getAllPropertiesByIds(
        user?.assigned_properties
      );
      setValue("assigned_properties", assignedProperties);
      setPropertiesAssigned(assignedProperties);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchAvailableProperties();
    }
  }, [user]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
        contact_number: data?.contact_number,
        address: data?.address,
        licence_number: data?.licence_number,
        licence_type: data?.licence_type,
      };
      const response = await patchRequest(
        `profile/update`,
        formData
      );
      if (response?.data) {
        dispatch(setUser(response?.data));
         toast.success("Profile updated successfully!");
      }
      setLoading(false)
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const { data } = error?.response;
        console.error("Server error:", data);
        toast.error(data.message || "Something went wrong");
      } 
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    register,
    errors,
    handleSubmit,
    onSubmit,
    status,
    propertiesAssigned,
    user,
    isEditing,
    setIsEditing,
    handleFileChange,
    loadingAvatar,
    handleCancel,
  };
}
