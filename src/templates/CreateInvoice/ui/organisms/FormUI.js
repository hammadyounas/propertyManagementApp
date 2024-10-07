"use client";

import Card from "../../../../components/combined/molecules/CardUIContainer";

const FormUI = ({ children, handleSubmit, onSubmit }) => {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Create Invoice">
        <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      </Card>
    </div>
  );
};

export default FormUI;
