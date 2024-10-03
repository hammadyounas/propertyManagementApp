"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";

const FormUI = ({
  handleSubmit,
  onSubmit,
  loading,
  register,
  errors,
  push,
}) => {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Create User">
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
                <Textinput
                  name="phone"
                  label="Phone*"
                  type="number"
                  register={register}
                  error={errors.phone}
                  placeholder="Phone"
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
                  disabled={loading}
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="password"
                  label="Password*"
                  type="password"
                  register={register}
                  error={errors.password}
                  placeholder="Password"
                  disabled={loading}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="confirm_password"
                  label="Confirm Password*"
                  type="password"
                  register={register}
                  error={errors.confirm_password}
                  placeholder="Confirm Password"
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
                onClick={() => push("/sales-team")}
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
