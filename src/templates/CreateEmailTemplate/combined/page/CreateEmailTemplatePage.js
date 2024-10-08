import useForm from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";

const CreateEmailTemplatePage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    push,
    emailEditorRef,
    templateLoading,
    handleTemplateLoaded,
  } = useForm();
  return (
    <FormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
      emailEditorRef={emailEditorRef}
      templateLoading={templateLoading}
      handleTemplateLoaded={handleTemplateLoaded}
    />
  );
};

export default CreateEmailTemplatePage;
