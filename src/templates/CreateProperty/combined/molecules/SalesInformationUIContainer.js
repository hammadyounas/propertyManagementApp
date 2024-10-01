import SalesInformationUI from "../../ui/molecules/SalesInformationUI";

const SalesInformation = ({ register, control, salesPerson, clients }) => {
  return (
    <SalesInformationUI
      register={register}
      control={control}
      salesPerson={salesPerson}
      clients={clients}
    />
  );
};

export default SalesInformation;
