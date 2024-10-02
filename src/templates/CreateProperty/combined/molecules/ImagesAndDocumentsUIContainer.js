import ImagesAndDocumentsUI from "../../ui/molecules/ImagesAndDocumentsUI";

const ImagesAndDocuments = ({
  selectedImages,
  handleImagesChange,
  selectedDocs,
  handleDocsChange,
  handleFileRemove,
  errors,
  loading,
}) => {
  return (
    <ImagesAndDocumentsUI
      selectedImages={selectedImages}
      handleImagesChange={handleImagesChange}
      selectedDocs={selectedDocs}
      handleDocsChange={handleDocsChange}
      handleFileRemove={handleFileRemove}
      errors={errors}
      loading={loading}
    />
  );
};

export default ImagesAndDocuments;
