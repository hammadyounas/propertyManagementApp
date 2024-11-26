import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { deleteRequest, getRequest } from "../../../../libs/utils/request_handler";
import toast from "react-hot-toast";

const useClients = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();

  const fetchClients = async () => {
    try {
      const response = await getRequest('clients');
      console.log(response);
      const filteredUsers = response.data.filter((user) => !user.isDeleted);
      console.log(filteredUsers);
      setUsers(filteredUsers);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }   
  }
  
  useEffect(() => {
    fetchClients();
    // setUsers(rows);
  }, []);

  // Calculate the paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return users?.slice(startIndex, startIndex + pageSize);
  }, [users, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const deleteClientById = async (id) => {
    try {
      const response = await deleteRequest(`clients/${id}`);
      if(response){
        setUsers(users.filter((user) => user.id !== id));
        fetchClients();
        console.log(response);
        toast.success("Client deleted successfully!");
      } else{
        toast.error("Failed to delete client!");
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error("Error deleting client!");
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
    deleteClientById
  };
};

export default useClients;
