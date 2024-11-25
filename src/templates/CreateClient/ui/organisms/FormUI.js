"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";

const FormUI = ({
  handleSubmit,
  onSubmit,
  loading,
  register,
  errors,
  push,
  status,
  handleSelectStatus,
  clientType,
  handleSelectClientType,
  salesPersonAssigned,
  handleSelectAssignedSalesperson,
  communicationChannels,
  handleSelectCommunicationChannel,
  clientStatus,
  clientTypes,
  preferredCommunicationChannels,
  salesPersons,
}) => {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Create Client">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="name"
                  label="Name*"
                  type="text"
                  register={register}
                  error={errors.name}
                  placeholder="Name"
                  disabled={loading}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="email"
                  label="Email*"
                  type="email"
                  register={register}
                  error={errors.email}
                  placeholder="Email"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="phoneNumber"
                  label="Phone Number*"
                  type="text"
                  register={register}
                  error={errors.phoneNumber}
                  placeholder="Phone Number"
                  disabled={loading}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="address"
                  label="Address*"
                  type="text"
                  register={register}
                  error={errors.address}
                  placeholder="Address"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">Client Type*</div>
                  <ReactSelect
                    name="client_type"
                    value={clientType}
                    onChange={handleSelectClientType}
                    options={clientTypes}
                    placeholder="Client Type"
                    isDisabled={loading}
                    className="text-sm"
                  />
                  {errors?.client_type && !clientType && (
                    <p className="text-sm text-danger-500 mt-2">
                      {errors?.client_type?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">Client Status*</div>
                  <ReactSelect
                    name="status"
                    value={status}
                    onChange={handleSelectStatus}
                    options={clientStatus}
                    placeholder="Client Status"
                    isDisabled={loading}
                    className="text-sm"
                  />
                  {errors?.status && !status && (
                    <p className="text-sm text-danger-500 mt-2">
                      {errors?.status?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">
                    Preferred Communication Channel*
                  </div>
                  <ReactSelect
                    name="communication_channel"
                    isMulti
                    value={communicationChannels}
                    onChange={handleSelectCommunicationChannel}
                    options={preferredCommunicationChannels}
                    placeholder="Communication Channel"
                    isDisabled={loading}
                    className="text-sm"
                  />
                  {errors?.communication_channel &&
                    communicationChannels?.length == 0 && (
                      <p className="text-sm text-danger-500 mt-2">
                        {errors?.communication_channel?.message}
                      </p>
                    )}
                </div>
              </div>
              <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">
                    Assigned Salesperson
                  </div>
                  <ReactSelect
                    name="assigned_salesperson"
                    isMulti
                    value={salesPersonAssigned}
                    onChange={handleSelectAssignedSalesperson}
                    options={salesPersons}
                    placeholder="Assigned Salesperson"
                    isDisabled={loading}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%] mt-1">
                <Textarea
                  name="notes"
                  label="Notes"
                  type="text"
                  register={register}
                  placeholder="Notes"
                  row={5}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-12">
              <Button
                text={"Discard"}
                className={
                  "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
                }
                onClick={() => push("/clients")}
                loading={loading}
              />
              <Button
                text={"Submit"}
                className={"md:!w-36"}
                type="submit"
                loading={loading}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FormUI;
