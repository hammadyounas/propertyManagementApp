import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  deleteRequest,
  getRequest,
} from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";

const useProperty = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const pageSize = 10;
  const { push } = useRouter();

  const [activeModal, setActiveModal] = useState(false);

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
      const params = new URLSearchParams();
      params.append("page", currentPage);
      params.append("limit", pageSize);
      if (globalFilter) {
        params.append("search", globalFilter.trim() || ""); // Backend should handle ?search=term

      }
      const response = await getRequest(`properties?${params.toString()}`);
      const filteredResponse = response?.data?.properties
        ?.filter((property) => !property.isDeleted)
        ?.map((property) => ({
          ...property,
        }));
      setProperties(filteredResponse);
      setTotalCount(response?.data?.total);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
    // setProperties(rows);
  }, [globalFilter, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteRequest(`properties/${currentItem}`);
      setDeleteLoading(false);
      closeDeleteModal();
      fetchProperties();
      toast.success("Property deleted successfully.");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting property!"
      );
      setDeleteLoading(false);
    }
  };

  return {
    globalFilter,
    setGlobalFilter,
    properties,
    setProperties,
    // paginatedProperties, // Return paginated properties
    pageSize,
    handlePageChange,
    currentPage,
    activeModal,
    closeModal,
    openModal,
    push,
    loading,
    handleDelete,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    totalCount,
  };
};

export default useProperty;
