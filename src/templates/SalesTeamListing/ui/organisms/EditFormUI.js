"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import ReactSelect from "react-select";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import RadioButton from "../../../../components/ui/atoms/RadioButtin";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";

const EditFormUI = ({
  handleSubmit,
  onSubmit,
  loading,
  register,
  errors,
  push,
  status,
  handleSelectStatus,
  propertiesAssigned,
  handleSelectAssignedProperties,
  salespersonStatus,
  availableProperties,
  getDataLoading,
}) => {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Edit Broker">
        {getDataLoading ? (
          <div className="flex items-center justify-center w-full">
            <LoadingUI />
          </div>
        ) : (
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
                    type="text"
                    register={register}
                    error={errors.email}
                    placeholder="Email"
                    disabled={true}
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
                <div className="w-full md:w-[49%]">
                  <Textinput
                    name="licence_number"
                    label="Licence Number*"
                    type="text"
                    register={register}
                    error={errors.licence_number}
                    placeholder="Licence Number"
                    disabled={loading}
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
                    disabled={loading}
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
                {/* <div className="w-full md:w-[49%]">
                <div className="mt-4">
                  <div className="my-2 text-sm font-medium">
                    Assigned Properties
                  </div>
                  <ReactSelect
                    name="assigned_properties"
                    isMulti
                    value={propertiesAssigned}
                    onChange={handleSelectAssignedProperties}
                    options={availableProperties?.map((property)=> (
                      {
                        label: property.title,
                        value: property._id,
                      }
                    ))}
                    placeholder="Assigned Properties"
                    isDisabled={loading}
                    className="text-sm"
                  />
                  {errors?.propertiesAssigned && !propertiesAssigned.length && (
                    <p className="text-sm text-danger-500 mt-2">
                      {errors?.propertiesAssigned?.message}
                    </p>
                  )}

                </div>
              </div> */}
                <div className="w-full md:w-[49%]">
                  <Textinput
                    name="joining_date"
                    label="Joining Date*"
                    type="date"
                    register={register}
                    error={errors.joining_date}
                    placeholder="Joining Date"
                    disabled={loading}
                  />
                </div>
                <div className="w-full md:w-[49%]">
                  <div className="mt-4">
                    <div className="my-2 text-sm font-medium">Status*</div>
                    <ReactSelect
                      name="status"
                      value={status}
                      onChange={handleSelectStatus}
                      options={salespersonStatus}
                      placeholder="Status"
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

              {/* <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="joining_date"
                  label="Joining Date*"
                  type="date"
                  register={register}
                  error={errors.joining_date}
                  placeholder="Joining Date"
                  disabled={loading}
                />
              </div> */}
              {/* <div className="w-full md:w-[49%]">
                <Textinput
                  name="password"
                  label="Password*"
                  type="password"
                  register={register}
                  error={errors.password}
                  placeholder="Password"
                  disabled={loading}
                />
              </div> */}
              {/* </div> */}
              {/* <div className="flex flex-wrap justify-between"> */}
              {/* <div className="w-full md:w-[49%]">
                <Textinput
                  name="confirm_password"
                  label="Confirm Password*"
                  type="password"
                  register={register}
                  error={errors.confirm_password}
                  placeholder="Confirm Password"
                  disabled={loading}
                />
              </div> */}
              {/* </div> */}

              <div className="flex justify-center md:justify-end mt-12">
                <Button
                  text={"Discard"}
                  className={
                    "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
                  }
                  onClick={() => push("/broker")}
                  loading={loading}
                />
                <Button
                  text={"Submit"}
                  className={"md:!w-36 z-50"}
                  type="submit"
                  loading={loading}
                />
              </div>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default EditFormUI;
