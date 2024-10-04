import { useRef } from "react";
import FileInput from "../../../../components/combined/atoms/FileInputUIContainer";
import { File, Plus } from "lucide-react";

const ImagesAndDocumentsUI = ({
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
    <div className="mt-8">
      <h6>Images & Documents</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <h6 className="text-sm font-semibold mb-4">
              Images* (jpg, png, or gif format supported)
            </h6>
            <input
              disabled={loading}
              type="file"
              ref={imageInputRef}
              name="images"
              multiple
              onChange={handleImagesChange}
              className="hidden"
            />
            <div className="mt-4 flex flex-wrap items-center">
              {renderPreview(selectedImages, "image")}
              <div className="h-[185px] w-44 flex flex-col justify-center items-center border border-1 border-dashed mt-4 mr-4 p-4">
                <Plus
                  size={50}
                  onClick={() => triggerImageFileInput(imageInputRef)}
                />
                <p className="font-bold mt-2">Images</p>
              </div>
            </div>
            {errors?.images && selectedImages.length === 0 && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.images?.message}
              </p>
            )}
          </div>
          <div className="w-full mt-8">
            <h6 className="text-sm font-semibold mb-4">
              Documents (Optional - pdf, doc, or docx format supported)
            </h6>
            <input
              disabled={loading}
              type="file"
              ref={docInputRef}
              name="documents"
              multiple
              onChange={handleDocsChange}
              className="hidden"
            />
            <div className="mt-4 flex flex-wrap items-center">
              {renderPreview(selectedDocs, "doc")}
              <div className="h-[185px] w-44 flex flex-col justify-center items-center border border-1 border-dashed mt-4 mr-4 p-4">
                <Plus
                  size={50}
                  onClick={() => triggerDocFileInput(docInputRef)}
                />
                <p className="font-bold mt-2">Documents</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesAndDocumentsUI;
