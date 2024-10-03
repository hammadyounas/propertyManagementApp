const AmenitiesUI = ({ amenities }) => {
  return (
    <div className="my-4">
      <h2 className="text-lg">Amenities</h2>
      <div className="flex flex-wrap my-4">
        {amenities?.map((a) => {
          return (
            <div className="flex items-center bg-gray-200 p-2 rounded-lg  mr-4 mt-2">
              <div className="w-2 h-2 bg-primary-default rounded-full mr-2"></div>
              <p>{a}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AmenitiesUI;
