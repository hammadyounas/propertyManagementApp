import useForgotPasswordForm from "../../functional/organisms/useForgotPasswordForm";
import ForgotPasswordFormUI from "../../ui/organisms/ForgotPasswordFormUI";

const ForgotPasswordFormContainer = () => {
  const { register, errors, handleSubmit, onSubmit, loading } =
    useForgotPasswordForm();
  return (
    <ForgotPasswordFormUI
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};

export default ForgotPasswordFormContainer;
