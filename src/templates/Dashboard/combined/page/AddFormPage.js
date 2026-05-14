import React from "react";
import useAddForm from "../../functionality/page/useAddForm";
import FormUI from "../../ui/organisms/FormUI";
import AddForm from "../../ui/molecule/AddForm";
import Button from "../../../../components/ui/atoms/Button";
import { AppRoutes } from "@/constants/appRoutes";

const AddFormPage = () => {
  const {
    register,
    errors,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    loading,
    invoice,
    pmtReceived,
    handleSelectInvoiceStatus,
    handlePmtReceived,
    onSubmit,
    invoiceStatus,
    push,
    pmtReceivedStatus,
    editPage,
    watch,
    wordCount,
  } = useAddForm();

  console.log("editapge", editPage)
  return (
    <>
      <FormUI handleSubmit={handleSubmit} onSubmit={onSubmit} title={"Add Details"}>
        <AddForm
          register={register}
          errors={errors}
          control={control}
          getValues={getValues}
          setValue={setValue}
          reset={reset}
          loading={loading}
          invoice={invoice}
          pmtReceived={pmtReceived}
          handleSelectInvoiceStatus={handleSelectInvoiceStatus}
          handlePmtReceived={handlePmtReceived}
          invoiceStatus={invoiceStatus}
          pmtReceivedStatus={pmtReceivedStatus}
          editPage={editPage}
          wordCount={wordCount}
          watch={watch}
        />
       

        <div className="flex justify-center md:justify-end mt-12">
          <Button
            text={"Discard"}
            className={
              "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
            }
            onClick={() => push(AppRoutes.DASHBOARD)}
            loading={loading}
          />
          <Button
            text={"Submit"}
            className={"md:!w-36"}
            type="submit"
            loading={loading}
          />
        </div>
      </FormUI>
    </>
  );
};

export default AddFormPage;
