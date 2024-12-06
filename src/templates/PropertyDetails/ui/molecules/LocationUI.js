import React from "react";

export default function LocationUI({ locationMapUrl }) {
  return (
    <div className="my-4">
      <h2 className="text-lg">Location</h2>
      <div className="flex flex-wrap my-4 w-full">
        <div id="map" style={{ textAlign: "center", width: "100%" }}>
          <iframe
            src={
              locationMapUrl ||
              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28968.491278753427!2d67.02223737519975!3d24.827573438137424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e84755a83d3%3A0xf49fbe49c4a0095e!2sibex.%20Pakistan!5e0!3m2!1sen!2s!4v1731342989428!5m2!1sen!2s"
            }
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
