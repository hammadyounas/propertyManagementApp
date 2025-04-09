import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../libs/utils/request_handler";

const useDashboard = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [dashboardEntries, setDashboardEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchDashboardEntries = async () => {
    try {
      setLoading(true);
      const response = await getRequest("dashboard");
      const filteredEntries = response?.data?.filter(
        (entry) => !entry.isDeleted
      );
      setDashboardEntries(filteredEntries);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching dashboard entries:", error);
    }
  };

  useEffect(() => {
    fetchDashboardEntries();
  }, []);

  // useEffect(() => {
  //   setDashboardEntries(rows);
  // }, []);

  // Calculate the paginated users
const paginatedDashboardEntries = useMemo(() => {
  const startIndex = (currentPage - 1) * pageSize;
  return dashboardEntries?.slice(startIndex, startIndex + pageSize);
}, [dashboardEntries, currentPage, pageSize]);

// Pass paginatedDashboardEntries to Table and TableUI


  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  return {
    globalFilter,
    setGlobalFilter,
    dashboardEntries,
    setDashboardEntries,
    paginatedDashboardEntries, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
  };
};

export default useDashboard;
