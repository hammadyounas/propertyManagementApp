import Select from "../../../../components/combined/molecules/SelectUIContainer";
import { Controller } from "react-hook-form";
const SalesInformationUI = ({
  register,
  control,
  salesPerson,
  clients,
  errors,
  loading,
}) => {
  return (
    <div className="mt-8">
      <h6>Sales Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Controller
              name="assigned_to"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Assigned To*"}
                  options={salesPerson}
                  isSearchable
                  placeholder="Select Salesperson"
                  register={register}
                  disabled={loading}
                  error={errors.assigned_to}
                />
              )}
            />
            <div className="mt-4">
              <h6 className="text-sm font-semibold mb-4">
                Salesperson Contact Information:
              </h6>
              <p className="text-sm">
                <span className="font-semibold">Phone: 123456789</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email: test@gmail.com</span>
              </p>
            </div>
          </div>
          <div className="w-full md:w-[49%]">
            <Controller
              name="client"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Client*"}
                  options={clients}
                  isSearchable
                  placeholder="Select Client"
                  register={register}
                  disabled={loading}
                  error={errors.client}
                />
              )}
            />
            <div className="mt-4">
              <h6 className="text-sm font-semibold mb-4">
                Client Contact Information:
              </h6>
              <p className="text-sm">
                <span className="font-semibold">Phone: 123456789</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Email: test@gmail.com</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInformationUI;
