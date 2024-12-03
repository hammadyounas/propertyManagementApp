import { Icon } from "@iconify/react";
import React from "react";
import Button from "@/components/ui/atoms/Button";
import Textinput from "../../../../components/ui/atoms/TextInput";
import { ToastContainer } from "react-toastify";

export default function ProfileUI({
  loading,
  handleSubmit,
  onSubmit,
  register,
  errors,
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
                    src="/assets/images/users/user-1.jpg"
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
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">
                  Albert Flores
                </div>
                <div className="text-sm font-light text-slate-600 dark:text-slate-400 capitalize">
                  Admin
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* profile details */}
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <ul className="list space-y-8">
              <li className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="heroicons:envelope" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    EMAIL
                  </div>
                  <a
                    href={`mailto:info@example.com`}
                    className="text-base text-slate-600 dark:text-slate-50"
                  >
                    info@example.com
                  </a>
                </div>
              </li>

              <li className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="heroicons:phone-arrow-up-right" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    PHONE
                  </div>
                  <a
                    href={`tel:+1-202-555-0151`}
                    className="text-base text-slate-600 dark:text-slate-50"
                  >
                    +1-202-555-0151
                  </a>
                </div>
              </li>

              <li className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="icons8:gender-neutral-user" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    GENDER
                  </div>
                  <div className="text-base text-slate-600 dark:text-slate-50">
                    Male
                  </div>
                </div>
              </li>

              <li className="flex space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                  <Icon icon="mingcute:birthday-2-line" />
                </div>
                <div className="flex-1">
                  <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                    Date of Birth
                  </div>
                  <div className="text-base text-slate-600 dark:text-slate-50">
                    12-12-1992
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* confirm passowrd  */}
          <div className="lg:col-span-6 col-span-12">
            <h1 className="text-xl text-gray-600">Change Password</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
              <div>
                <Textinput
                  name="newPassword"
                  label="New Password"
                  type="password"
                  register={register}
                  error={errors?.password}
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
                  error={errors?.confirm_password}
                  placeholder="Confirm your password"
                  className="px-6"
                  disabled={loading}
                />
              </div>
              <Button
                loading={loading}
                text={"Change Password"}
                type="submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
