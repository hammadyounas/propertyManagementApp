import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";

const CreateUserPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    push,

    status,
    handleSelectStatus,
    propertiesAssigned,
    handleSelectAssignedProperties,
    salespersonStatus,
    availableProperties,
  } = useForm();
  return (
    <FormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
      status={status}
      handleSelectStatus={handleSelectStatus}
      propertiesAssigned={propertiesAssigned}
      handleSelectAssignedProperties={handleSelectAssignedProperties}
      salespersonStatus={salespersonStatus}
      availableProperties={availableProperties}
    />
  );
};

export default CreateUserPage;
