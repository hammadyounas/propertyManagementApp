import React from "react";
import Button from "@/components/ui/atoms/Button";
import Textinput from "../../../../components/ui/atoms/TextInput";

const ForgotPasswordFormUI = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        type="email"
        register={register}
        error={errors.email}
        placeholder="Email"
        className="px-6"
        disabled={loading}
      />
      <Button loading={loading} text={"Send recovery email"} type="submit" />
    </form>
  );
};

export default ForgotPasswordFormUI;
