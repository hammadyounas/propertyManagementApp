import { Icon } from "@iconify/react";
import React from "react";
import Button from "@/components/ui/atoms/Button";
import Textinput from "../../../../components/ui/atoms/TextInput";
import { ToastContainer } from "react-toastify";
import RadioButton from "../../../../components/ui/atoms/RadioButtin";
import ReactSelect from "react-select";

export default function ProfileUI({
  loading,
  handleSubmit,
  onSubmit,
  register,
  errors,
  status,
  propertiesAssigned,
  user,
  isEditing,
  setIsEditing,
  handleFileChange,
  loadingAvatar,
  handleCancel
}) {
  return (
    <div>
      <ToastContainer />
      <div className="space-y-5 profile-page">
        <div className="profiel-wrap px-[35px] pb-10 md:pt-12 pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
          <div className="bg-black-default dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg"></div>

          {/* name and profile image */}
          <div className="profile-box flex-none md:text-start text-center">
            <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
              <div className="flex-none">
                <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                  <img
                    src={user?.avatar || "/assets/images/users/user-1.jpg"}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <label
                    htmlFor="avatarUpload"
                    className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px] cursor-pointer"
                  >
                    <Icon icon="heroicons:pencil-square" />
                  </label>
                  <input
                    type="file"
                    id="avatarUpload"
                    accept="image/*"
                    className="hidden"
                    disabled={loadingAvatar}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  {user?.name}
                </div>
                <div className="text-sm font-light text-slate-600 dark:text-slate-400 capitalize">
                  {user?.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* profile details */}
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
                  disabled={loading || !isEditing}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="email"
                  label="Email*"
                  type="text"
                  register={register}
                  error={errors.email}
                  placeholder="Email"
                  disabled
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="contact_number"
                  label="Phone Number*"
                  type="number"
                  register={register}
                  error={errors.contact_number}
                  placeholder="Phone Number"
                  disabled={loading || !isEditing}
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
                  disabled={loading || !isEditing}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="licence_number"
                  label="Licence Number*"
                  type="text"
                  register={register}
                  error={errors.licence_number}
                  placeholder="Licence Number"
                  disabled={loading || !isEditing}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <RadioButton
                  name="licence_type"
                  label="Licence*"
                  type="radio"
                  register={register}
                  error={errors.licence_type}
                  placeholder="Licence"
                  disabled={loading || !isEditing}
                  radioOptions={[
                    { label: "Residential", value: "residential" },
                    { label: "Commercial", value: "commercial" },
                    { label: "Director", value: "director" },
                  ]}
                  className="text-sm"
                />
              </div>
              {/* <div className="w-full md:w-[49%]">
                <Textinput
                  name="licence_status"
                  label="Licence Status*"
                  type="radio"
                  register={register}
                  error={errors.licence_status}
                  placeholder="Licence"
                  disabled={loading}
                  radioOptions={[
                    { label: "Active", value: "active" },
                    { label: "In Active", value: "inactive" },
                  ]}
                  className="text-sm"
                />
              </div> */}
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">
                    Assigned Properties
                  </div>
                  <ReactSelect
                    name="assigned_properties"
                    isMulti
                    value={propertiesAssigned}
                    // onChange={handleSelectAssignedProperties}
                    // options={availableProperties.map((property) => ({
                    //   label: property.title,
                    //   value: property._id,
                    // }))}
                    placeholder="Assigned Properties"
                    isDisabled
                    className="text-sm"
                  />
                  {errors?.propertiesAssigned && !propertiesAssigned.length && (
                    <p className="text-sm text-danger-500 mt-2">
                      {errors?.propertiesAssigned?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">Status*</div>
                  <ReactSelect
                    name="status"
                    value={status}
                    // onChange={handleSelectStatus}
                    // options={salespersonStatus}
                    placeholder="Status"
                    isDisabled
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
                <Textinput
                  name="joining_date"
                  label="Joining Date*"
                  type="date"
                  register={register}
                  error={errors.joining_date}
                  placeholder="Joining Date"
                  disabled
                />
              </div>
            </div>

            {!isEditing ? (
              <div className="flex justify-center md:justify-end mt-12">
                <Button
                  text={"Edit"}
                  className={"md:!w-36 z-50"}
                  onClick={() => setIsEditing(true)}
                  loading={loading}
                />
              </div>
            ) : (
              <div className="flex justify-center md:justify-end mt-12">
                <Button
                  text={"Cancel"}
                  className={
                    "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
                  }
                  onClick={handleCancel}
                  loading={loading}
                />
                <Button
                  text={"Update"}
                  className={"md:!w-36 z-50"}
                  type="submit"
                  loading={loading}
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
