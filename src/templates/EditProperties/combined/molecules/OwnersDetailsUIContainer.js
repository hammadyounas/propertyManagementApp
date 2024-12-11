import OwnerDetailsUI from "../../ui/molecules/OwnerDetailsUI";

const OnwersDetails = ({
    register, errors, loading,  handleSelectOwnersDetailsStatus, ownersDetailstatus, ownerDetailsStatus, ownerDetails
}) => {
  return (
    <OwnerDetailsUI
      register={register}
      errors={errors}
      loading={loading}
      handleSelectOwnersDetailsStatus={handleSelectOwnersDetailsStatus}
      ownersDetailstatus={ownersDetailstatus}
      ownerDetailsStatus = {ownerDetailsStatus}
      ownerDetails = {ownerDetails}
    />
  );
};

export default OnwersDetails;
