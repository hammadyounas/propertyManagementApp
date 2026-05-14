import React from "react";
import Textinput from "@/components/ui/atoms/TextInput";
import Link from "next/link";
import Button from "@/components/ui/atoms/Button";
import InputField from "../../../../components/ui/atoms/InputField";
import { ToastContainer } from "react-toastify";
import { AppRoutes } from "@/constants/appRoutes";

const FormUI = ({
  email,
  password,
  errors,
  handleInputChange,
  handleSubmit,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ToastContainer/>
      <div>
        <InputField
         name="email"
         label="Email"
         value={email}
         placeholder="Email"
         type="text"
         onChange={handleInputChange}
         className="px-4"
         disabled={loading}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div>
        <InputField
         name="password"
         label="Password"
         placeholder="Password"
         type="password"
         value={password}
         onChange={handleInputChange}
         className="px-4"
         disabled={loading}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div className="flex justify-end">
        <Link
          href={AppRoutes.FORGOT_PASSWORD}
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      <Button loading={loading} text={"Sign In"} type='submit'/>
    </form>
  );
};

export default FormUI;
