import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../../../libs/utils/request_handler";
import { toast } from "react-toastify";

const useComments = () => {
  const schema = yup.object({
    comment: yup.string().required("Comment is required"),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const [comments, setComments] = useState([]);
  const [currentCommentId, setCurrentCommentId] = useState(null);
  const [currentComment, setCurrentComment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const { push, query } = useRouter();
  const [error, setError] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentItem(null);
  };

  const openDeleteModal = (id) => {
    setCurrentItem(id);
    setShowDeleteModal(!showDeleteModal);
  };

  const deleteCommentById = async (id) => {
    try {
      setDeleteLoading(true);
      const response = await deleteRequest(`comments/${id}`);
      if (response) {
        // setUsers(users.filter((user) => user.id !== id));
        fetchComments();
        closeDeleteModal();
        console.log(response);
        toast.success("Comment deleted successfully!");
      } else {
        toast.error("Failed to delete comment!");
      }
      setDeleteLoading(false);
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Error deleting comment!"
      );
      setDeleteLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const response = await getRequest(`comments?propertyId=${query.id}`);
      if (response) {
        setComments(response?.data);
      }
      setLoadingComments(false);
    } catch (error) {
      setLoadingComments(false);
      console.error("Failed to fetch comments.");
    }
  };

  useEffect(() => {
    if (query.id) {
      fetchComments();
    }
  }, [query.id]);

  const closeModal = () => {
    setActiveModal(false);
    setError(null);
    setCurrentComment(null);
    setCurrentCommentId(null);
    reset();
  };

  const openModal = () => {
    setActiveModal(!activeModal);
  };

  useEffect(() => {
    if (currentCommentId) {
      const current = comments?.find((m) => m._id == currentCommentId);
      setCurrentComment(current);
      for (const key in current) {
        {
          setValue(key, current[key]);
        }
      }
      setActiveModal(true);
    }
  }, [currentCommentId]);

  const onSubmit = async (data) => {
    setError(null);
    setLoading(true);
    try {
      // Prepare data for the API
      const formData = {
        comment: data?.comment,
      };

      if (currentCommentId) {
        // API call to update the user
        const response = await patchRequest(
          `comments/${currentCommentId}`,
          formData
        );
        if (response) {
          toast.success("Comment updated successfully!");
          fetchComments();
          closeModal();
        } else {
          toast.error("Comment update failed");
          throw new Error("Comment update failed");
        }
      } else {
        // API call to register the user
        const response = await postRequest(
          `comments?propertyId=${query.id}`,
          formData
        );
        console.log(response.code >= 200 && response.data.status <= 300);
        if (response) {
          toast.success("Comment created successfully!");
          fetchComments();
          closeModal();
        } else {
          toast.error("Comment created failed");
          throw new Error("Comment created failed");
        }
      }
    } catch (error) {
      setLoading(false);
      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
      // toast.error(error.message || "An error occurred while meeting creation.");
    } finally {
      setLoading(false); // Ensure loading state is turned off regardless of success or error
    }
  };

  return {
    comments,
    register,
    errors,
    handleSubmit,
    onSubmit,
    setCurrentCommentId,
    currentComment,
    openModal,
    closeModal,
    loading,
    activeModal,
    loadingComments,
    error,
    deleteCommentById,
    showDeleteModal,
    openDeleteModal,
    closeDeleteModal,
    deleteLoading,
  };
};

export default useComments;
