import { useLoginForm } from "../../functional/organisms/useLoginForm";
import FormUI from "../../ui/organisms/FormUI";

export const FormContainer = () => {
  const { register, errors, handleSubmit, onSubmit, loading } = useLoginForm();
  return (
    <FormUI
      register={register}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};
