import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {fetchACM} from "../../../../store/features/acm/acmSlice"
import { selectACM, selectACMLoading, selectTotalCount } from "../../../../store/features/acm/acmSelectors";

const useAcm = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  // const [acms, setAcms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const dispatch = useDispatch();
  const acms = useSelector(selectACM);
  const totalCount = useSelector(selectTotalCount);
  const loading = useSelector(selectACMLoading);


  // useEffect(() => {
  //   setAcms(rows);
  // }, []);

    useEffect(() => {
      dispatch(
        fetchACM({
          search: globalFilter,
          page: currentPage,
          limit: pageSize,
        })
      );
    }, [dispatch, globalFilter, currentPage]);

      useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter]);

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
    // paginatedAcms, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    totalCount,
    loading,
  };
};

export default useAcm;
