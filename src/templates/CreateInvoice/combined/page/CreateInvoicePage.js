import useCreateInvoice from "../../functionality/organisms/useForm";
import FormUI from "../../ui/organisms/FormUI";
import AdditionalInformation from "../molecules/AdditionalInformtionUIContainer";
import ClientInformation from "../molecules/ClientInformationUIContainer";
import InvoiceInformation from "../molecules/InvoiceInformationUIContainer";
import Items from "../molecules/ItemsUIContainer";
import PropertyDetails from "../molecules/PropertyDetailsUIContainer";
import SalespersonInformation from "../molecules/SalespersonInformationUIContainer";
import Button from "../../../../components/ui/atoms/Button";

const CreateInvoicePage = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    getValues,
    setValue,
    loading,
    push,
    invoiceStatus,
    invoiceStatuses,
    handleSelectInvoiceStatus,
    clientName,
    handleSelectClientName,
    clients,
    salesPersonName,
    handleSelectSalespersonName,
    salesPersons,
    listingBrokerName,
    handleSelectListingBroker,
    listingBrokers,
    sellingBrokerName,
    handleSelectSellingBroker,
    sellingBrokers,
    selectedProperty,
    handleSelectProperty,
    properties,
    fields,
    append,
    remove,
    total,
    user,
  } = useCreateInvoice();
  return (
    <FormUI handleSubmit={handleSubmit} onSubmit={onSubmit}>
      <InvoiceInformation
        register={register}
        errors={errors}
        loading={loading}
        invoiceStatus={invoiceStatus}
        handleSelectInvoiceStatus={handleSelectInvoiceStatus}
        invoiceStatuses={invoiceStatuses}
      />
      <ClientInformation
        register={register}
        errors={errors}
        loading={loading}
        clientName={clientName}
        handleSelectClientName={handleSelectClientName}
        clients={clients}
      />
      <SalespersonInformation
        register={register}
        errors={errors}
        loading={loading}
        salesPersonName={salesPersonName}
        handleSelectSalespersonName={handleSelectSalespersonName}
        salesPersons={salesPersons}
        listingBrokerName={listingBrokerName}
        handleSelectListingBroker={handleSelectListingBroker}
        listingBrokers={listingBrokers}
        sellingBrokerName={sellingBrokerName}
        handleSelectSellingBroker={handleSelectSellingBroker}
        sellingBrokers={sellingBrokers}
        user={user}
      />
      <PropertyDetails
        register={register}
        errors={errors}
        loading={loading}
        selectedProperty={selectedProperty}
        handleSelectProperty={handleSelectProperty}
        properties={properties}
      />
      <Items
        register={register}
        errors={errors}
        loading={loading}
        fields={fields}
        append={append}
        remove={remove}
        getValues={getValues}
        setValue={setValue}
      />
      <AdditionalInformation
        register={register}
        loading={loading}
        total={total}
      />
      <div className="flex justify-center md:justify-end mt-12">
        <Button
          text={"Discard"}
          className={
            "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
          }
          onClick={() => push("/invoices")}
          loading={loading}
        />
        <Button
          text={"Submit"}
          className={"md:!w-36"}
          type="submit"
          loading={loading}
        />
      </div>
    </FormUI>
  );
};

export default CreateInvoicePage;
