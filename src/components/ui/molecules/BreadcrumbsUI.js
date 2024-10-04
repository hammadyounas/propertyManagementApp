import React, { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "@/components/ui/atoms/Icon";

const BreadcrumbsUI = ({ locationName, isHide, groupTitle }) => {
  return (
    <>
      {!isHide ? (
        <div className="md:mb-6 mb-4 flex space-x-3 rtl:space-x-reverse">
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
        </div>
      ) : null}
    </>
  );
};

export default BreadcrumbsUI;
