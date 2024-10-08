import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";

const useEmailTemplates = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [templates, setTemplates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();

  useEffect(() => {
    setTemplates(rows);
  }, []);

  // Calculate the paginated users
  const paginatedTemplates = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return templates.slice(startIndex, startIndex + pageSize);
  }, [templates, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  return {
    globalFilter,
    setGlobalFilter,
    templates,
    setTemplates,
    paginatedTemplates, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
  };
};

export default useEmailTemplates;
