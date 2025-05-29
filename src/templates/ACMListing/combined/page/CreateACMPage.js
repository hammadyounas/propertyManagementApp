import CreateACM from "../organisms/createACMContainer";
import useForm from "../../functionality/page/useForm";

export default function CreateACMPage() {
  const {
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
  } = useForm();
  return (
    <CreateACM
      register={register}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      errors={errors}
      reset={reset}
      setValue={setValue}
      loading={loading}
      properties={properties}
      selectedProperty={selectedProperty}
      handleSelectProperty={handleSelectProperty}
      push={push}
      selectedSubjectProperty={selectedSubjectProperty}
      handleSelectSubjectProperty={handleSelectSubjectProperty}
    />
  );
}
