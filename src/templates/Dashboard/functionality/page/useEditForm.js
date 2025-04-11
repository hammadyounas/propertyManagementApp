import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { invoiceStatus, pmtReceivedStatus } from "../constants/data";
import toast from "react-hot-toast";
import { useRouter } from "next/router"; // Correct import for routing
import {
  getRequest,
  patchRequest,
} from "../../../../libs/utils/request_handler";

const useEditForm = () => {
  const schema = yup.object({
    signature_date: yup.string().required("Signature Date is required"),
    dd: yup.number().typeError("DD must be a number").required().min(1),
    financing_days: yup
      .number()
      .typeError("Financing Days must be a number")
      .required()
      .min(1),
    closing_days: yup
      .number()
      .typeError("Closing Days must be a number")
      .required()
      .min(1),
    invoice: yup.string().required("Invoice Status is required"),
    pmtReceived: yup.string().required("PMT Received is required"),
    value_of_amount: yup
      .number()
      .typeError("Value of Amount must be a number")
      .required()
      .min(0),
    comment: yup.string().optional().max(200),
  });

  const router = useRouter();
  const { query, push } = router;
  const id = query?.id;
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("user_id") : null;

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
    defaultValues: {
      invoice: "pending",
      pmtReceived: "non paid",
    },
  });

  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    label: "Pending",
    value: "pending",
  });
  const [pmtReceived, setPmtReceived] = useState({
    label: "Non Paid",
    value: "non paid",
  });

  useEffect(() => {
    if (!id) return;

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const res = await getRequest(`dashboard/${id}`);
        const dashboardData = res.data;

        const formattedSignatureDate = dashboardData?.signatureDate
          ? new Date(dashboardData.signatureDate).toISOString().split("T")[0]
          : "";

        setValue("signature_date", formattedSignatureDate);
        setValue("dd", dashboardData?.dd);
        setValue("closing_days", dashboardData?.closingDays);
        setValue("financing_days", dashboardData?.financingDays);
        setValue("invoice", dashboardData?.invoice);
        setValue("pmtReceived", dashboardData?.pmtReceived);
        setValue("value_of_amount", dashboardData?.amount);
        setValue("comment", dashboardData?.comment);

        setInvoice({
          label: dashboardData?.invoice,
          value: dashboardData?.invoice,
        });
        setPmtReceived({
          label: dashboardData?.pmtReceived,
          value: dashboardData?.pmtReceived,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        toast.error("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [id, setValue]);

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
        dd: data.dd,
        closingDays: data.closing_days,
        financingDays: data.financing_days,
        invoice: data.invoice,
        pmtReceived: data.pmtReceived,
        user_id: userId,
      };
      console.log(formData);
      const response = await patchRequest(`dashboard/${id}`, formData);
      if (response) {
        toast.success("Dashboard entry edited successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Dashboard entry update failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while updating dashboard entry"
      );
    } finally {
      setLoading(false);
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
    router,
  };
};

export default useEditForm;
