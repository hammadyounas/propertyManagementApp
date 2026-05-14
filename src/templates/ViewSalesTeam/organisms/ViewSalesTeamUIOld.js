import React from "react";
import { Icon } from "@iconify/react";
import Card from "../../../components/combined/molecules/CardUIContainer";
import Link from "next/link";
import { salesTeamDetailFields } from "../functional/constants/data";
import { propertyViewPath } from "@/constants/appRoutes";

export default function ViewSalesTeamUIOld({
  salesteamData = {},
  handleEdit,
}) {
  return (
    <Card title={salesteamData?.name} subtitle={salesteamData?.email}>
      <div className="flex items-center text-green-700">
        <span className="w-full flex justify-end items-center">
          <p>Edit</p>
          <Icon
            onClick={() => handleEdit()}
            className="cursor-pointer text-[20px] mx-4"
            icon="heroicons:pencil-square"
          />
        </span>
      </div>
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block w-full xl:w-[80%] align-middle">
          <div className="overflow-hidden">
            <div className="px-4 sm:-py-5 sm:px-6">
              <div>
                <p></p>
                <img src={salesteamData?.name} alt="" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-x-4 capitalize ">
                {salesTeamDetailFields?.map(({ label, valueKey }) => (
                  <div
                    key={valueKey}
                    className={`${
                      salesteamData?.[valueKey]?.toString().trim()
                        ? "sm:grid sm:grid-cols-3 sm:gap-4"
                        : "hidden"
                    }`}
                  >
                    <dt className="text-sm font-medium text-gray-500 py-2">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm w-full bg-gray-200 rounded-sm text-center py-2 text-gray-700 sm:col-span-2 mx-auto">
                      {salesteamData?.[valueKey] || "N/A"}
                    </dd>
                  </div>
                ))}
                {/* Assigned Properties */}
                <div
                  className={`${
                    salesteamData?.assigned_properties?.length
                      ? "sm:grid sm:grid-cols-3 sm:gap-4"
                      : "hidden"
                  }`}
                >
                  <dt className="text-sm font-medium text-gray-500">
                    Assigned Properties
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 text-left sm:col-span-2 mx-auto">
                    {salesteamData?.assigned_properties?.length
                      ? salesteamData.assigned_properties.map((property) => (
                          <p key={property._id}>
                            <Link href={propertyViewPath(property._id)}>
                              {property.title}
                            </Link>
                          </p>
                        ))
                      : "N/A"}
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
