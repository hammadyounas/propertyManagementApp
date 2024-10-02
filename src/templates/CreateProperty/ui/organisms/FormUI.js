"use client";

import Card from "../../../../components/combined/molecules/CardUIContainer";

const FormUI = ({ children, handleSubmit, onSubmit }) => {
  return (
    <div>
      <Card title="Create Property">
        <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
      </Card>
    </div>
  );
};

export default FormUI;
