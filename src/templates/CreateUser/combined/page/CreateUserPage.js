import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";

const CreateUserPage = () => {
  const { register, handleSubmit, onSubmit, errors, loading, push } = useForm();
  return (
    <FormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
    />
  );
};

export default CreateUserPage;
