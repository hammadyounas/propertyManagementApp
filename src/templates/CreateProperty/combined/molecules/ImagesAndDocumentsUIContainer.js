import ImagesAndDocumentsUI from "../../ui/molecules/ImagesAndDocumentsUI";

const ImagesAndDocuments = ({
  selectedImages,
  handleImagesChange,
  selectedDocs,
  handleDocsChange,
  handleFileRemove,
  errors,
  loading,
  imageInputRef,
  docInputRef,
  triggerImageFileInput,
  triggerDocFileInput,
  renderPreview,
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
      imageInputRef={imageInputRef}
      docInputRef={docInputRef}
      triggerImageFileInput={triggerImageFileInput}
      triggerDocFileInput={triggerDocFileInput}
      renderPreview={renderPreview}
    />
  );
};

export default ImagesAndDocuments;
