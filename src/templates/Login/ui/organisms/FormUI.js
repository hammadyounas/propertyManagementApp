import React from "react";
import Textinput from "@/components/atoms/TextInput";
import Link from "next/link";
import Button from "@/components/atoms/Button";

const FormUI = ({ handleSubmit, onSubmit, register, errors, loading }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="username"
        label="Username or Email"
        placeholder="Username or Email"
        type="text"
        register={register}
        error={errors?.username}
        className="px-6"
        disabled={loading}
      />
      <Textinput
        name="password"
        label="passwrod"
        placeholder="Password"
        type="password"
        register={register}
        error={errors.password}
        className="px-6"
        disabled={loading}
      />
      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>
      <Button loading={loading} text={"Sign In"} />
    </form>
  );
};

export default FormUI;
