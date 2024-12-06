import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { deleteRequest, getRequest } from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";

const useProperty = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const {push} = useRouter()

  const [activeModal, setActiveModal] = useState(false)

  const closeModal = () => {
    setActiveModal(false);
  };

  const openModal = () => {
    setActiveModal(!activeModal);
  };

  const fetchProperties = async () => {
    try {
      const response = await getRequest('properties')
      const filteredResponse = response.data.filter((property) => !property.isDeleted);
      setProperties(filteredResponse);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  }

  useEffect(() => {
    fetchProperties();
    // setProperties(rows);
  }, []);

  // Calculate the paginated properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return properties.slice(startIndex, startIndex + pageSize);
  }, [properties, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`properties/${id}`);
      fetchProperties();
      toast.success("Property deleted successfully.");
    } catch (error) {
      console.error("Error:", error); // Log errors
      toast.error(error.message || "An error occurred while deleting property.");
    }
  }

  return {
    globalFilter,
    setGlobalFilter,
    properties,
    setProperties,
    paginatedProperties, // Return paginated properties
    pageSize,
    handlePageChange,
    currentPage,
    activeModal,
    closeModal,
    openModal,
    push,
    handleDelete,
  };
};

export default useProperty;
