import Card from "../../../../components/combined/molecules/CardUIContainer";
import { ProgressBar } from "../../../../components/ui/atoms/ProgressBar";
import { usePropertyForm } from "../../functionality/organisms/usePropertyForm";
import { FormActions } from "../../ui/organisms/FormActions";
import { FormSection } from "../../ui/organisms/FormSections";


const CreatePropertyPage = () => {
  const {
    // State
    formData,
    errors,
    loading,
    expandedSections,
    
    // Actions
    handleInputChange,
    handleSubmit,
    clearForm,
    toggleSection,
    
    // Utilities
    getNestedValue,
    getTotalFields,
    getFilledFields,
    getProgressPercentage,
    getSectionErrors,
    
    // Data
    formSections,
  } = usePropertyForm();

  const totalFields = getTotalFields();
  const filledFields = getFilledFields();
  const progressPercentage = getProgressPercentage();

  return ( 
    <Card className="w-full bg-white" title="Create Property">

      <div className="space-y-6">
        {formSections.map((section, index) => (
          <FormSection
            key={index}
            section={section}
            index={index}
            isExpanded={expandedSections[index]}
            onToggle={toggleSection}
            errors={errors}
            formData={formData}
            onInputChange={handleInputChange}
            getNestedValue={getNestedValue}
            getSectionErrors={getSectionErrors}
          />
        ))}

        <FormActions
          filledFields={filledFields}
          totalFields={totalFields}
          onClearForm={clearForm}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </Card>
  );
};

export default CreatePropertyPage;