import InvoiceInformationUI from "../../ui/molecules/InvoiceInformationUI";

const InvoiceInformation = ({
  register,
  errors,
  loading,
  invoiceStatus,
  handleSelectInvoiceStatus,
  invoiceStatuses,
}) => {
  return (
    <InvoiceInformationUI
      register={register}
      errors={errors}
      loading={loading}
      invoiceStatus={invoiceStatus}
      handleSelectInvoiceStatus={handleSelectInvoiceStatus}
      invoiceStatuses={invoiceStatuses}
    />
  );
};

export default InvoiceInformation;
