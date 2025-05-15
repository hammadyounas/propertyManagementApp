import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Link from "next/link";
import Icon from "@/components/ui/atoms/Icon";

const DropdownUI = ({
  label,
  wrapperClass = "",
  labelClass = "",
  children,
  classMenuItems = "",
  items = [],
  classItem = "",
  className = "",
}) => {
  return (
    <div className={`relative ${wrapperClass}`}>
      <Menu as="div" className={`block w-full ${className}`}>
        <Menu.Button className="block w-full">
          <div className={labelClass}>{label}</div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className={`absolute ltr:right-0 rtl:left-0 origin-top-right border border-slate-100
              rounded bg-white dark:bg-slate-800 dark:border-slate-700 shadow-dropdown z-10
              ${classMenuItems} max-h-[300px] overflow-y-auto`}
          >
            <div>
              {children
                ? children
                : items.map((item, index) => (
                    <Menu.Item key={index}>
                      {({ active, close }) => {
                        const isLink = item.link && item.link !== "#" && item.link !== "";
                        const commonClasses = `${
                          active
                            ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                            : "text-slate-600 dark:text-slate-300"
                        } flex items-center w-full px-4 py-2 text-sm ${classItem} ${
                          item.hasDivider
                            ? "border-t border-slate-100 dark:border-slate-700"
                            : ""
                        }`;

                        const content = (
                          <>
                            {item.icon && (
                              <span className="text-xl ltr:mr-3 rtl:ml-3">
                                <Icon icon={item.icon} />
                              </span>
                            )}
                            <span>{item.label}</span>
                          </>
                        );

                        if (isLink) {
                          return (
                            <Link
                              href={item.link}
                              scroll={false}
                              className={commonClasses}
                              onClick={close} // close dropdown on link click
                            >
                              {content}
                            </Link>
                          );
                        }

                        return (
                          <button
                            type="button"
                            className={commonClasses}
                            onClick={(e) => {
                              e.preventDefault();
                              item.onClick?.(e);
                              close(); // close dropdown on button click
                            }}
                          >
                            {content}
                          </button>
                        );
                      }}
                    </Menu.Item>
                  ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default DropdownUI;
