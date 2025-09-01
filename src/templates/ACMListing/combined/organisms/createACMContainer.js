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
  filteredCompareProperties,
  selectedBaseProperty,
  handleSelectBaseProperty,
  selectedCompareProperties,
  handleSelectCompareProperties,
  push,
}) => {
  return (
    <FormUI
      register={register}
      errors={errors}
      loading={loading}
      properties={properties}
      filteredCompareProperties={filteredCompareProperties}
      selectedBaseProperty={selectedBaseProperty}
      handleSelectBaseProperty={handleSelectBaseProperty}
      selectedCompareProperties={selectedCompareProperties}
      handleSelectCompareProperties={handleSelectCompareProperties}
      handleSubmit={handleSubmit}
      reset={reset}
      onSubmit={onSubmit}
      setValue={setValue}
      push={push}
    />
  );
};

export default CreateACM;
