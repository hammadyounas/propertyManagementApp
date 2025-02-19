import useEditSalesTeam from "../../functionality/page/useEditSalesTeam";
import EditFormUI from "../../ui/organisms/EditFormUI";

const EditSalesTeamPage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    loading,
    push,
    status,
    handleSelectStatus,
    propertiesAssigned,
    handleSelectAssignedProperties,
    salespersonStatus,
    availableProperties,
    getDataLoading,
  } = useEditSalesTeam();
  return (
    <EditFormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      loading={loading}
      register={register}
      errors={errors}
      push={push}
      status={status}
      handleSelectStatus={handleSelectStatus}
      propertiesAssigned={propertiesAssigned}
      handleSelectAssignedProperties={handleSelectAssignedProperties}
      salespersonStatus={salespersonStatus}
      availableProperties={availableProperties}
      getDataLoading={getDataLoading}
    />
  );
};

export default EditSalesTeamPage;
