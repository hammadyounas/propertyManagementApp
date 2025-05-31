import Card from "../../../../components/combined/molecules/CardUIContainer";
import DropdownMenu from "../../../../components/ui/organisms/DropdownMenu";

export default function ViewClientUI({ clientData = {}, handleEdit }) {
  const clientFields = [
    { label: "Full name", valueKey: "name" },
    { label: "Email address", valueKey: "email" },
    { label: "Phone number", valueKey: "phoneNumber" },
    { label: "Address", valueKey: "address" },
    { label: "Client Type", valueKey: "type" },
    { label: "Status", valueKey: "status" },
    {
      label: "Preferred Communication Channel",
      valueKey: "preferredCommunicationChannel",
    },
    { label: "Assigned Salesperson", valueKey: "assignedSalesperson" },
    { label: "Notes", valueKey: "notes" },
  ];

  return (
    <Card title="Client Details">
      {/* <div className="flex items-center text-green-700">
        <span className="w-full flex justify-end items-center">
          <p>Edit</p>
          <Icon
            onClick={() => handleEdit()}
            className="cursor-pointer text-[20px] mx-4"
            icon="heroicons:pencil-square"
          />
        </span>
      </div> */}
      <Card className="sm:p-2 lg:w-[40%] sm:w-[50%] border bg-gray-50 rounded-lg shadow-sm text-sm max-sm:mb-2 w-full">
        <div className="flex items-center justify-between capitalize">
          <div className="flex items-center gap-4">
            <img
              src={"/assets/images/users/default.jpg"}
              alt={clientData?.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <h1 className="lg:text-lg text-base font-medium">
              {clientData?.name}
            </h1>
          </div>

          <div>
            <DropdownMenu onEdit={() => handleEdit()} />
          </div>
        </div>

        <div className="mt-10">
          {clientFields?.map(({ label, valueKey }) => ( 
              <div
                    key={valueKey}
                    className={`${
                      clientData?.[valueKey]?.toString().trim()
                        ? "py-3 sm:py-2 sm:grid sm:grid-cols-2 sm:gap-4"
                        : "hidden"
                    }`}
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 capitalize">
                      {clientData?.[valueKey] || "N/A"}
                    </dd>
                  </div>
          ))}
        </div>
      </Card>
      {/* <div className="overflow-x-auto -mx-6">
        <div className="inline-block w-full xl:w-[70%] align-middle">
          <div className="overflow-hidden">
            <div className="px-4 sm:-py-5 sm:p-0">
              <div className="sm:divide-y sm:divide-gray-200">
                {clientFields?.map(({ label, valueKey }) => (
                  <div
                    key={valueKey}
                    className={`${
                      clientData?.[valueKey]?.toString().trim()
                        ? "py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        : "hidden"
                    }`}
                  >
                    <dt className="text-sm font-medium text-gray-500">
                      {label}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {clientData?.[valueKey] || "N/A"}
                    </dd>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Card>
  );
}
