import React from "react";

export default function LocationUI({ locationMapUrl }) {
  // Check if locationMapUrl contains an iframe
  const isIframe = locationMapUrl && locationMapUrl.toLowerCase().includes('<iframe');
  
  return (
    <div className="my-4">
      <h2 className="text-lg">Location</h2>
      <div className="flex flex-wrap my-4 w-full">
        <div id="map" style={{ textAlign: "center", width: "100%" }}>
          {isIframe ? (
            <div
              id="map"
              className="whitespace-pre-wrap"
              style={{ textAlign: "center", width: "100%" }}
              dangerouslySetInnerHTML={{ __html: locationMapUrl}}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
              <img 
                src="/assets/images/all-img/no-location.png" 
                alt="No location found" 
                className="w-24 h-24 object-contain opacity-60"
              />
              <p className="text-gray-500 mt-2">No location found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
