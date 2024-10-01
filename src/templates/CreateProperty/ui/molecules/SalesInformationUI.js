import Select from "../../../../components/combined/molecules/SelectUIContainer";
import { Controller } from "react-hook-form";
const SalesInformationUI = ({ register, control, salesPerson, clients }) => {
  return (
    <div className="mt-8">
      <h6>Sales Information</h6>
      <div className="my-4">
        <div className="flex">
          <div className="w-6/12 mr-4">
            <Controller
              name="assigned_to"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Assigned To"}
                  options={salesPerson}
                  isSearchable
                  placeholder="Assigned To"
                  register={register}
                  // disabled={loading}
                  // error={errors.manager}
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
          <div className="w-6/12">
            <Controller
              name="client"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={"Client"}
                  options={clients}
                  isSearchable
                  placeholder="Client"
                  register={register}
                  // disabled={loading}
                  // error={errors.manager}
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
