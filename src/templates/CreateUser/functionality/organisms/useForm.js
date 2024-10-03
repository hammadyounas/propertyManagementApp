import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const useCreateForm = () => {
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    phone: yup.string().required("Phone is required"),
    email: yup.string().required("Email is required").email("Invalid email"),
    address: yup.string().required("Address is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirm_password: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Form Submitted`);
      console.log("Form Data: ", data);
      setLoading(false);
      push("/sales-team");
    }, 1500);
  };

  return {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
    loading,
    push,
  };
};

export default useCreateForm;
