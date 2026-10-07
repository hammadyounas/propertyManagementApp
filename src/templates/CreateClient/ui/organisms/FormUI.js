"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import { X } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AppRoutes } from "@/constants/appRoutes";

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
  downloadSampleCsv,
  uploadProgress,
}) => {
  return (
    <div className="w-full lg:w-[75%] relative">
      {loading && inputType === "csv" && uploadProgress?.total > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-md mx-4 rounded-lg bg-white dark:bg-slate-800 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="animate-spin h-6 w-6 text-primary-default"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-100">
                Uploading CSV
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">
              {uploadProgress.current} of {uploadProgress.total} clients processed
              {uploadProgress.skipped > 0
                ? ` (${uploadProgress.skipped} duplicates skipped)`
                : ""}
              {uploadProgress.failed > 0
                ? ` (${uploadProgress.failed} failed)`
                : ""}
            </p>
            <div className="h-2 w-full rounded bg-gray-200 dark:bg-slate-600 overflow-hidden">
              <div
                className="h-full bg-primary-default transition-all duration-200"
                style={{
                  width: `${Math.round(
                    (uploadProgress.current / uploadProgress.total) * 100
                  )}%`,
                }}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-3">
              Please stay on this page until the upload finishes. Leaving or
              using Back will stop remaining rows. Clients already saved will stay.
            </p>
          </div>
        </div>
      )}
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
                  disabled={loading}
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
                  disabled={loading}
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
                        Assigned Broker
                      </div>
                      <ReactSelect
                        name="assigned_salesperson"
                        isMulti
                        value={salesPersonAssigned}
                        onChange={handleSelectAssignedSalesperson}
                        options={salesPersons}
                        placeholder="Assigned Broker"
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
                <div className="flex justify-end items-center mb-4">
                  <Button
                    text="Download Sample"
                    onClick={downloadSampleCsv}
                    type="button"
                    className="!bg-white w-48 !text-primary-default border border-primary-default hover:!bg-primary-default hover:!text-white"
                    icon={<Icon icon="material-symbols:download" className="text-lg" />}
                    disabled={loading}
                  />
                </div>

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
                onClick={() => push(AppRoutes.CLIENTS)}
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
