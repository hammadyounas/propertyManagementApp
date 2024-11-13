import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";

const useAcm = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [acms, setAcms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();

  useEffect(() => {
    setAcms(rows);
  }, []);

  // Calculate the paginated users
  const paginatedAcms = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return acms.slice(startIndex, startIndex + pageSize);
  }, [acms, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  return {
    globalFilter,
    setGlobalFilter,
    acms,
    setAcms,
    paginatedAcms, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
  };
};

export default useAcm;
