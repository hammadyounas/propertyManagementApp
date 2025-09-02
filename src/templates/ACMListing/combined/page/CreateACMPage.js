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
    filteredCompareProperties,
    selectedBaseProperty,
    handleSelectBaseProperty,
    selectedCompareProperties,
    handleSelectCompareProperties,
    push,
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
      filteredCompareProperties={filteredCompareProperties}
      selectedBaseProperty={selectedBaseProperty}
      handleSelectBaseProperty={handleSelectBaseProperty}
      selectedCompareProperties={selectedCompareProperties}
      handleSelectCompareProperties={handleSelectCompareProperties}
      push={push}
    />
  );
}
