import FileInput from "../../../../components/combined/atoms/FileInputUIContainer";

const ImagesAndDocumentsUI = ({
  selectedImages,
  handleImagesChange,
  selectedDocs,
  handleDocsChange,
  handleFileRemove,
  errors,
  loading,
}) => {
  return (
    <div className="mt-8">
      <h6>Images & Documents</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <h6 className="text-sm font-semibold mb-4">Images*</h6>
            <FileInput
              name="images"
              selectedFiles={selectedImages}
              onChange={handleImagesChange}
              multiple
              preview
              handleFileRemove={handleFileRemove}
              type="image"
              disabled={loading}
            />
            {errors?.images && selectedImages.length == 0 && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.images?.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[49%] mt-4 md:mt-0">
            <h6 className="text-sm font-semibold mb-4">Documents (optional)</h6>
            <FileInput
              name="documents"
              selectedFiles={selectedDocs}
              onChange={handleDocsChange}
              multiple
              preview
              handleFileRemove={handleFileRemove}
              type="doc"
              disabled={loading}
            />
            {errors?.documents && selectedDocs.length == 0 && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.documents?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesAndDocumentsUI;
