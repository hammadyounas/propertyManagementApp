import React from "react";

export default function LocationUI({ locationMapUrl }) {
  return (
    <div className="my-4">
      <h2 className="text-lg">Location</h2>
      <div className="flex flex-wrap my-4 w-full">
        <div id="map" style={{ textAlign: "center", width: "100%" }}>
          <div
            id="map"
            style={{ textAlign: "center", width: "100%" }}
            dangerouslySetInnerHTML={{ __html: locationMapUrl}}
          />
        </div>
      </div>
    </div>
  );
}
