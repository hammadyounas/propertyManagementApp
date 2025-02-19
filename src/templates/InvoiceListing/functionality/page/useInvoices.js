import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../libs/utils/request_handler";

const useInvoices = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const [loading, setLoading] = useState(false)

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const response = await getRequest("invoices");
      const filteredInvoices = response?.data?.filter(
        (invoice) => !invoice.isDeleted
      );
      setInvoices(filteredInvoices);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    // setInvoices(rows);
  }, []);

  // Calculate the paginated users
  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return invoices.slice(startIndex, startIndex + pageSize);
  }, [invoices, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  return {
    globalFilter,
    setGlobalFilter,
    invoices,
    setInvoices,
    paginatedInvoices, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading
  };
};

export default useInvoices;
