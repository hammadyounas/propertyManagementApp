import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { fetchProperties } from "../../../../store/features/properties/propertiesSlice";
import { postRequest } from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const useCreateACM = () => {
  const schema = yup.object({
    date_of_sale: yup.string().required("Date of Sale is required"),
    property: yup.string().required("Property Name is required"),
    unit_sold: yup.string().required("Unit Sold is required"),
    sale_price: yup
      .number()
      .required("Sale Price is required")
      .positive("Sale Price must be a positive number"),
    net_operating_income: yup
      .number()
      .required("Net Operating Income is required")
      .positive("Net Operating Income must be a positive number"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [selectedProperty, setSelectedProperty] = useState(null);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties({ all: true }));
  }, []);

  const propertyOptions = properties.map((property) => ({
    value: property._id,
    label: property.title,
  }));

  const handleSelectProperty = (selectedOption) => {
    setSelectedProperty(selectedOption);
    setValue("property", selectedOption?.value);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = {
        ...data,
      };

      const response = await postRequest("acm", formData);
      if (response) {
        toast.success("Form submitted successfully");
        push("/acms");
      } else {
        toast.error("Invoice creation failed");
        throw new Error("Invoices creation failed");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while creating invoice."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    reset,
    setValue,
    loading,
    properties: propertyOptions,
    selectedProperty,
    handleSelectProperty,
    push,
  };
};

export default useCreateACM;
