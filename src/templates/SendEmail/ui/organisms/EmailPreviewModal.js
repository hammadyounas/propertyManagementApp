import React from "react";
import Modal from "../../../../components/combined/organisms/ModalUIContainer";
import Button from "../../../../components/ui/atoms/Button";

const EmailPreviewModal = ({
  activeModal,
  closeModal,
  emailData,
  handleConfirm,
  loading,
}) => {
  return (
    <Modal
      title="Email Preview"
      activeModal={activeModal}
      onClose={() => !loading && closeModal()}
      centered
      footerContent={
        <Button
          text="Confirm & Send"
          className="btn-primary bg-primary-default"
          onClick={handleConfirm} // Replace with actual send function
          loading={loading}
          type="submit"
        />
      }
    >
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="mb-4">
          <img
            src="https://static.vecteezy.com/system/resources/previews/015/577/147/non_2x/property-and-construction-logo-design-vector.jpg"
            alt="Company Logo"
            width={100}
          />
        </div>
        {emailData.image && (
          <div className="flex justify-center mb-4">
            <img
              src={emailData.image instanceof File || emailData.image instanceof Blob ? URL.createObjectURL(emailData.image) : emailData.image}
              alt="Email Banner"
              className="rounded-lg w-full max-h-60 object-cover"
            />
          </div>
        )}

        <h1 className="text-xl font-bold text-teal-600 text-center mb-4">
          {emailData?.title}
        </h1>
        <p className="text-gray-700 text-left mb-4">{emailData?.description}</p>
        <div className="flex justify-center">
          <a
            href={"#"}
            className="inline-block px-6 py-3 bg-teal-500 text-white font-bold rounded-lg text-center hover:bg-teal-600"
          >
            Learn More
          </a>
        </div>
        <div className="text-center text-md text-[#333] mt-6 border-t p-5 bg-gray-200">
          <p>Follow us</p>
          <div className="flex justify-center gap-4 my-4 items-center">
            <a href="https://www.facebook.com">
              <img
                src="https://cdn.jsdelivr.net/gh/gauravghongde/social-icons@master/PNG/Color/Facebook.png"
                alt="Facebook"
                width={32}
                height={32}
              />
            </a>
            <a href="https://twitter.com">
              <img
                src="https://cdn.jsdelivr.net/gh/gauravghongde/social-icons@master/PNG/Color/Twitter.png"
                alt="Twitter"
                width={32}
                height={32}
              />
            </a>
          </div>
          <p className="mt-2">Property Management, The Real Estate Builder</p>
        </div>
      </div>
    </Modal>
  );
};

export default EmailPreviewModal;
