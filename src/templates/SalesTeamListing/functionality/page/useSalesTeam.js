import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../libs/utils/request_handler";

const useSalesTeam = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();

  useEffect(() => {
    // const fetchClients = async () => {
    //   try {
    //     const response = await getRequest('users');
    //     setUsers(response.data);
    //   } catch (error) {
    //     console.error('Error fetching clients:', error);
    //   }
      
    // }
    // fetchClients();

    setUsers(rows);
  }, []);

  // Calculate the paginated users
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return users.slice(startIndex, startIndex + pageSize);
  }, [users, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
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
  };
};

export default useSalesTeam;
