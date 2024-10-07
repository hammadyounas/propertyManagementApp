import Textinput from "@/components/ui/atoms/TextInput";
import ReactSelect from "react-select";

const SalespersonInformationUI = ({
  register,
  errors,
  loading,
  salesPersonName,
  handleSelectSalespersonName,
  salesPersons,
}) => {
  return (
    <div className="mt-8">
      <h6>Salesperson Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="mt-2 w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Salesperson Name*</div>
            <ReactSelect
              name="salesperson_id"
              value={salesPersonName}
              onChange={handleSelectSalespersonName}
              options={salesPersons}
              placeholder="Salesperson Name"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.salesperson_id && !salesPersonName && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.salesperson_id?.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="salesperson_address"
              label="Salesperson Address"
              type="text"
              register={register}
              error={errors.salesperson_address}
              placeholder="Selected Salesperson Address"
              disabled={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="salesperson_email"
              label="Salesperson Email"
              type="text"
              register={register}
              error={errors.salesperson_email}
              placeholder="Selected Salesperson Email"
              disabled={true}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="salesperson_phone"
              label="Salesperson Phone Number"
              type="text"
              register={register}
              error={errors.salesperson_phone}
              placeholder="Selected Salesperson Phone Number"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalespersonInformationUI;
