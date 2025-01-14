import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";

const AdditionalInformationUI = ({ register, loading }) => {
  return (
    <div className="mt-8">
      <h6>Additional Information</h6>
      <div className="my-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total commission payable</p>
          <p className="font-medium">$1,550.00</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Commission amount</p>
          <p className="font-medium">$1348.12</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Plus GST 5% (755399938)</p>
          <p className="font-medium">$67.12</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Plus QST 9.975% (1226981027)</p>
          <p className="font-medium">$134.47</p>
        </div>
        <div className="flex justify-between items-center font-bold border-t pt-4">
          <p>Total:</p>
          <p>$1,550.00</p>
        </div>
      </div>
      <p className="text-gray-700 mt-6">
        Thank you and we look forward to doing business together again!
      </p>
    </div>
  );
};

export default AdditionalInformationUI;
