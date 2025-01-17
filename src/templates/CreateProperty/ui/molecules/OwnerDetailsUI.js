import React from "react";
import Textinput from "@/components/ui/atoms/TextInput";
import ReactSelect from "react-select";

const OwnerDetailsUI = ({
  register,
  errors,
  loading,
  handleSelectOwnersDetailsStatus,
  ownersDetailstatus,
  ownerDetailsStatus,
}) => {
  return (
    <div className="mt-8">
      <h6>Owner's Details</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="owner_name"
              label="Owner Name*"
              type="text"
              register={register}
              error={errors.owner_name}
              placeholder="Owner Name"
              disabled={loading}
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="phone_number"
              label="Phone Number*"
              type="number"
              register={register}
              error={errors.phone_number}
              placeholder="Phone Number"
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
          <div className="w-full md:w-[49%]">
            <Textinput
              name="owner_address"
              label="Owner Address*"
              type="text"
              register={register}
              error={errors.owner_address}
              placeholder="Owner Address"
              disabled={loading}
            />
          </div>
          {/* <div className="w-full md:w-[49%]">
            <div className="my-2 text-sm font-medium">Status*</div>
            <ReactSelect
              name="owner_status"
              value={ownersDetailstatus}
              onChange={handleSelectOwnersDetailsStatus}
              options={ownerDetailsStatus}
              placeholder="Status"
              isDisabled={loading}
              className="text-sm"
            />
            {errors?.ownerStatus && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.ownerStatus?.message}
              </p>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default OwnerDetailsUI;
