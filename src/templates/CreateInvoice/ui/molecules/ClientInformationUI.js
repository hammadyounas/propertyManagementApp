import Textinput from "@/components/ui/atoms/TextInput";
import ReactSelect from "react-select";

const ClientInformationUI = ({
  register,
  errors,
  loading,
  clientName,
  handleSelectClientName,
  clients,
}) => {
  console.log("clientname", clientName);

  return (
    <div className="mt-8">
      <h6>Buyer Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="mt-2 w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Buyer Name*</div>
            <ReactSelect
              name="buyer"
              value={clientName}
              onChange={handleSelectClientName}
              options={clients}
              placeholder="Client Name"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.buyer && !clientName && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.buyer?.message}
              </p>
            )}
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="client_address"
              label="Buyer Address"
              type="text"
              register={register}
              error={errors.client_address}
              placeholder="Selected Client Address"
              disabled={true}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="client_email"
              label="Buyer Email"
              type="text"
              register={register}
              error={errors.client_email}
              placeholder="Selected Client Email"
              disabled={true}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="client_phone"
              label="Buyer Phone Number"
              type="text"
              register={register}
              error={errors.client_phone}
              placeholder="Selected Client Phone Number"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientInformationUI;
