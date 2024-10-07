import Textinput from "@/components/ui/atoms/TextInput";
import ReactSelect from "react-select";

const InvoiceInformationUI = ({
  register,
  errors,
  loading,
  invoiceStatus,
  handleSelectInvoiceStatus,
  invoiceStatuses,
}) => {
  return (
    <div>
      <h6>Invoice Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="invoice_id"
              label="Invoice ID"
              type="text"
              register={register}
              error={errors.invoice_id}
              placeholder="Invoice ID"
              disabled={true}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="invoice_date"
              label="Invoice Date*"
              type="date"
              register={register}
              error={errors.invoice_date}
              placeholder="Invoice Date"
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="due_date"
              label="Due Date"
              type="date"
              register={register}
              error={errors.due_date}
              placeholder="Due Date"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <div className="mt-4">
              <div className="my-2 text-sm font-medium">Invoice Status*</div>
              <ReactSelect
                name="invoice_status"
                value={invoiceStatus}
                onChange={handleSelectInvoiceStatus}
                options={invoiceStatuses}
                placeholder="Invoice Status"
                isDisabled={loading}
                className="text-sm"
              />
              {errors?.invoice_status && !invoiceStatus && (
                <p className="text-sm text-danger-500 mt-2">
                  {errors?.invoice_status?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInformationUI;
