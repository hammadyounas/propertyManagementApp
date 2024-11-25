import React from "react";
import Button from "@/components/ui/atoms/Button";
import Textinput from "../../../../components/ui/atoms/TextInput";

const ResetPasswordFormUI = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <div>
      <Textinput
        name="newPassword"
        label="New Password"
        type="password"
        register={register}
        error={errors.password}
        placeholder="Password"
        className="px-6"
        disabled={loading}
      />
      </div>
      <div>
      <Textinput
        name="confirm_password"
        label="Confirm Password"
        type="password"
        register={register}
        error={errors.confirm_password}
        placeholder="Confirm your password"
        className="px-6"
        disabled={loading}
      />
      </div>
      <Button loading={loading} text={"Reset Password"} type="submit" />
    </form>
  );
};

export default ResetPasswordFormUI;
