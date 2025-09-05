import React from 'react';
import PdfHeader from '../../../../../components/ui/molecules/PdfHeader';

const PropertyLocationPage = ({ acmData }) => {
  return (
    <div className="w-full bg-gray-100 min-h-screen p-8 flex flex-col" style={{ height: '1120px', width: '794px' }}>

      {/* Header */}
      <PdfHeader acmData={acmData} />

      {/* Main Content */}
      <div className="my-5">
        <h2 className="text-xl font-bold mb-2">PICTURE OF THE PROPERTY</h2>
        {/* Map Placeholder */}
        {/* <div className="flex items-center mb-5">
          <iframe src={acmData?.base_property?.location_map_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2665.3790385044963!2d-73.6638109!3d45.50075239999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13!1!3m3!1m2!1s0x4cc918327e279583%3A0x48be5c7beb5c9f4b!2s8500%20Decarie%20Blvd%203rd%20Floor%2C%20Mount%20Royal%2C%20QC%20H4P%202N2%2C%20Canada!5e1!3m2!1sen!2s!4v1756816662381!5m2!1sen!2s"} width="730" height="350" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div> */}
        <div className="bg-gray-200 h-84 rounded-lg flex items-center justify-center mt-2">
          <img
            src={acmData?.base_property?.images?.[0] || "/assets/images/all-img/property.jpeg"}
            alt="Property Image"
            className="w-[730px] h-[350px] object-cover"
          />
        </div>
      </div>

      {/* Property Image */}
      <div className="mb-2">
        {/* <h2 className="text-xl font-bold text-gray-700 mb-6">PICTURE OF THE PROPERTY</h2> */}

        {/* Property Image Placeholder */}
        <div className="bg-gray-200 h-84 rounded-lg flex items-center justify-center mt-2">
          <img
            src={acmData?.base_property?.images?.[1] || "/assets/images/all-img/post-1.png"}
            alt="Property Image"
            className="w-[730px] h-[350px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyLocationPage;