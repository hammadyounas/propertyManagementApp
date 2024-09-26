import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup
      .string()
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password shouldn't be more than 20 characters")
      .required("Please enter password"),
    // confirm password
    confirmpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const useSignUpForm = () => {
  const [checked, setChecked] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Form Submitted ${JSON.stringify(data)}`);
      setLoading(false);
    }, 1500);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    loading,
    checked,
    setChecked,
  };
};

export default useSignUpForm;
