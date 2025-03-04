"use client";

import { ToastContainer } from "react-toastify";
import Card from "../../../../components/combined/molecules/CardUIContainer";

const FormUI = ({ children, handleSubmit, onSubmit }) => {
  return (
    <div className="w-full lg:w-[75%]">
      <ToastContainer />
      <Card title="Add Details">
        <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      </Card>
    </div>
  );
};

export default FormUI;
