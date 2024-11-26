import React from "react";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";

const clientFields = [
  { label: "Full name", valueKey: "name" },
  { label: "Email address", valueKey: "email" },
  { label: "Phone number", valueKey: "phoneNumber" },
  { label: "Address", valueKey: "address" },
  { label: "Client Type", valueKey: "type" },
  { label: "Status", valueKey: "status" },
  { label: "Preferred Communication Channel", valueKey: "preferredCommunicationChannel" },
  { label: "Assigned Salesperson", valueKey: "assignedSalesperson" },
  { label: "Notes", valueKey: "notes" },
];

export default function ViewClientUI({ clientData = {}, handleEdit }) {
    const clientFields = [
      { label: "Full name", valueKey: "name" },
      { label: "Email address", valueKey: "email" },
      { label: "Phone number", valueKey: "phoneNumber" },
      { label: "Address", valueKey: "address" },
      { label: "Client Type", valueKey: "type" },
      { label: "Status", valueKey: "status" },
      { label: "Preferred Communication Channel", valueKey: "preferredCommunicationChannel" },
      { label: "Assigned Salesperson", valueKey: "assignedSalesperson" },
      { label: "Notes", valueKey: "notes" },
    ];
  
    return (
      <Card title="Client Details">
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
          <div className="inline-block w-full xl:w-[70%] align-middle">
            <div className="overflow-hidden">
              <div className="px-4 sm:-py-5 sm:p-0">
                <div className="sm:divide-y sm:divide-gray-200">
                  {clientFields.map(({ label, valueKey }) => (
                   <div
                   key={valueKey}
                   className={`${
                     clientData?.[valueKey]?.toString().trim() ? "py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" : "hidden"
                   }`}
                 >
                   <dt className="text-sm font-medium text-gray-500">{label}</dt>
                   <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                     {clientData?.[valueKey] || "N/A"}
                   </dd>
                 </div>
                 
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
