import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceStatus, pmtReceivedStatus } from "../constants/data";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { postRequest } from "../../../../libs/utils/request_handler";

const useAddForm = () => {
  const schema = yup.object({
    signature_date: yup.string().required("Signature Date is required"),
    dd: yup
      .number()
      .typeError("DD must be a number")
      .required("DD is required")
      .min(1, "DD must be greater than 0"),
    financing_days: yup
      .number()
      .typeError("Financing Days must be a number")
      .required("Financing Days is required")
      .min(1, "Financing Days must be greater than 0"),
    closing_days: yup
      .number()
      .typeError("Closing Days must be a number")
      .required("Closing Days is required")
      .min(1, "Closing Days must be greater than 0"),
    invoice: yup.string().required("Invoice Status is required"),
    pmtReceived: yup.string().required("PMT Received is required"),
    value_of_amount: yup
      .number()
      .typeError("Value of Amount must be a number")
      .required("Value of Amount is required")
      .min(0, "Value of Amount cannot be negative"),
    comment: yup.string().optional().max(100, "Comment must be at most 200 characters long").test(
      "maxWords",
      "Comment must be at most 100 words",
      value => {
        if (!value) return true;
        const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
        return wordCount <= 100;
      }
    ),
  });

  const { push } = useRouter();
  const pathname = usePathname();
  const { query } = useRouter();
  const id = query?._id; // Extract the ID from the query parameters
  
  // Ensure `id` is a string (if it's an array, use the first element)
  // const editPage = pathname === `/dashboard/edit/${id}` ? pathname : null; 
  const editPage = pathname;
  console.log("Path",editPage);

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      invoice: "pending",
      pmtReceived: "non paid"
      // dd: 0,
      // financing_days: 0,
      // closing_days: 0,
      // value_of_amount: 0,
    },
  });

  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({ label: "Pending", value: "pending" });
  const [pmtReceived, setPmtReceived] = useState({ label: "Non Paid", value: "non paid" });
  const comment = watch("comment") || "";
  const wordCount = comment.trim().split(/\s+/).filter(Boolean).length;


  useEffect(() => {
    setValue("invoice", "pending");
  }, [setValue]);

  useEffect(() => {
    setValue("pmtReceived", "non paid");
  }, [setValue]);

  const handleSelectInvoiceStatus = (selectedOption) => {
    setInvoice(selectedOption);
    setValue("invoice", selectedOption?.value);
  };

  const handlePmtReceived = (selectedOption) => {
    setPmtReceived(selectedOption);
    setValue("pmtReceived", selectedOption?.value);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        signatureDate: data.signature_date,
        dd: data.dd,
        closingDays: data.closing_days,
        financingDays: data.financing_days,
        invoice: data.invoice,
        pmtReceived: data.pmtReceived,
        amount: data.value_of_amount,
        comment: data.comment,
      };

      const response = await postRequest("dashboard", formData);
      if (response) {
        toast.success("Dashboard entry added successfully!");
        push("/dashboard");
      } else {
        toast.error("Dashboard entry creation failed");
        throw new Error("Dashboard entry creation failed");
      }
      setLoading(false);
      reset();
      setInvoice(null);
      setPmtReceived(null);
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while creating dashboard entry"
      );
    }
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
    editPage,
    wordCount,
    watch,
  };
};

export default useAddForm;
