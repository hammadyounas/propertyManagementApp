import AdditionalInformationUI from "../../ui/molecules/AdditionalInformationUI";

const AdditionalInformation = ({ register, loading, total }) => {
  return (
    <AdditionalInformationUI
      register={register}
      loading={loading}
      total={total}
    />
  );
};

export default AdditionalInformation;
