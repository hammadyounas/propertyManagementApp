import Select from "../../../../components/combined/molecules/SelectUIContainer";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
const SalesInformationUI = ({
  register,
  control,
  salesPerson,
  clients,
  errors,
  loading,
  selectedSalesperson,
  selectedClient,
  handleSelectSalesperson,
  handleSelectClient,
}) => {
  return (
    <div className="mt-8">
      <h6>Sales Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Assigned To*</div>
            <ReactSelect
              name="assigned_to"
              value={selectedSalesperson}
              onChange={handleSelectSalesperson}
              options={salesPerson}
              placeholder="Assigned To*"
              isDisabled={loading}
            />
            {errors?.assigned_to && !selectedSalesperson && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.assigned_to?.message}
              </p>
            )}
            {selectedSalesperson && (
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
            )}
          </div>
          <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Client*</div>
            <ReactSelect
              name="client"
              value={selectedClient}
              onChange={handleSelectClient}
              options={clients}
              placeholder="Client*"
              isDisabled={loading}
            />
            {errors?.client && !selectedClient && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.client?.message}
              </p>
            )}
            {selectedClient && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesInformationUI;
