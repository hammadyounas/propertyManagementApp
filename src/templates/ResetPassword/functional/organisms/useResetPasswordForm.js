import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { postRequest } from "../../../../libs/utils/request_handler";

const schema = yup
  .object({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("newPassword")], "Passwords must match"),
  })
  .required();

const useResetPasswordForm = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { id } = router.query; // Extract the dynamic `id` from the URL

  const onSubmit = async (data) => {
    setLoading(true);
    setSuccessMessage("");
    try {
      const payload = { ...data, id };
      const response = await postRequest(`reset-password/${id}`, payload);
      toast.success("Password reset successfully!");
      reset();  
      router.push("");
      console.log("Response:", response);
    } catch (error) {
      console.error("Error resetting password:", error.response?.data || error.message);
      toast.error("Password reset failed. Please try again.");
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
    successMessage,
  };
};

export default useResetPasswordForm;
