import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import {
  deleteRequest,
  getRequest,
} from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";

const useInvoices = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const fetchEmails = async () => {
    try {
      setLoading(true);
      const response = await getRequest("email");
      const filteredInvoices = response?.data?.filter(
        (invoice) => !invoice.isDeleted
      );
      setEmails(filteredInvoices);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching emails:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  // Calculate the paginated users
  const paginatedEmails = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return emails.slice(startIndex, startIndex + pageSize);
  }, [emails, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const deleteEmail = async () => {
    try {
      setDeleteLoading(true);
      const response = await deleteRequest(`email/${currentItem}`);
      if (response) {
        // setUsers(users.filter((user) => user.id !== id));
        fetchEmails();
        closeDeleteModal();
        console.log(response);
        toast.success("Email deleted successfully!");
      } else {
        toast.error("Failed to delete email!");
      }
      setDeleteLoading(false);
    } catch (error) {
      console.error("Error deleting email:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting email!"
      );
      setDeleteLoading(false);
    }
  };

  return {
    globalFilter,
    setGlobalFilter,
    emails,
    setEmails,
    paginatedEmails, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    deleteEmail,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
  };
};

export default useInvoices;
