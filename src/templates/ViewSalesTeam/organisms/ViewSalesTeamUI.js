import Card from "../../../components/combined/molecules/CardUIContainer";
import Link from "next/link";
import DropdownMenu from "../../../components/ui/organisms/DropdownMenu";

export default function ViewSalesTeamUI({
  salesteamData = {},
  handleEdit,
}) {
  const userDataFields = [
    // { label: "Name", valueKey: "name" },
    // { label: "Email address", valueKey: "email" },
    { label: "Phone number", valueKey: "contact_number" },
    { label: "Address", valueKey: "address" },
    { label: "Licence Number", valueKey: "licence_number" },
    { label: "Licence Type", valueKey: "licence_type" },
    { label: "Status", valueKey: "status" },
    { label: "Joining Date", valueKey: "joining_date" },
    { label: "Role", valueKey: "role" },
    { label: "Client Type", valueKey: "client_type" },
    { label: "Communication Channel", valueKey: "communication_channel" },
    { label: "Notes", valueKey: "notes" },
  ];
  return (
    <Card>
      <Card className="sm:p-2 lg:w-[40%] sm:w-[50%] border bg-gray-50 rounded-lg shadow-sm text-sm max-sm:mb-2 w-full">
        {/* card header */}
        <div className="flex items-center justify-between capitalize">
          <div className="flex items-center gap-4">
            <img
              src={salesteamData?.avatar || "/assets/images/users/default.jpg"}
              alt={salesteamData?.name}
              className="w-12 h-12 object-cover rounded-lg"
            />
            <h1 className="lg:text-lg text-base font-medium">
              {salesteamData?.name}
            </h1>
          </div>

          <div>
            <DropdownMenu onEdit={() => handleEdit()} showEdit={true} />
          </div>
        </div>

        {/* user details */}
        <div className="mt-10">
          {userDataFields?.map(({ label, valueKey }) => (
            <div
              key={valueKey}
              className={`${
                salesteamData?.[valueKey]?.toString().trim()
                  ? "py-3 sm:py-2 sm:grid sm:grid-cols-2 sm:gap-4"
                  : "hidden"
              }`}
            >
              <dt className="text-sm font-medium text-gray-500">{label}</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 capitalize">
                {salesteamData?.[valueKey] || "N/A"}
              </dd>
            </div>
          ))}
          {salesteamData?.assigned_properties?.length > 0 && (
            <div className="py-3 sm:py-2 sm:grid sm:grid-cols-2 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Assigned Properties
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1 capitalize space-y-1">
                {salesteamData.assigned_properties?.map((property, index) => (
                  <div key={index}>
                    <Link
                      href={`/properties/view/${property._id}`}
                      className=""
                    >
                      <p className="flex items-center gap-2 ">
                        <img
                          src={property?.images?.[0]}
                          alt={property?.title}
                          className="w-8 h-8 object-cover rounded-full"
                        />
                        <span className="text-gray-600 hover:border-b border-blue-500 hover:text-blue-500">
                          {property.title}
                        </span>{" "}
                      </p>
                    </Link>
                  </div>
                ))}
              </dd>
            </div>
          )}
        </div>
      </Card>
    </Card>
  );
}
