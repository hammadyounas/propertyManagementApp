import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../libs/utils/request_handler";

const useDashboardOld = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [dashboardEntries, setDashboardEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const pageSize = 10;
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [totalEntries, setTotalEntries] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");
  const [brokerOptions, setBrokerOptions] = useState([
    { label: "All", value: "all" },
  ]);
  const [selectedBroker, setSelectedBroker] = useState(null);

  const fetchDashboardEntries = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      const searchQuery = (globalFilter || "").trim();

      params.append("page", currentPage);
      params.append("limit", pageSize);

      if (selectedBroker && selectedBroker.value !== "all") {
        params.append("search", selectedBroker.value); // Backend should handle ?broker=name
      }

      if (["pending", "submitted", "paid"].includes(statusFilter)) {
        params.append("invoice", statusFilter);
      }

      let url = `dashboard`;
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await getRequest(url);

      // Use the createdByNames directly from the response
      if (brokerOptions.length === 1) {
        const uniqueBrokerOptions =
          response?.data?.createdByNames?.map((name) => ({
            label: name,
            value: name,
          })) || [];
        setBrokerOptions([
          { label: "All", value: "all" },
          ...uniqueBrokerOptions,
        ]);
      }

      const filteredEntries = response?.data?.data?.filter(
        (entry) => !entry.isDeleted
      );

      setDashboardEntries(filteredEntries || []);
      setTotalEntries(response.data?.totalCount || 0);

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

  const handleOpenCommentModal = (comment) => {
    setSelectedComment(comment);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    fetchDashboardEntries();
  }, [statusFilter, globalFilter, currentPage, selectedBroker]);

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
    handleOpenCommentModal,
    handleCloseModal,
    selectedComment,
    isModalOpen,
    brokerOptions,
    setBrokerOptions,
    selectedBroker,
    setSelectedBroker,
  };
};

export default useDashboardOld;
