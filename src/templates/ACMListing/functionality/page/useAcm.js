import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {fetchACM, deleteACM} from "../../../../store/features/acm/acmSlice"
import { selectACM, selectACMLoading, selectTotalCount } from "../../../../store/features/acm/acmSelectors";
import toast from "react-hot-toast";

const useAcm = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  // const [acms, setAcms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [downloadingPDF, setDownloadingPDF] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState({ images: [], title: '' });
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

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(true);
  };

  const openImageModal = (images, title) => {
    // Handle both single image and array of images
    const imageArray = Array.isArray(images) ? images : [images];
    setSelectedImages({ images: imageArray, title: title });
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImages({ images: [], title: '' });
  };

  const deleteACMById = async () => {
    try {
      setDeleteLoading(true);
      const result = await dispatch(deleteACM(currentItem));
      
      if (result.type === 'acm/deleteACM/fulfilled') {
        // Refresh the ACM list after successful deletion
        dispatch(fetchACM({
          search: globalFilter,
          page: currentPage,
          limit: pageSize,
        }));
        closeDeleteModal();
        toast.success("ACM deleted successfully!");
      } else {
        toast.error("Failed to delete ACM!");
      }
    } catch (error) {
      console.error("Error deleting ACM:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting ACM!"
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleGeneratePDF = async (acmId) => {
    try {
      setDownloadingPDF(true);
      
      // Find the ACM data from the current list
      const acmData = acms.find(acm => acm._id === acmId);
      
      if (!acmData) {
        toast.error("ACM data not found!");
        return;
      }

      // Import and use the PDF generation utility
      const { generateACMPDF } = await import("../../../../libs/utils/acm_template");
      await generateACMPDF(acmData);
      toast.success("PDF generated successfully!");
      
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloadingPDF(false);
    }
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
    deleteACMById,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
    handleGeneratePDF,
    downloadingPDF,
    showImageModal,
    selectedImages,
    openImageModal,
    closeImageModal,
  };
};

export default useAcm;
