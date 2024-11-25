import { useForm } from "react-hook-form"; 
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { postRequest } from "../../../../libs/utils/request_handler";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

const useForgotPasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await postRequest("user/forget-password", { email: data.email }); // Replace with the correct endpoint
      toast.success(response.message || "Reset password link sent to your email.");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    loading,
  };
};

export default useForgotPasswordForm;
