import { useEffect, useMemo, useState } from "react";
// import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { deleteRequest, getRequest } from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";

const useSalesTeam = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 10;
  const { push } = useRouter();

  const fetchUsers = async () => {
    setLoading(true); 
    try {
      const response = await getRequest('users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
    
  }
  useEffect(() => {
    fetchUsers();

    // setUsers(rows);
  }, []);

  // Calculate the paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }, [users, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const handleDelete = async (id) => {
    try {
      await deleteRequest(`user/${id}`);
      fetchUsers();
      toast.success("Salesperson deleted successfully.");
    } catch (error) {
      console.error("Error:", error); // Log errors
      toast.error(error.message || "An error occurred while deleting property.");
    }
  }

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
  };
};

export default useSalesTeam;
