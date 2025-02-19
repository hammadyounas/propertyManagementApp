"use client";

import { ToastContainer } from "react-toastify";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import LoadingUI from "../../../../components/ui/atoms/LoadingUI";

const FormUI = ({ children, handleSubmit, onSubmit, getDataLoading }) => {
  return (
    <div className="w-full lg:w-[75%]">
      <ToastContainer />
      <Card title="Edit Property">
        {getDataLoading ? (
          <div className="flex items-center justify-center w-full">
            <LoadingUI />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
        )}
      </Card>
    </div>
  );
};

export default FormUI;
