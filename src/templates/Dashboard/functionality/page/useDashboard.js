import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../libs/utils/request_handler";

const useDashboard = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [dashboardEntries, setDashboardEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const pageSize = 10;
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);


  const fetchDashboardEntries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const searchQuery = (globalFilter || "").trim();
  
      params.append("page", currentPage);
      params.append("limit", pageSize);
  
      if (searchQuery !== "") {
        params.append("search", searchQuery);
      }
  
      if (["pending", "submitted", "paid"].includes(statusFilter)) {
        params.append("invoice", statusFilter);
      }
  
      let url = `dashboard`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
  
      const response = await getRequest(url);
      console.log("Response:", response); // Add this line to inspect totalCount
  
      const filteredEntries = response?.data?.data?.filter(
        (entry) => !entry.isDeleted
      );
  
      setDashboardEntries(filteredEntries || []);
      setTotalEntries(response.data?.totalCount || 0);
      console.log("Total entries:", totalEntries); // Add this line to inspect totalCount
  
      // If totalCount is available from backend:
      if (response?.totalCount) {
        setTotalEntries(response.totalCount);
      }
  
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching dashboard entries:", error);
    }
  };
  
  useEffect(() => {
    fetchDashboardEntries();
  }, [statusFilter, globalFilter, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  return {
    globalFilter,
    setGlobalFilter,
    dashboardEntries,
    setDashboardEntries,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    statusFilter,
    setStatusFilter,
    setSelectedFilter,
    selectedFilter,
    totalEntries,
  };
};

export default useDashboard;
