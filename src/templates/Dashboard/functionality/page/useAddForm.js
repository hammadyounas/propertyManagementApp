import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceStatus, pmtReceivedStatus } from "../constants/data";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const useAddForm = () => {
  const schema = yup.object({
    signature_date: yup.string().required("Signature Date is required"),
    dd: yup
      .number()
      .typeError("DD must be a number")
      .required("DD is required"),
    financing_days: yup
      .number()
      .typeError("Financing Days must be a number")
      .required("Financing Days is required"),
    closing_days: yup
      .number()
      .typeError("Closing Days must be a number")
      .required("Closing Days is required"),
    invoice: yup.string().required("Invoice Status is required"),
    pmtReceived: yup.string().required("PMT Received is required"),
    value_of_amount: yup.string().required("Value of Amount is required"),
  });

  const { push } = useRouter();

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
  });

  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [pmtReceived, setPmtReceived] = useState(null);

  const handleSelectInvoiceStatus = (selectedOption) => {
    setInvoice(selectedOption);
    setValue("invoice", selectedOption?.value);
  };

  const handlePmtReceived = (selectedOption) => {
    setPmtReceived(selectedOption);
    setValue("pmtReceived", selectedOption?.value);
  };

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data:", data);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      reset();
      setInvoice(null);
      setPmtReceived(null);
    }, 1000);

    toast.success("Form Submitted Successfully!");
  };

  return {
    register,
    errors,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    loading,
    invoice,
    pmtReceived,
    handleSelectInvoiceStatus,
    handlePmtReceived,
    onSubmit,
    invoiceStatus,
    pmtReceivedStatus,
    push,
  };
};

export default useAddForm;
