import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import {
  clients,
  invoiceStatuses,
  properties,
  salesPersons,
  listingBrokers,
  sellingBrokers,
} from "../constants/data";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const useCreateInvoice = () => {
  const itemSchema = yup.object({
    item_name: yup.string().required("Item name is required"),
    item_description: yup.string().required("Item description is required"),
    // item_quantity: yup
    //   .number()
    //   .typeError("Item quantity must be a number")
    //   .required("Item quantity is required")
    //   .min(0, "Item quantity cannot be negative"), // Prevent negative values
    item_price: yup
      .number()
      .typeError("Item price must be a number")
      .required("Item price is required")
      .min(0, "Item price cannot be negative"), // Prevent negative values
    item_gst: yup
      .number()
      .typeError("Item tax must be a number")
      .optional()
      .min(0, "Item tax cannot be negative"), // Prevent negative values
    item_qst: yup
      .number()
      .typeError("Item tax must be a number")
      .optional()
      .min(0, "Item tax cannot be negative"), // Prevent negative values
    item_total: yup.number().typeError("Item total must be a number"), // Total will be calculated
  });

  const schema = yup.object({
    due_date: yup.string().required("Due Date is required"),
    invoice_date: yup.string().required("Invoice Date is required"),
    invoice_status: yup.string().required("Invoice Status is required"),
    client_id: yup.string().required("Client Name is required"),
    salesperson_id: yup.string().required("Salesperson Name is required"),
    property_id: yup.string().required("Property Name is required"),
    items: yup.array().of(itemSchema).min(1, "At least one item is required"),
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    defaultValues: {
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [invoiceStatus, setInvoiceStatus] = useState("");
  const [clientName, setClientName] = useState("");
  const [salesPersonName, setSalespersonName] = useState("");
  const [listingBroker, setListingBroker] = useState("");
  const [sellingBroker, setSellingBroker] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    setValue("invoice_id", uuidv4());
  }, []);

  // Sync external state with form values using setValue
  useEffect(() => {
    setValue("invoice_status", invoiceStatus?.value || "");
    setValue("client_id", clientName?.value || "");
    setValue("client_address", clientName?.address || "");
    setValue("client_email", clientName?.email || "");
    setValue("client_phone", clientName?.phone || "");

    setValue("salesperson_id", salesPersonName?.value || "");
    setValue("salesperson_address", salesPersonName?.address || "");
    setValue("salesperson_email", salesPersonName?.email || "");
    setValue("salesperson_phone", salesPersonName?.phone || "");

    setValue("listing_broker_id", listingBroker?.value || "");
    setValue("selling_broker_id", sellingBroker?.value || "");

    setValue("property_id", selectedProperty?.value || "");
    setValue("property_address", selectedProperty?.address || "");
    setValue("property_type", selectedProperty?.type || "");
    setValue("property_description", selectedProperty?.description || "");
  }, [invoiceStatus, clientName, salesPersonName, selectedProperty, setValue]);

  // Function to calculate item_total based on item_quantity and item_price
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const updatedItems = getValues("items").map((item, index) => {
        const price = parseFloat(item.item_price) || 0; // Ensure price is a number
        const gst = parseFloat((price * 0.05).toFixed(2)); // Calculate GST and round
        const qst = parseFloat((price * 0.0975).toFixed(2)); // Calculate QST and round

        // Ensure the total is also rounded to 2 decimal places
        const total = parseFloat((price + gst + qst).toFixed(2));

        // Only update if the value has changed to prevent unnecessary re-renders
        if (item.item_total !== total) {
          setValue(`items.${index}.item_total`, total, { shouldDirty: true });
        }
        if (item.item_gst !== gst) {
          setValue(`items.${index}.item_gst`, gst, { shouldDirty: true });
        }
        if (item.item_qst !== qst) {
          setValue(`items.${index}.item_qst`, qst, { shouldDirty: true });
        }

        return item; // Return the updated item
      });
    });

    return () => subscription.unsubscribe();
  }, [watch, getValues, setValue]);

  const calculateItemTotals = (items) => {
    let grandTotal = {
      totalPrice: 0,
      totalGst: 0,
      totalQst: 0,
      totalItemTotal: 0,
    };

    items.map((item) => {
      // Ensure item_price is a number
      const price = parseFloat(item.item_price) || 0;

      // Calculate GST (5% of price) and round to 2 decimals
      const gst = parseFloat((price * 0.05).toFixed(2));

      // Calculate QST (9.75% of price) and round to 2 decimals
      const qst = parseFloat((price * 0.0975).toFixed(2));

      // Calculate total (price + gst + qst)
      const total = parseFloat((price + gst + qst).toFixed(2));

      // Update grand totals
      grandTotal.totalPrice += price;
      grandTotal.totalGst += gst;
      grandTotal.totalQst += qst;
      grandTotal.totalItemTotal += total;

      return {
        ...item,
        item_price: price,
        item_gst: gst,
        item_qst: qst,
        item_total: total,
      };
    });

    return {
      grandTotal,
    };
  };

  const total = calculateItemTotals(getValues("items"));

  const handleSelectInvoiceStatus = (e) => {
    setInvoiceStatus(e);
  };

  const handleSelectClientName = (e) => {
    setClientName(e);
  };

  const handleSelectSalespersonName = (e) => {
    setSalespersonName(e);
  };

  const handleSelectListingBroker = (e) => {
    setListingBroker(e);
  };

  const handleSelectSellingBroker = (e) => {
    setSellingBroker(e);
  };

  const handleSelectProperty = (e) => {
    setSelectedProperty(e);
  };

  const onSubmit = (data) => {
    setLoading(true);
    {
      setTimeout(() => {
        alert(`Form Submitted`);
        console.log("Form Data: ", data);
        setLoading(false);
        push("/invoices");
      }, 1500);
    }
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
    invoiceStatus,
    invoiceStatuses,
    handleSelectInvoiceStatus,
    clientName,
    handleSelectClientName,
    clients,
    salesPersonName,
    handleSelectSalespersonName,
    handleSelectListingBroker,
    handleSelectSellingBroker,
    salesPersons,
    listingBrokers,
    sellingBrokers,
    selectedProperty,
    handleSelectProperty,
    properties,
    fields,
    append,
    remove,
    total,
  };
};

export default useCreateInvoice;
