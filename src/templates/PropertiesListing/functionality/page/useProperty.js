import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteRequest, getRequest } from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";

const useProperty = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      // // Fetch sales persons
      // const salesPersonsResponse = await getRequest('users');
      // const salesPersonsData = salesPersonsResponse.data.map((salesPerson) => ({
      //   id: salesPerson._id,
      //   name: salesPerson.name,
      // }));
  
      // // Create a map for quick lookup of user names by their ID
      // const salesPersonsMap = Object.fromEntries(
      //   salesPersonsData.map((user) => [user.id, user.name])
      // );
  
      // console.log('Sales Persons Map:', salesPersonsMap);
  
      // Fetch properties
      const response = await getRequest('properties');
      const filteredResponse = response.data
        .filter((property) => !property.isDeleted)
        .map((property) => ({
          ...property,
        }));
  
      console.log('Filtered Properties:', filteredResponse);
  
      setProperties(filteredResponse);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };
  

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
    loading,
    handleDelete,
  };
};

export default useProperty;
