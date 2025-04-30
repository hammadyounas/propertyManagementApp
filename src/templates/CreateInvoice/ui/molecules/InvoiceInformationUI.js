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
              name="invoiceNumber"
              label="Invoice Number"
              type="text"
              register={register}
              error={errors.invoiceNumber}
              placeholder="Invoice ID"
              disabled={true}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="invoiceDate"
              label="Invoice Date*"
              type="date"
              register={register}
              error={errors.invoiceDate}
              placeholder="Invoice Date"
              disabled={loading}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="dueDate"
              label="Due Date*"
              type="date"
              register={register}
              error={errors.dueDate}
              placeholder="Due Date"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <div className="mt-4">
              <div className="my-2 text-sm font-medium">Invoice Status*</div>
              <ReactSelect
                name="status"
                value={invoiceStatus}
                onChange={handleSelectInvoiceStatus}
                options={invoiceStatuses}
                placeholder="Invoice Status"
                isDisabled={true}
                className="text-sm"
              />
              {errors?.status && !invoiceStatus && (
                <p className="text-sm text-danger-500 mt-2">
                  {errors?.status?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="gstNumber"
              label="GST Number*"
              type="text"
              register={register}
              error={errors.gstNumber}
              placeholder="GST Number"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
          <Textinput
              name="qstNumber"
              label="QST Number*"
              type="text"
              register={register}
              error={errors.qstNumber}
              placeholder="QST Number"
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceInformationUI;
