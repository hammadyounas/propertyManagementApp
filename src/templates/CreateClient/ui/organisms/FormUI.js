"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  handleFileUpload,
  handleRemoveCSV,
  csvData,
  getInputProps,
  getRootProps,
  acceptedFiles,
  inputType,
  setInputType,
}) => {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Create Client">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex gap-4 mb-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="manual"
                  checked={inputType === "manual"}
                  onChange={() => setInputType("manual")}
                  className="mr-2 "
                />
                Manually
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="csv"
                  checked={inputType === "csv"}
                  onChange={() => setInputType("csv")}
                  className="mr-2 "
                />
                Upload CSV File
              </label>
            </div>

            {inputType === "manual" ? (
              <div>
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
                      <div className="my-2 text-sm font-medium">
                        Client Type*
                      </div>
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
                      <div className="my-2 text-sm font-medium">
                        Client Status*
                      </div>
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
              </div>
            ) : (
              <div className="mt-6">
                <label className="block text-sm font-medium my-2">
                  Upload CSV*
                </label>

                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer">
                  {csvData && csvData.length > 0 ? (
                    <div className="relative flex items-center flex-col">
                      <div className="flex items-center mt-2">
                        <p className="text-sm text-gray-700">
                          {acceptedFiles[0]?.name}
                        </p>
                        {/* Remove Button */}
                        <button
                          type="button"
                          className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition mx-2"
                          onClick={handleRemoveCSV}
                          disabled={loading}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div {...getRootProps()} className="">
                      <input {...getInputProps()} disabled={loading} />
                      <span className="text-gray-500 flex items-center gap-2">
                        <Icon
                          icon={"material-symbols:upload"}
                          className="text-2xl"
                        />{" "}
                        Upload CSV
                      </span>
                      <p className="text-xs mt-1">
                        Drag & Drop or Click to Upload
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

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
                onClick={() => {
                  if (inputType === "csv") {
                    console.log("CSV Submission triggered");
                    onSubmit({});
                  } else {
                    handleSubmit(onSubmit)();
                  }
                }}
                loading={loading}
                disabled={inputType === "csv" && (!csvData || csvData.length === 0)}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FormUI;
