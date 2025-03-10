import { Edit, Pencil, Plus, Trash2 } from "lucide-react";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import Modal from "../../../../components/combined/organisms/ModalUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import moment from "moment";
import ConfirmDeleteModal from "../../../../components/ui/molecules/ConfirmDeleteModal";

const CommentsUI = ({
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
  user
}) => {
  console.log('iser', user);
  
  return (
    <div className="my-8">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Comments</h2>
        <span
          className="flex items-center border-green-500 border p-2 text-green-500 rounded-md text-sm cursor-pointer"
          onClick={openModal}
        >
          <Pencil size={15} className="cursor-pointer mr-2" /> Write Comment
        </span>
      </div>
      {loadingComments ? (
        <div className="text-center p-4">Loading comments...</div>
      ) : comments?.length === 0 ? (
        <div className="text-center p-4">No comments yet.</div>
      ) : (
        comments?.map((comment, index) => (
          <div
            key={comment.id}
            className="border p-4 my-2 rounded-lg flex flex-col"
          >
            <div>
              {/* <p className="text-sm font-semibold">{comment.author}</p> */}

              <div className="flex items-center my-2">
                <img
                  src={
                    comment?.created_by?.avatar ||
                    "/assets/images/users/user-1.jpg"
                  } // Replace with actual avatar URL if available
                  alt={comment?.created_by?.name}
                  className="block w-8 h-8 object-cover rounded-full mr-2"
                />
                <p>{comment?.created_by?.name}</p>
              </div>

              <p className="text-sm">{comment.comment}</p>
              <p className="text-xs text-gray-500">
                {moment(comment?.createdAt).fromNow()}
              </p>
            </div>
            {(user?.role == "ADMIN" ||
              user?._id == comment?.created_by?._id) && (
              <div className="flex self-end mt-2">
                <Edit
                  size={22}
                  className="text-blue-500 cursor-pointer mr-4"
                  onClick={() => setCurrentCommentId(comment._id)}
                />
                <Trash2
                  size={22}
                  className="text-red-500 cursor-pointer"
                  // onClick={() => openDeleteModal(comment._id)}
                  onClick={() => deleteCommentById(comment?._id)}
                />
              </div>
            )}
          </div>
        ))
      )}

      <Modal
        title={currentComment ? "Update Comment" : "New Comment"}
        // label={"New Meeting"}
        labelClass="btn-outline-dark"
        activeModal={activeModal}
        onClose={() => closeModal()}
        centered
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textarea
            name="comment"
            type="text"
            register={register}
            error={errors.comment}
            placeholder="Write a comment"
            row={10}
            disabled={loading}
          />
          {error && <p className="text-center text-danger-500">{error}</p>}
          <div className="flex justify-center md:justify-end mt-12">
            <Button
              text={"Discard"}
              className={
                "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
              }
              onClick={() => closeModal()}
              loading={loading}
            />
            <Button
              text={"Submit"}
              className={"md:!w-36"}
              type="submit"
              loading={loading}
            />
          </div>
        </form>
      </Modal>
      {/* <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onDelete={deleteCommentById}
        text={"Are you sure you want to delete this comment?"}
        disabled={deleteLoading}
      /> */}
    </div>
  );
};

export default CommentsUI;
