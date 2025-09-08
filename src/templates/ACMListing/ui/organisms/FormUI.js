import Card from "@/components/combined/molecules/CardUIContainer";
import ReactSelect from "react-select";
import Textinput from "@/components/ui/atoms/TextInput";
import Button from "../../../../components/ui/molecules/Button";
import PDFPreview from "../../../../components/PDFPreview";
import PDFGenerator from "../../../../components/PDFGenerator";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormUI({
  register,
  errors,
  loading,
  isGeneratingPDF,
  selectedBaseProperty,
  handleSelectBaseProperty,
  selectedCompareProperties,
  handleSelectCompareProperties,
  properties,
  filteredCompareProperties,
  push,
  handleSubmit,
  onSubmit,
  preparedFor,
  handlePreparedForChange,
}) {
  const [showPreview, setShowPreview] = useState(false);

  // Create preview data from current form selections
  const getPreviewData = () => {
    if (!selectedBaseProperty || !selectedCompareProperties || selectedCompareProperties.length < 3) {
      return null; // Don't show preview if form is incomplete
    }

    return {
      _id: "preview-" + Date.now(),
      base_property: {
        title: selectedBaseProperty.label || selectedBaseProperty.title || "Selected Base Property",
        property_type: selectedBaseProperty.property_type || "Commercial",
        address: selectedBaseProperty.address || "Property Address",
        description: selectedBaseProperty.description || "Property description",
        no_of_units: selectedBaseProperty.no_of_units || 25,
        property_status: selectedBaseProperty.property_status || "Active"
      },
      compare_property: selectedCompareProperties.map(prop => ({
        title: prop.label || prop.title || "Compare Property",
        property_type: prop.property_type || "Commercial",
        address: prop.address || "Property Address",
        description: prop.description || "Property description",
        no_of_units: prop.no_of_units || 20,
        property_status: prop.property_status || "Active"
      })),
      prepared_for: preparedFor || "Client Name",
      created_by: { name: "Current User" },
      createdAt: new Date(),
      updated_at: new Date(),
      isDeleted: false
    };
  };

  // Handle PDF generation
  const handleGeneratePDF = async () => {
    if (!selectedBaseProperty || !selectedCompareProperties || selectedCompareProperties.length < 3) {
      toast.error("Please select a base property and at least 3 compare properties before generating PDF");
      return;
    }

    setIsGeneratingPDF(true);
    try {
      const pdfData = getPreviewData();
      console.log('FormUI - pdfData:', pdfData);
      
      if (pdfData) {
        // Use the PDFGenerator component
        const { generateACMPDF } = await import("../../../../libs/utils/acm_template");
        console.log('FormUI - calling generateACMPDF with:', pdfData);
        await generateACMPDF(pdfData);
        toast.success("PDF generated successfully!");
      } else {
        toast.error("Failed to prepare PDF data. Please try again.");
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGeneratingPDF(false);
    }
  };
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Create ACM">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <div className="my-2 text-sm font-medium">Base Property*</div>
                <ReactSelect
                  name="base_property"
                  value={selectedBaseProperty}
                  onChange={handleSelectBaseProperty}
                  options={properties}
                  placeholder="Select Base Property"
                  isDisabled={loading}
                  className="text-sm"
                />
                {errors?.base_property && (
                  <p className="text-sm text-danger-500 mt-2">
                    {errors?.base_property?.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-[49%]">
                <div className="my-2 text-sm font-medium">Compare Properties* (Total 3)</div>
                <ReactSelect
                  name="compare_property"
                  isMulti
                  value={selectedCompareProperties}
                  onChange={handleSelectCompareProperties}
                  options={filteredCompareProperties}
                  placeholder="Select Compare Properties"
                  isDisabled={loading}
                  className="text-sm"
                />
                {errors?.compare_property && (
                  <p className="text-sm text-danger-500 mt-2">
                    {errors?.compare_property?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-6">
              <div className="w-full md:w-[49%]">
                <div className="my-2 text-sm font-medium">Prepared For*</div>
                <Textinput
                  register={register}
                  name="prepared_for"
                  value={preparedFor}
                  onChange={handlePreparedForChange}
                  placeholder="Enter Client Name"
                  disabled={loading}
                  className="text-sm -mt-2 first-letter:uppercase"
                />
                {errors?.prepared_for && (
                  <p className="text-sm text-danger-500 mt-2">
                    {errors?.prepared_for?.message}
                  </p>
                )}
              </div>
            </div>

            {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-primary-default mb-2">ACM Information</h4>
              <p className="text-sm text-primary-default">
                <strong>Base Property:</strong> The main property for comparison analysis<br/>
                <strong>Compare Properties:</strong> At least 3 properties to compare against the base property<br/>
                <strong>Report Generation:</strong> Clicking "Save & Generate Report" will save the ACM data and automatically generate a comprehensive multi-page PDF report
              </p>
            </div> */}

            <div className="flex justify-center md:justify-end mt-12 gap-4">
              <Button
                text={"Discard"}
                className={
                  "md:!w-36 bg-transparent border border-black-default !text-black-default"
                }
                onClick={() => push("/acms")}
                loading={loading}
              />
              {/* <Button
                text={"Preview PDF"}
                className={"md:!w-36 bg-green-600 text-white hover:bg-green-700"}
                onClick={() => setShowPreview(true)}
                disabled={!selectedBaseProperty || !selectedCompareProperties || selectedCompareProperties.length < 3}
                type="button"
              />
              <Button
                text={isGeneratingPDF ? "Generating..." : "Generate PDF"}
                className={"md:!w-36 bg-blue-600 text-white hover:bg-blue-700"}
                onClick={handleGeneratePDF}
                disabled={!selectedBaseProperty || !selectedCompareProperties || selectedCompareProperties.length < 3 || isGeneratingPDF}
                type="button"
              /> */}
              <Button
                text={
                  loading && !isGeneratingPDF 
                    ? "Saving..." 
                    : isGeneratingPDF 
                    ? "Generating PDF..." 
                    : "Save & Generate Report"
                }
                className={"bg-primary-default text-white md:!w-48"}
                type="submit"
                loading={loading}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </Card>

      {/* PDF Preview Modal */}
      {showPreview && (
        <PDFPreview 
          acmData={getPreviewData()}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
