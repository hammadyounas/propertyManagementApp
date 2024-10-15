import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";

const MeetingDetailsUI = ({ setModalOpen, targetDivRef }) => {
  return (
    <div ref={targetDivRef} className="w-full mt-[20px] 2xl:w-[36%] 2xl:mt-0 ">
      <Card>
        <div className="w-full mt-2 pb-[20px] flex justify-between items-center">
          {/* <div onClick={()=>router.push("/tasks/create")} className="text-white bg-blue-600 self-start p-2 rounded-lg cursor-pointer">
                <p className="m-0">
                  Add Task
                </p>
              </div> */}
          <div className=" w-full flex justify-end ">
            <Icon
              className="w-[25px] h-[25px] cursor-pointer hover:text-danger-500"
              onClick={() => {
                setModalOpen(false);
              }}
              icon="heroicons-solid:pencil"
            />
            <Icon
              className="w-[25px] h-[25px] cursor-pointer hover:text-danger-500 mx-4"
              onClick={() => {
                setModalOpen(false);
              }}
              icon="heroicons-solid:trash"
            />
            <Icon
              className="w-[25px] h-[25px] cursor-pointer hover:text-danger-500"
              onClick={() => {
                setModalOpen(false);
              }}
              icon="heroicons-solid:x"
            />
          </div>
        </div>
        <div className="max-h-[570px] overflow-scroll">
          <div className="">
            <Card className="bg-gray-100 shadow-xl">
              <div className="flex items-center">
                <h5 className="mr-4">Meeting Information</h5>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-4 w-[48%]">
                  <label className="font-bold text-[16px]">Title</label>
                  <span className="text-[15px]">Property Tour</span>
                </div>
                <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                  <label className="font-bold text-[16px]">Description</label>
                  <span className="text-[15px]">
                    A meeting to tour the property.
                  </span>
                </div>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-4 w-[48%]">
                  <label className="font-bold text-[16px]">Start Time</label>
                  <span className="text-[15px]">07-10-2024 | 12:00 AM</span>
                </div>
                <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                  <label className="font-bold text-[16px]">End Time</label>
                  <span className="text-[15px]">10-10-2024 | 12:00 AM</span>
                </div>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-4 w-[48%]">
                  <label className="font-bold text-[16px]">Location</label>
                  <span className="text-[15px]">Abc location, blcok 5</span>
                </div>
                <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                  <label className="font-bold text-[16px]">Status</label>
                  <span className="text-[15px]">scheduled</span>
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-[40px]">
            <Card className="bg-gray-100 shadow-xl">
              <h5>Participants</h5>
              <h6 className="my-4">Clients</h6>
              {[1, 2].map((c) => {
                return (
                  <div className="border-b pb-4">
                    <div className="flex w-full break-words justify-between">
                      <div className="flex flex-col mt-4 w-[48%]">
                        <label className="font-bold text-[16px]">Name</label>
                        <span className="text-[15px]">John Doe</span>
                      </div>
                      <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                        <label className="font-bold text-[16px]">Email</label>
                        <span className="text-[15px]">johndoe@gmail.com</span>
                      </div>
                    </div>
                    <div className="flex w-full break-words justify-between">
                      <div className="flex flex-col mt-4 w-[48%]">
                        <label className="font-bold text-[16px]">Phone</label>
                        <span className="text-[15px]">123456789</span>
                      </div>
                      {/* <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                            <label className="font-bold text-[16px]">
                              Phone
                            </label>
                            <span className="text-[15px]">
                              {currentBooking?.phone || "--"}
                            </span>
                          </div> */}
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
          <div className="mt-[40px]">
            <Card className="bg-gray-100 shadow-xl">
              <div className="flex items-center">
                <h5 className="mr-4">Scheduling</h5>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-4 w-[48%]">
                  <label className="font-bold text-[16px]">Created By</label>
                  <span className="text-[15px]">ABC Admin</span>
                </div>
                <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                  <label className="font-bold text-[16px]">Updated By</label>
                  <span className="text-[15px]">xyz Admin</span>
                </div>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-4 w-[48%]">
                  <label className="font-bold text-[16px]">Created At</label>
                  <span className="text-[15px]">07-10-2024 | 12:00 AM</span>
                </div>
                <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                  <label className="font-bold text-[16px]">Updated At</label>
                  <span className="text-[15px]">10-10-2024 | 12:00 AM</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MeetingDetailsUI;
