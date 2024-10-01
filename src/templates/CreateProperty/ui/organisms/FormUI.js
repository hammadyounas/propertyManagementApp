"use client";

import Card from "../../../../components/combined/molecules/CardUIContainer";

const FormUI = ({ children }) => {
  return (
    <div>
      <Card title="Create Property">
        <form
          // onSubmit={handleSubmit((data) => console.log(data))}
          onSubmit={() => {}}
        >
          {children}
        </form>
      </Card>
    </div>
  );
};

export default FormUI;
