import OwnerDetailsUI from "../../ui/molecules/OwnerDetailsUI";

const OnwersDetails = ({
    register, errors, loading,  handleSelectOwnersDetailsStatus, ownersDetailstatus, ownerDetailsStatus
}) => {
  return (
    <OwnerDetailsUI
      register={register}
      errors={errors}
      loading={loading}
      handleSelectOwnersDetailsStatus={handleSelectOwnersDetailsStatus}
      ownersDetailstatus={ownersDetailstatus}
      ownerDetailsStatus = {ownerDetailsStatus}
    />
  );
};

export default OnwersDetails;
