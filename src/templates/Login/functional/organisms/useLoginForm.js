import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useProfile from "../../../../hooks/useProfile";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    username: yup.string().required("Username or Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();

export const useLoginForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const [_, setAuth] = useProfile();
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      // alert(`Form Submitted ${JSON.stringify(data)}`);
      setLoading(false);
      router.push("/dashboard")
    }, 1500);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    loading,
  };
};
