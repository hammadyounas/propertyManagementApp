import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/atoms/Icon";
import { usePathname } from "next/navigation";

const BreadcrumbsUI = ({ locationName, isHide, groupTitle }) => {
  const pathname = usePathname();

  return (
    <>
      {!isHide ? (
        <div className="md:mb-6 mb-4 flex justify-between space-x-3 rtl:space-x-reverse">
          <ul className="breadcrumbs">
            <li className="text-primary-500">
              <Link href="/dashboard" className="text-lg">
                <Icon icon="heroicons-outline:home" />
              </Link>
              <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                <Icon icon="heroicons:chevron-right" />
              </span>
            </li>
            {groupTitle && (
              <li className="text-primary-500">
                <button type="button" className="capitalize">
                  {groupTitle}
                </button>
                <span className="breadcrumbs-icon rtl:transform rtl:rotate-180">
                  <Icon icon="heroicons:chevron-right" />
                </span>
              </li>
            )}
            <li className="capitalize text-slate-500 dark:text-slate-400">
              {locationName?.split("/")?.length > 1
                ? locationName?.split("/")?.slice(0, 2)?.join(" / ")
                : locationName?.split("/")?.slice(0, 1)?.join(" / ")}
            </li>
          </ul>

          {/* dashboard button */}
          {/* {pathname === "/dashboard" && (
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Link
                href="/dashboard/add"
                className="text-white bg-primary-default btn flex items-center justify-center space-x-2"
                type="button"
              >
                <span>Add</span>
                <Icon icon="heroicons-outline:plus" />
              </Link>
            </div>
          )} */}
        </div>
      ) : null}
    </>
  );
};

export default BreadcrumbsUI;
