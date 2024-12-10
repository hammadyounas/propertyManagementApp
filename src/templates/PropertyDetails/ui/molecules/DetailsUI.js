const DetailsUI = ({ details }) => {
  return (
    <div className="my-4">
      <h2 className="text-lg">Property Details</h2>
      <p className="my-4 first-letter:capitalize lowercase">{details}</p>
    </div>
  );
};

export default DetailsUI;
