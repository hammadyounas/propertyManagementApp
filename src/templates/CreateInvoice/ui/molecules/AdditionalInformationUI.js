import Textarea from "../../../../components/combined/molecules/TextareaUIContainer";

const AdditionalInformationUI = ({ register, loading, total }) => {
  return (
    <div className="mt-8">
      <h6>Additional Information</h6>
      <div className="my-4 space-y-4">
        <div className="flex justify-between items-center">
          <p className="font-medium">Total commission payable</p>
          <p className="font-medium">${total?.grandTotal?.totalItemTotal}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Commission amount</p>
          <p className="font-medium">${total?.grandTotal?.totalPrice}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Plus GST (5%)</p>
          <p className="font-medium">${total?.grandTotal?.totalGst}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-medium">Plus QST (9.75%)</p>
          <p className="font-medium">${total?.grandTotal?.totalQst}</p>
        </div>
        <div className="flex justify-between items-center font-bold border-t pt-4">
          <p>Total:</p>
          <p>${total?.grandTotal?.totalItemTotal}</p>
        </div>
      </div>
      <p className="text-gray-700 mt-6">
        Thank you and we look forward to doing business together again!
      </p>
    </div>
  );
};

export default AdditionalInformationUI;
