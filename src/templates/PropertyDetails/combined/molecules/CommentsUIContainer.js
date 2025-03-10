import useComments from "../../functionality/molecules/useComments";
import CommentsUI from "../../ui/molecules/CommentsUI";

const Comments = ({user}) => {
  const {
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
  } = useComments();
  return (
    <CommentsUI
      comments={comments}
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      setCurrentCommentId={setCurrentCommentId}
      currentComment={currentComment}
      openModal={openModal}
      closeModal={closeModal}
      loading={loading}
      activeModal={activeModal}
      loadingComments={loadingComments}
      error={error}
      deleteCommentById={deleteCommentById}
      showDeleteModal={showDeleteModal}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      deleteLoading={deleteLoading}
      user={user}
    />
  );
};

export default Comments;
