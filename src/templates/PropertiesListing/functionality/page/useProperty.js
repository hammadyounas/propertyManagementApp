import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";

const useProperty = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [activeModal, setActiveModal] = useState(false)

  const closeModal = () => {
    setActiveModal(false);
  };

  const openModal = () => {
    setActiveModal(!activeModal);
  };

  useEffect(() => {
    setProperties(rows);
  }, []);

  // Calculate the paginated properties
  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return properties.slice(startIndex, startIndex + pageSize);
  }, [properties, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  return {
    globalFilter,
    setGlobalFilter,
    properties,
    setProperties,
    paginatedProperties, // Return paginated properties
    pageSize,
    handlePageChange,
    currentPage,
    activeModal,
    closeModal,
    openModal
  };
};

export default useProperty;
