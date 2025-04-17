import moment from "moment";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import { Icon } from "@iconify/react";

const MeetingDetailsUI = ({
  setModalOpen,
  targetDivRef,
  currentMeeting,
  openModal,
  closeModal,
}) => {
  return (
    <div ref={targetDivRef} className="w-full mt-[20px] 2xl:w-[36%] 2xl:mt-0 capitalize">
      <Card bodyClass="p-0" className="rounded-none">
        <div className="w-full p-3 rounded-none flex justify-between items-center bg-black-500" >
          {/* <div onClick={()=>router.push("/tasks/create")} className="text-white bg-blue-600 self-start p-2 rounded-lg cursor-pointer">
                <p className="m-0">
                  Add Task
                </p>
              </div> */}
              <div className="flex items-center ">
                {/* <h5 className="mr-4 text-white">Meeting Information</h5> */}
                <h5 className="mr-4 md:text-xl text-lg text-white">{currentMeeting?.title}</h5>
              </div>
          <div className="flex items-center gap-2">
            <Icon
              className="text-2xl cursor-pointer hover:text-primary-default text-white"
              onClick={() => {
                setModalOpen(false);
                openModal();
              }}
              icon="heroicons-solid:pencil"
            />
            {/* <Icon
              className="w-[25px] h-[25px] cursor-pointer hover:text-danger-500 mx-4"
              onClick={() => {
                setModalOpen(false);
              }}
              icon="heroicons-solid:trash"
            /> */}
            <Icon
              className="text-2xl cursor-pointer text-white hover:text-danger-500"
              onClick={() => {
                setModalOpen(false);
                closeModal();
              }}
              icon="heroicons-solid:x"
            />
          </div>
        </div>
        <div className="max-h-screen overflow-scroll capitalize">
          <div className="">
            <Card className="bg-white border-b-4 border-primary-default">
              {/* <div className="flex items-center">
                <h5 className="mr-4">Meeting Information</h5>
              </div> */}
              <div className="flex w-full break-words">
                {/* <div className="flex flex-col mt-4 w-[48%]">
                  <label className="font-bold text-[16px]">Title</label>
                  <span className="text-[15px]">{currentMeeting?.title}</span>
                </div> */}
                <div className="flex flex-col w-full">
                  <label className="font-semibold text-[16px] text-black-500">Description</label>
                  <span className="text-[14px]">
                    {currentMeeting?.description}
                  </span>
                </div>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-2 w-[48%]">
                  <label className="font-semibold text-[16px] text-black-500">Start Time</label>
                  <span className="text-[14px]">
                    {moment(currentMeeting?.start_time).format(
                      "DD-MM-YYYY | hh:mm A"
                    )}
                  </span>
                </div>
                <div className="flex flex-col mt-2 w-[48%] pl-[10px]">
                  <label className="font-semibold text-[16px] text-black-500">End Time</label>
                  <span className="text-[14px]">
                    {moment(currentMeeting?.end_time).format(
                      "DD-MM-YYYY | hh:mm A"
                    )}
                  </span>
                </div>
              </div>
              <div className="flex w-full break-words justify-between">
                <div className="flex flex-col mt-2 w-[48%]">
                  <label className="font-semibold text-[16px] text-black-500">Location</label>
                  <span className="text-[14px]">
                    {currentMeeting?.location}
                  </span>
                </div>
                <div className="flex flex-col mt-2 w-[48%] pl-[10px]">
                  <label className="font-semibold text-[16px] text-black-500">Status</label>
                  <span className="text-[14px] flex items-center gap-1"><span className="text-green-700 text-xs">⬤</span> {currentMeeting?.status}</span>
                </div>
              </div>
            </Card>
          </div>
          <div className="mt-2">
            <Card className="bg-white border-b-4 border-primary-default" bodyClass="p-0">
              <h5 className="md:text-xl bg-black-default text-white text-lg p-3 ">Participants</h5>
                <div className="px-5 pt-5">
                  <h6 className="font-semibold text-lg text-primary-default">Client</h6>
                      <div className=" pb-4">
                        <div className="flex w-full break-words justify-between">
                          <div className="flex flex-col mt-2 w-[48%]">
                            <label className="font-semibold text-[16px] text-black-500">
                              Name
                            </label>
                            <span className="text-[14px]">{currentMeeting?.clients?.name}</span>
                          </div>
                          <div className="flex flex-col mt-2 w-[48%] pl-[10px]">
                            <label className="font-semibold text-[16px] text-black-500">
                              Email
                            </label>
                            <span className="text-[14px] lowercase">{currentMeeting?.clients?.email}</span>
                          </div>
                        </div>
                        <div className="flex w-full break-words justify-between">
                          <div className="flex flex-col mt-2 w-[48%]">
                            <label className="font-semibold text-[16px] text-black-500">
                              Phone
                            </label>
                            <span className="text-[14px]">{currentMeeting?.clients?.phoneNumber}</span>
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
         
                </div>
          
                <div className="px-5">
                  <h6 className="font-semibold text-lg text-primary-default">Salespersons</h6>
                      <div className=" pb-4">
                        <div className="flex w-full break-words justify-between">
                          <div className="flex flex-col mt-2 w-[48%]">
                            <label className="font-semibold text-[16px] text-black-500">
                              Name
                            </label>
                            <span className="text-[14px]">{currentMeeting?.salespersons?.name}</span>
                          </div>
                          <div className="flex flex-col mt-2 w-[48%] pl-[10px]">
                            <label className="font-semibold text-[16px] text-black-500">
                              Email
                            </label>
                            <span className="text-[14px] lowercase">{currentMeeting?.salespersons?.email}</span>
                          </div>
                        </div>
                        <div className="flex w-full break-words justify-between">
                          <div className="flex flex-col mt-4 w-[48%]">
                            <label className="font-semibold text-[16px] text-black-500">
                              Phone
                            </label>
                            <span className="text-[14px]">{currentMeeting?.salespersons?.contact_number}</span>
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
                    
                </div>
       
            </Card>
          </div>
          {/* <div className="mt-[40px]">
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
                  <span className="text-[15px]">
                    {moment(currentMeeting?.created_at).format(
                      "DD-MM-YYYY | hh:mm A"
                    )}
                  </span>
                </div>
                <div className="flex flex-col mt-4 w-[48%] pl-[10px]">
                  <label className="font-bold text-[16px]">Updated At</label>
                  <span className="text-[15px]">
                    {moment(currentMeeting?.updated_at).format(
                      "DD-MM-YYYY | hh:mm A"
                    )}
                  </span>
                </div>
              </div>
            </Card>
          </div> */}
        </div>
      </Card>
    </div>
  );
};

export default MeetingDetailsUI;
