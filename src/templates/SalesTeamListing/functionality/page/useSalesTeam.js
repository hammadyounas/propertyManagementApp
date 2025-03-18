import { useEffect, useMemo, useState } from "react";
// import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import {
  deleteRequest,
  getRequest,
} from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";

const useSalesTeam = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const { push } = useRouter();

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

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getRequest("users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching clients:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();

    // setUsers(rows);
  }, []);

    // 🔍 Search Filter: Filters brokers based on First Name, Last Name, or Contact Number
    const filteredUsers = useMemo(() => {
      if (!globalFilter) {
        return users;
      }
      return users.filter((user) => 
        ["name", "contact_number"].some((key)=>
        user[key]?.toLowerCase().includes(globalFilter.toLowerCase())
    ))
    }, [users, globalFilter]);

  // Calculate the paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredUsers.slice(startIndex, startIndex + pageSize);
  }, [filteredUsers, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      await deleteRequest(`user/${currentItem}`);
      setDeleteLoading(false);
      closeDeleteModal();
      fetchUsers();
      toast.success("Broker deleted successfully.");
    } catch (error) {
      console.error("Error deleting broker:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting broker!"
      );
      setDeleteLoading(false);
    }
  };

  return {
    globalFilter,
    setGlobalFilter,
    users,
    setUsers,
    paginatedUsers, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    handleDelete,
    showDeleteModal,
    closeDeleteModal,
    openDeleteModal,
    deleteLoading,
  };
};

export default useSalesTeam;
