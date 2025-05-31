import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";
import Tooltip from "../../../../components/ui/atoms/Tooltip";
import GlobalFilter from "../../../../components/ui/atoms/GlobalFilter";
import Button from "../../../../components/ui/molecules/Button";
import { calculateAverage, dateFormat } from "../../../../libs/utils/helper";
import DropdownMenu from "../../../../components/ui/organisms/DropdownMenu";

const TableUI = ({
  columns,
  rows,
  globalFilter,
  setGlobalFilter,
  push,
  acms,
}) => {
  return (
    <Card noborder>
      <div className="flex max-sm:flex-col sm:justify-between sm:items-center sm:mb-6 mb-2 w-full">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <div className="flex flex-wrap items-center justify-end">
          <div className="w-full flex items-center justify-end">
            <div className="mr-10 text-sm font-medium text-gray-500">
              <p className="font-semibold">Average</p>
              <p>
                ${" "}
                {calculateAverage("sale_price", acms).toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                )}
              </p>
            </div>
            <span>
              <Button
                text="Add ACM"
                onClick={() => push("/acms/create")}
                className="btn-primary bg-primary-default w-full font-normal text-sm"
              />
            </span>
          </div>
        </div>
      </div>

      {acms?.length === 0 ? (
        <div className="text-center p-4">No ACM's found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 lg:gap-10 sm:gap-4 sm:px-4">
          {acms.map((row, i) => (
            <Card
              key={row._id || i}
              className="bg-gray-100 rounded-lg shadow-sm text-sm max-sm:mb-2"
            >
              <div className="flex flex-col gap-2">
              {/* card header */}
                <div className="flex items-center justify-between capitalize">
                  <div className="flex items-center gap-4">
                    <img
                      src={row.subject_property?.images[0]}
                      alt={row.subject_property?.images[0]}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <h1 className="lg:text-base text-sm font-medium">
                      {row.subject_property?.title}
                    </h1>
                  </div>

                  <div>
                    <DropdownMenu
                      //   onEdit={() => push(`/acms/edit/${row._id}`)}
                      //   onDelete={() => handleDelete(row._id)}
                      onEdit={() => push(``)}
                      onDelete={() => {}}
                      showEdit={true}
                      showDelete={true}
                    />
                  </div>
                </div>

                {/* details */}
                <div className="mt-10  w-full mx-auto">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-500">Sold Date</p>
                      <p>{dateFormat(row.date_of_sale)}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Unit Sold</p>
                      <p>{row.unit_sold}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-3">
                    <div>
                      <p className="text-gray-500">Sale Price</p>
                      <p>{row.sale_price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Cap Rate</p>
                      <p>{row.cap_rate}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 mt-3">
                    <div>
                      <p className="text-gray-500">Net Operating Income</p>
                      <p>{row.cap_rate}</p>
                    </div>
                  </div>
                </div>

                {/* properties */}
                <div className="mt-5">
                  <p className=" text-gray-500 mb-2">Selected Properties</p>
                  {row.property && row?.property?.length > 0 ? (
                    <div className="inline-flex -gap-4">
                      {row?.property?.map((property, index) => (
                        <Tooltip
                          key={index}
                          placement="top"
                          arrow
                          content={property?.title}
                        >
                          <img
                            src={
                              property?.images[0] ||
                              "/assets/images/users/user-1.jpg"
                            } // Replace with actual avatar URL if available
                            alt={property.title}
                            className={`w-8 h-8 object-cover rounded-full ${
                              index !== 0 ? "-ml-1" : ""
                            }`}
                          />
                        </Tooltip>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400">--</div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TableUI;
