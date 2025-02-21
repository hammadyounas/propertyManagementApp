import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";

const SendEmailPage = () => {
  const {
    register,
    control,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
    loading,
    push,
    brokers,
    clients,
    handleSelectRecipients,
    handleImageUpload,
    selectedImage,
    selectedType,
    setSelectedType,
    handleRemoveImage,
    recipients,
  } = useForm();
  return (
    <FormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
      brokers={brokers}
      clients={clients}
      handleSelectRecipients={handleSelectRecipients}
      handleImageUpload={handleImageUpload}
      selectedImage={selectedImage}
      selectedType={selectedType}
      setSelectedType={setSelectedType}
      handleRemoveImage={handleRemoveImage}
      recipients={recipients}
    />
  );
};

export default SendEmailPage;
