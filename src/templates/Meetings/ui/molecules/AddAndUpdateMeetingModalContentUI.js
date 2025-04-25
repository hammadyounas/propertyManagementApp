import Textinput from "../../../../components/ui/atoms/TextInput";
import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";
import ReactSelect from "react-select";
import Button from "../../../../components/ui/atoms/Button";
import RadioButton from "../../../../components/ui/atoms/RadioButtin";
import { ToastContainer } from "react-toastify";

const AddAndUpdateMeetingModalContentUI = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  statuses,
  status,
  handleSelectStatus,
  salespersons,
  selectedSalesPersons,
  handleSelectSalesperson,
  clients,
  selectedClients,
  handleSelectClients,
  closeModal,
  loading,
  currentMeetingId,
  error,
  isSalespersonDisabled,
  currentMeeting,
  handleDiscard,
  isStartTimeDisabled,
  isEndTimeDisabled,
  isOtherFieldsDisabled,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToastContainer />
      <h6>Meeting Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <Textinput
              name="title"
              label="Title*"
              type="text"
              register={register}
              error={errors.title}
              placeholder="Title"
              className="px-4"
              disabled={isOtherFieldsDisabled}
            />
          </div>
          <div className="w-full mt-1">
            <Textarea
              name="description"
              label="Description*"
              type="text"
              register={register}
              error={errors.description}
              placeholder="Description"
              row={5}
              className="px-4"
              disabled={isOtherFieldsDisabled}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%]">
            <Textinput
              name="start_time"
              label="Start Time*"
              type="datetime-local"
              register={register}
              error={errors.start_time}
              placeholder="Start Time"
              disabled={isStartTimeDisabled}
              min={
                !currentMeetingId || currentMeeting?.status === "rescheduled" // create mode → restrict
                  ? new Date().toISOString().slice(0, 16)
                  : undefined // edit mode & not rescheduled → no restriction
              }
            />
          </div>
          <div className="w-full md:w-[49%]">
            <Textinput
              name="end_time"
              label="End Time*"
              type="datetime-local"
              register={register}
              error={errors.end_time}
              placeholder="End Time"
              disabled={isEndTimeDisabled}
              min={
                !currentMeetingId
                  ? new Date().toISOString().slice(0, 16)
                  : undefined
              }
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <RadioButton
              name="location_status"
              label="Location Status*"
              type="radio"
              register={register}
              error={errors.location_status}
              placeholder="Location Status"
              disabled={isOtherFieldsDisabled}
              radioOptions={[
                { label: "Online", value: "online" },
                { label: "Onsite", value: "onsite" },
              ]}
              className="text-sm"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <Textinput
              name="location"
              label="Location*"
              type="text"
              register={register}
              error={errors.location}
              placeholder="Location or link for the meeting"
              className="px-4"
              disabled={isOtherFieldsDisabled}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between">
          <div className="mt-[6px] w-full">
            <div className="my-2 text-sm font-medium">Status*</div>
            <ReactSelect
              name="status"
              value={status}
              onChange={handleSelectStatus}
              options={statuses}
              placeholder="Status"
              isDisabled={loading}
              className="text-sm capitalize"
            />
            {errors?.status && !status && (
              <p className="text-sm text-danger-500 mt-2">
                {errors?.status?.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h6>Participants</h6>
        <div className="flex flex-wrap justify-between">
          <div className="w-full">
            <div className="my-4">
              <div className="my-2 text-sm font-medium">Broker *</div>
              <ReactSelect
                name="salespersons"
                // isMulti
                value={selectedSalesPersons}
                onChange={handleSelectSalesperson}
                options={salespersons?.map((salesPerson) => ({
                  label: salesPerson.name,
                  value: salesPerson._id,
                }))}
                placeholder={"Select Broker"}
                isDisabled={currentMeetingId? isOtherFieldsDisabled : isSalespersonDisabled}
                className="text-sm capitalize"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="">
              <div className="my-2 text-sm font-medium">Client *</div>
              <ReactSelect
                name="clients"
                // isMulti
                value={selectedClients}
                onChange={handleSelectClients}
                options={clients?.map((client) => ({
                  label: client.name,
                  value: client._id,
                }))}
                placeholder="Select Client"
                isDisabled={isOtherFieldsDisabled}
                className="text-sm capitalize"
              />
            </div>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-danger-500 text-sm mt-2 text-center">{error}</p>
      )}
      <div className="flex justify-center md:justify-end mt-12">
        <Button
          text={"Discard"}
          className={
            "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
          }
          onClick={handleDiscard}
          loading={loading}
        />
        <Button
          text={currentMeetingId ? "Update" : "Create"}
          className={"md:!w-36"}
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

export default AddAndUpdateMeetingModalContentUI;
