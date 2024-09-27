import React from "react";
import DropdownUIContainer from "../../combined/organisms/DropdownUIContainer";
import Icon from "@/components/ui/atoms/Icon";
import { Menu, Transition } from "@headlessui/react";

const ProfileUI = ({ProfileLabel, ProfileMenu}) => {
  return (
    <DropdownUIContainer
      label={ProfileLabel()}
      classMenuItems="w-[180px] top-[58px]"
    >
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${
                active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
              } block     ${
                item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
              }`}
            >
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </DropdownUIContainer>
  );
};

export default ProfileUI;
