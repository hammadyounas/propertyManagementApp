import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";

const AdditionalInformationUI = ({ register, loading }) => {
  return (
    <div className="mt-8">
      <h6>Additional Information</h6>
      <div className="my-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[49%] mt-1">
            <Textarea
              name="notes"
              label="Additional Notes"
              type="text"
              register={register}
              placeholder="Any additional information for the client (e.g., late payment policies, disclaimers)."
              row={5}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationUI;
