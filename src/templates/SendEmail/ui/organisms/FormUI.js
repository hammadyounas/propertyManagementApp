"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import { useState } from "react";
import { X } from "lucide-react";
import Modal from "../../../../components/combined/organisms/ModalUIContainer";
import EmailPreviewModal from "./EmailPreviewModal";

const FormUI = ({
  handleSubmit,
  onSubmit,
  loading,
  register,
  errors,
  push,
  brokers,
  clients,
  handleSelectRecipients,
  handleImageUpload,
  selectedImage,
  selectedType,
  setSelectedType,
  handleRemoveImage,
  recipients,
  setSelectionMethod,
  selectionMethod,
  handleFileUpload,
  setUploadedCsvEmails,
  uploadedCsvEmails,
  handleRemoveCSV,
  selectedCSV,
  activeModal,
  closeModal,
  emailData,
  handleConfirm,
}) => {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Send Email">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <Textinput
                  name="subject"
                  label="Subject*"
                  type="text"
                  register={register}
                  error={errors.subject}
                  placeholder="Enter subject"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <Textinput
                  name="title"
                  label="Title*"
                  type="text"
                  register={register}
                  error={errors.title}
                  placeholder="Enter title"
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full">
                <Textarea
                  name="description"
                  label="Description*"
                  register={register}
                  error={errors.description}
                  placeholder="Enter description"
                  rows={5}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="flex flex-wrap justify-between">
              <div className="w-full">
                <div className="mt-4">
                  <label className="block text-sm font-medium my-2">
                    Upload Image*
                  </label>
                  <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                    {selectedImage ? (
                      <div className="relative flex items-center flex-col">
                        <img
                          src={URL.createObjectURL(selectedImage)}
                          alt="Selected Preview"
                          className="w-24 h-24 object-cover rounded-md shadow-md"
                        />
                        {/* Remove Button */}
                        <div className="flex items-center mt-2">
                          <p className="text-sm text-gray-700">
                            {selectedImage.name}
                          </p>
                          <button
                            type="button"
                            className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition mx-2"
                            onClick={handleRemoveImage}
                            disabled={loading}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Wrap label around everything to make the entire box clickable
                      <label
                        htmlFor="imageUpload"
                        className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          id="imageUpload"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={loading}
                        />
                        <span className="text-gray-500">
                          Click to upload an image
                        </span>
                      </label>
                    )}
                  </div>

                  {/* {selectedImage && (
                    <div className="mt-4 flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Preview"
                        className="w-24 h-24 object-cover rounded-md shadow-md"
                      />
                      <p
                        className="text-red-500 cursor-pointer"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </p>
                    </div>
                  )} */}
                  {errors?.image?.message && !selectedImage && (
                    <p className="text-sm mt-2 text-red-500">
                      {errors?.image?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Select Recipient Method*
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`px-4 py-2 border rounded ${
                    selectionMethod === "manual"
                      ? "bg-black-default text-white"
                      : "border-black-default"
                  }`}
                  onClick={() => {
                    setSelectionMethod("manual");
                    handleSelectRecipients([]);
                    setUploadedCsvEmails([]);
                    handleRemoveCSV();
                  }}
                  disabled={loading}
                >
                  Select Manually
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 border rounded ${
                    selectionMethod === "csv"
                      ? "bg-black-default text-white"
                      : "border-black-default"
                  }`}
                  onClick={() => {
                    setSelectionMethod("csv");
                    handleSelectRecipients([]);
                    setUploadedCsvEmails([]);
                    handleRemoveCSV();
                  }}
                  disabled={loading}
                >
                  Upload CSV
                </button>
              </div>
            </div> */}

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                Select Recipient Method*
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="manual"
                    checked={selectionMethod === "manual"}
                    onChange={() => {
                      setSelectionMethod("manual");
                      handleSelectRecipients([]);
                      setUploadedCsvEmails([]);
                      handleRemoveCSV();
                    }}
                    className="mr-2"
                    disabled={loading}
                  />
                  Select Manually
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="csv"
                    checked={selectionMethod === "csv"}
                    onChange={() => {
                      setSelectionMethod("csv");
                      handleSelectRecipients([]);
                      setUploadedCsvEmails([]);
                      handleRemoveCSV();
                    }}
                    className="mr-2"
                    disabled={loading}
                  />
                  Upload CSV
                </label>
              </div>
            </div>

            {/* Radio Buttons for Clients/Brokers */}
            {selectionMethod === "manual" && (
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2">
                  Select Recipient Type*
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="clients"
                      checked={selectedType === "clients"}
                      onChange={() => {
                        setSelectedType("clients");
                        handleSelectRecipients([]);
                      }}
                      className="mr-2"
                      disabled={loading}
                    />
                    Clients
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="brokers"
                      checked={selectedType === "brokers"}
                      onChange={() => {
                        setSelectedType("brokers");
                        handleSelectRecipients([]);
                      }}
                      className="mr-2"
                      disabled={loading}
                    />
                    Brokers
                  </label>
                  {/* <label className="flex items-center">
                    <input
                      type="radio"
                      value="brokers"
                      checked={selectedType === "both"}
                      onChange={() => {
                        setSelectedType("both");
                        handleSelectRecipients([]);
                      }}
                      className="mr-2"
                      disabled={loading}
                    />
                    Both (Clients & Brokers)
                  </label> */}
                </div>
                <div className="flex flex-wrap justify-between mt-4">
                  <div className="w-full">
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        {selectedType === "clients"
                          ? "Select Clients Emails*"
                          : selectedType === "brokers"
                          ? "Select Brokers Emails*"
                          : "Select All*"}
                      </label>
                      <ReactSelect
                        name="recipients"
                        isMulti
                        value={recipients}
                        onChange={handleSelectRecipients}
                        options={
                          selectedType === "clients"
                            ? [
                                { value: "select_all", label: "Select All" },
                                ...clients.map((c) => ({
                                  label: c.label,
                                  value: c.value,
                                })),
                              ]
                            : selectedType === "brokers"
                            ? [
                                { value: "select_all", label: "Select All" },
                                ...brokers.map((b) => ({
                                  label: b.label,
                                  value: b.value,
                                })),
                              ]
                            : [
                                { value: "select_all", label: "Select All" },
                                ...clients,
                                ...brokers,
                              ]
                        }
                        placeholder={`Select ${
                          selectedType == "select_all"
                            ? "both (clients & brokers)"
                            : selectedType
                        } emails`}
                        isDisabled={loading}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  {errors?.recipients?.message && !recipients?.length && (
                    <p className="text-sm mt-2 text-red-500">
                      {errors?.recipients?.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Display Recipients Based on Selection */}

            {selectionMethod === "csv" && (
              <div className="mt-6">
                <label className="block text-sm font-medium my-2">
                  Upload CSV*
                </label>
                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                  {selectedCSV ? (
                    <div className="relative flex items-center flex-col">
                      <div className="flex items-center mt-2">
                        <p className="text-sm text-gray-700">
                          {selectedCSV?.name}
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
                    // Wrap label around everything so clicking anywhere triggers file selection
                    <label
                      htmlFor="csvUpload"
                      className="w-full h-full flex flex-col items-center justify-center text-center text-gray-500 cursor-pointer"
                    >
                      <input
                        type="file"
                        accept=".csv"
                        id="csvUpload"
                        className="hidden"
                        onChange={handleFileUpload}
                        disabled={loading}
                      />
                      <span className="text-gray-500">
                        Click to upload a CSV file
                      </span>
                    </label>
                  )}
                </div>

                <div className="flex flex-wrap justify-between mt-4">
                  <div className="w-full">
                    <div className="mt-4">
                      <label className="block text-sm font-medium mb-2">
                        Select CSV Emails*
                      </label>
                      <ReactSelect
                        name="recipients"
                        isMulti
                        value={recipients}
                        onChange={handleSelectRecipients}
                        options={uploadedCsvEmails}
                        placeholder={`Select csv emails`}
                        isDisabled={loading}
                        className="text-sm"
                      />
                    </div>
                  </div>
                  {errors?.recipients?.message && !recipients?.length && (
                    <p className="text-sm mt-2 text-red-500">
                      {errors?.recipients?.message}
                    </p>
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
                loading={loading}
              />
            </div>
          </div>
        </form>
      </Card>
      <EmailPreviewModal
        activeModal={activeModal}
        closeModal={closeModal}
        emailData={emailData}
        handleConfirm={handleConfirm}
        loading={loading}
      />
    </div>
  );
};

export default FormUI;
