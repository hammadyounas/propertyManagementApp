import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { AppRoutes } from "@/constants/appRoutes";

const useCreateEmailTemplate = () => {
  const schema = yup.object({
    name: yup.string().required("Template Name is required"),
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
  const [templateLoading, setTemplateLoading] = useState(true);
  const emailEditorRef = useRef(null);
  const { push } = useRouter();

  const handleTemplateLoaded = () => {
    setTemplateLoading(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      alert(`Template Created`);
      console.log("Form Data: ", data);
      setLoading(false);
      push(AppRoutes.EMAIL_TEMPLATES);
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
    emailEditorRef,
    templateLoading,
    handleTemplateLoaded,
  };
};

export default useCreateEmailTemplate;
