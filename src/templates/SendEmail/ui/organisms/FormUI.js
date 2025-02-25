"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import { useState } from "react";

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
}) => {
  const [modal, setModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);

  const handlePreview = (data) => {
    setPreviewData(data);
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(selectedImage);
      setModal(true);
    }
    console.log('here is data:', data)
  };
  console.log(errors);

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
                  <div className="relative flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                    <input
                      type="file"
                      accept="image/*"
                      id="imageUpload"
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                      onChange={handleImageUpload}
                      disabled={loading}
                    />
                    <label
                      htmlFor="imageUpload"
                      className="text-center text-gray-500 cursor-pointer"
                    >
                      {selectedImage ? (
                        <span className="text-gray-700 font-medium">
                          {selectedImage.name}
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          Click to upload or drag & drop an image
                        </span>
                      )}
                    </label>
                  </div>
                  {selectedImage && (
                    <div className="mt-4 flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Preview"
                        className="w-24 h-24 object-cover rounded-md shadow-md"
                      />
                      {/* <p className="text-sm text-gray-600 mt-2">{selectedImage.name}</p> */}
                      <p
                        className="text-red-500 cursor-pointer"
                        onClick={handleRemoveImage}
                      >
                        Remove Image
                      </p>
                    </div>
                  )}
                  {errors?.image?.message && !selectedImage && (
                    <p className="text-sm mt-2 text-red-500">
                      {errors?.image?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Radio Buttons for Clients/Brokers */}
            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full">
                <label className="block text-sm font-medium mb-2">
                  Select Recipient Type*
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="clients"
                      checked={selectedType === "clients"}
                      onChange={() => setSelectedType("clients")}
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
                      onChange={() => setSelectedType("brokers")}
                      className="mr-2"
                      disabled={loading}
                    />
                    Brokers
                  </label>
                </div>
              </div>
            </div>

            {/* Display Recipients Based on Selection */}
            <div className="flex flex-wrap justify-between mt-4">
              <div className="w-full">
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    {selectedType === "clients"
                      ? "Select Clients Emails*"
                      : "Select Brokers Emails*"}
                  </label>
                  <ReactSelect
                    name="recipients"
                    isMulti
                    value={recipients}
                    onChange={handleSelectRecipients}
                    options={
                      selectedType === "clients"
                        ? clients.map((c) => ({
                          label: c.label,
                          value: c.value,
                        }))
                        : brokers.map((b) => ({
                          label: b.label,
                          value: b.value,
                        }))
                    }
                    placeholder={`Select ${selectedType} emails`}
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
                // type="submit"
                onClick={handleSubmit(handlePreview)}
                loading={loading}
              />
              {/* <button onClick={handlePreview}>Submit</button> */}
            </div>
          </div>
        </form>
      </Card>
      {modal && previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center right-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 border">
            <img
              src="https://static.vecteezy.com/system/resources/previews/015/577/147/non_2x/property-and-construction-logo-design-vector.jpg"
              alt="Company Logo"
              width="70"
              className="rounded-md border border-gray-300"
            />
            {imageBase64 && (
              <img
                src={imageBase64}
                alt="Preview"
                className="h-32 w-[330px] object-cover rounded-md mt-2 border"
              />
            )}
            <h3 className="font-bold text-green-700 text-center mt-2">{previewData.title || "helo"}</h3>
            <p className="mt-5">{previewData.description || "helo"}</p>
            <td align="center">
              <a className="bg-green-600 text-white px-4 py-2 rounded-md inline-block mt-2 mb-3">
                Learn More
              </a>
            </td>
            <tr>
              <td className="footer text-center bg-gray-200">
                <p className="font-semibold text-gray-700 mt-4">Follow us</p>
                <div className="flex justify-center space-x-4 mt-3">
                  <a href="#" className="social-icons">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png"
                      alt="Facebook"
                      className="w-8 h-8"
                    />
                  </a>
                  <a href="#" className="social-icons">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1200px-Logo_of_Twitter.svg.png"
                      alt="Twitter"
                      className="w-8 h-8"
                    />
                  </a>
                </div>
                <p className="text-gray-600 mt-4">Property Management, The Real Estate Builder</p>
              </td>
            </tr>

            <div className="flex justify-end mt-4">
              <Button
                text="Cancel"
                className="bg-gray-300 text-black mx-2"
                onClick={() => setModal(false)}
              />
              <Button
                text="OK"
                className="bg-blue-500 text-white"
                onClick={() => {
                  setModal(false);
                  handleSubmit(onSubmit)();
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default FormUI;
