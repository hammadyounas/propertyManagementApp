import ResetPasswordFormUI from "../../ui/organisms/ResetPasswordUI";
import useResetPasswordForm from "../../functional/organisms/useResetPasswordForm";

const ResetPasswordFormContainer = () => {
  const { register, errors, handleSubmit, onSubmit, loading } =
    useResetPasswordForm();
  return (
    <ResetPasswordFormUI
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default ResetPasswordFormContainer;
