import { toast } from "react-toastify";
import { useForm, useFieldArray } from "react-hook-form";
import {
  // clients,
  invoiceStatuses,
  // properties,
  // salesPersons,
  listingBrokers,
  sellingBrokers,
} from "../constants/data";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { getRequest, postRequest } from "../../../../libs/utils/request_handler";

const useCreateInvoice = () => {
  const itemSchema = yup.object({
    itemName: yup.string().required("Item name is required"),
    description: yup.string().required("Item description is required"),
    // item_quantity: yup
    //   .number()
    //   .typeError("Item quantity must be a number")
    //   .required("Item quantity is required")
    //   .min(0, "Item quantity cannot be negative"), // Prevent negative values
    price: yup
      .number()
      .typeError("Item price must be a number")
      .required("Item price is required")
      .min(0, "Item price cannot be negative"), // Prevent negative values
    gst: yup
      .number()
      .typeError("Item tax must be a number")
      .optional()
      .min(0, "Item tax cannot be negative"), // Prevent negative values
    qst: yup
      .number()
      .typeError("Item tax must be a number")
      .optional()
      .min(0, "Item tax cannot be negative"), // Prevent negative values
    total: yup.number().typeError("Item total must be a number"), // Total will be calculated
  });

  const schema = yup.object({
    dueDate: yup.string().required("Due Date is required"),
    invoiceDate: yup.string().required("Invoice Date is required"),
    status: yup.string().required("Invoice Status is required"),
    buyer: yup.string().required("Buyer is required"),
    seller: yup.string().required("Selling Broker is required"),
    property: yup.string().required("Property is required"),
    items: yup.array().of(itemSchema).min(1, "At least one item is required"),
    instrumentalNotary: yup.string().required("Instrumental Notary is required"),
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
      status: "Pending",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const [invoiceStatus, setInvoiceStatus] = useState({
    label: "Pending",
    value: "pending",
  });  
  const [clientName, setClientName] = useState("");
  const [salesPersonName, setSalespersonName] = useState("");
  const [listingBroker, setListingBroker] = useState("");
  const [sellingBroker, setSellingBroker] = useState("");
  const [selectedProperty, setSelectedProperty] = useState("");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const [clients, setClients] = useState([]);
  const [salesPersons, setSalesPersons] = useState([]);
  const [properties, setProperties] = useState([]);

  const fetchClients = async () => {
    try {
      const response = await getRequest("clients");
      const filteredClients = response?.data?.filter(
        (client) => !client.isDeleted
      );
      const formattedClients = filteredClients?.map((client) => ({
        value: client?._id,
        label: client.name,
        address: client.address,
        email: client.email,
        phone: client.phoneNumber,
      }));
      setClients(formattedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  const fetchSalespersons = async () => {
    try {
      const response = await getRequest("users");
      const filteredUsers = response?.data?.filter((user) => !user.isDeleted);
      const formattedUsers = filteredUsers?.map((user) => ({
        value: user?._id,
        label: user.name,
        address: user.address,
        email: user.email,
        phone: user.contact_number,
      }));
      setSalesPersons(formattedUsers);
    } catch (error) {
      console.error("Error fetching brokers:", error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await getRequest("properties");
      const filteredProperties = response?.data?.filter(
        (property) => !property.isDeleted
      );
      const formattedProperties = filteredProperties?.map((property) => ({
        value: property._id,
        label: property.title,
        address: property.address,
        type: property.property_type,
        description: property.description,
      }));
      setProperties(formattedProperties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const fetchNextInvoiceNumber = async () => {
    try {
      const response = await getRequest("invoice/next-number");
      const invoiceNumber = response?.data; // ensure you access correctly
      if (invoiceNumber) {
        setValue("invoiceNumber", invoiceNumber);
        console.log("Next invoice number:", invoiceNumber);
      }
    } catch (error) {
      console.error("Failed to fetch invoice number", error);
    }
  };
  
  
  useEffect(() => {
    // setValue("invoiceNumber", uuidv4());
    fetchNextInvoiceNumber();
    fetchClients();
    fetchSalespersons();
    fetchProperties();
  }, []);

  // Sync external state with form values using setValue
  useEffect(() => {
    setValue("status", invoiceStatus?.value || "");
    setValue("buyer", clientName?.value || "");
    setValue("client_address", clientName?.address || "");
    setValue("client_email", clientName?.email || "");
    setValue("client_phone", clientName?.phone || "");

    setValue("seller", salesPersonName?.value || "");
    setValue("salesperson_address", salesPersonName?.address || "");
    setValue("salesperson_email", salesPersonName?.email || "");
    setValue("salesperson_phone", salesPersonName?.phone || "");

    // setValue("listing_broker_id", listingBroker?.value || "");
    // setValue("selling_broker_id", sellingBroker?.value || "");

    setValue("property", selectedProperty?.value || "");
    setValue("property_address", selectedProperty?.address || "");
    setValue("property_type", selectedProperty?.type || "");
    setValue("property_description", selectedProperty?.description || "");
  }, [invoiceStatus, clientName, salesPersonName, selectedProperty, setValue]);

  // Function to calculate item_total based on item_quantity and item_price
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      const updatedItems = getValues("items")?.map((item, index) => {
        const price = parseFloat(item.price) || 0; // Ensure price is a number
        const gst = parseFloat((price * 0.05).toFixed(2)); // Calculate GST and round
        const qst = parseFloat((price * 0.09975).toFixed(2)); // Calculate QST and round

        // Ensure the total is also rounded to 2 decimal places
        const total = parseFloat((price + gst + qst).toFixed(2));

        // Only update if the value has changed to prevent unnecessary re-renders
        if (item.total !== total) {
          setValue(`items.${index}.total`, total, { shouldDirty: true });
        }
        if (item.gst !== gst) {
          setValue(`items.${index}.gst`, gst, { shouldDirty: true });
        }
        if (item.qst !== qst) {
          setValue(`items.${index}.qst`, qst, { shouldDirty: true });
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

    items?.map((item) => {
      // Ensure item_price is a number
      const price = parseFloat(item.price) || 0;

      // Calculate GST (5% of price) and round to 2 decimals
      const gst = parseFloat((price * 0.05).toFixed(2));

      // Calculate QST (9.75% of price) and round to 2 decimals
      const qst = parseFloat((price * 0.09975).toFixed(2));

      // Calculate total (price + gst + qst)
      const total = parseFloat((price + gst + qst).toFixed(2));

      // Update grand totals
      grandTotal.totalPrice += price;
      grandTotal.totalGst += gst;
      grandTotal.totalQst += qst;
      grandTotal.totalItemTotal += total;

      return {
        ...item,
        price: price,
        gst: gst,
        qst: qst,
        total: total,
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

  const onSubmit = async (data) => {
    const { invoiceDate, dueDate, status, buyer, seller, property, instrumentalNotary, notes, items } = data;

    const formData = {
      invoiceDate,
      dueDate,
      status,
      buyer,
      seller,
      property,
      instrumentalNotary,
      notes,
      items,
    };

    setLoading(true);
    try {
      const response = await postRequest("invoices", formData);
      if (response) {
        toast.success("Invoice created successfully!");
        push("/invoices");
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
