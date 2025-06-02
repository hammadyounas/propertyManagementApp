import FormUI from "../../ui/organisms/FormUI";

const CreateACM = ({
  register,
  handleSubmit,
  onSubmit,
  errors,
  reset,
  setValue,
  loading,
  properties,
  selectedProperty,
  handleSelectProperty,
  push,
  selectedSubjectProperty,
  handleSelectSubjectProperty,
}) => {
  return (
    <FormUI
      register={register}
      errors={errors}
      loading={loading}
      properties={properties}
      selectedProperty={selectedProperty}
      handleSelectProperty={handleSelectProperty}
      handleSubmit={handleSubmit}
      reset={reset}
      onSubmit={onSubmit}
      setValue={setValue}
      push={push}
      selectedSubjectProperty={selectedSubjectProperty}
      handleSelectSubjectProperty={handleSelectSubjectProperty}
    />
  );
};

export default CreateACM;
