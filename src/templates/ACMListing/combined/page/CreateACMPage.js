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
    isGeneratingPDF,
    properties,
    filteredCompareProperties,
    selectedBaseProperty,
    handleSelectBaseProperty,
    selectedCompareProperties,
    handleSelectCompareProperties,
    preparedFor,
    handlePreparedForChange,
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
      isGeneratingPDF={isGeneratingPDF}
      properties={properties}
      filteredCompareProperties={filteredCompareProperties}
      selectedBaseProperty={selectedBaseProperty}
      handleSelectBaseProperty={handleSelectBaseProperty}
      selectedCompareProperties={selectedCompareProperties}
      handleSelectCompareProperties={handleSelectCompareProperties}
      preparedFor={preparedFor}
      handlePreparedForChange={handlePreparedForChange}
      push={push}
    />
  );
}
