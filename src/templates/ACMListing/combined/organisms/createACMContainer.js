import FormUI from "../../ui/organisms/FormUI";

const CreateACM = ({
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
}) => {
  return (
    <FormUI
      register={register}
      errors={errors}
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
      handleSubmit={handleSubmit}
      reset={reset}
      onSubmit={onSubmit}
      setValue={setValue}
      push={push}
    />
  );
};

export default CreateACM;
