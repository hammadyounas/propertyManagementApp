"use client";
import Textinput from "@/components/ui/atoms/TextInput";
import Card from "../../../../components/combined/molecules/CardUIContainer";
import Button from "../../../../components/ui/atoms/Button";
import EmailEditor from "react-email-editor";

const FormUI = ({
  handleSubmit,
  onSubmit,
  loading,
  register,
  errors,
  push,
  emailEditorRef,
  templateLoading,
  handleTemplateLoaded,
}) => {
  return (
    <div className="w-full">
      <Card title="Create Template">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-wrap justify-between items-start">
              <div className="flex-1">
                <Textinput
                  name="name"
                  label="Name*"
                  type="text"
                  register={register}
                  error={errors.name}
                  placeholder="Name"
                  disabled={loading}
                />
              </div>
              <div className="flex mt-8">
                <Button
                  text={"Discard"}
                  className={
                    "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
                  }
                  onClick={() => push("/email-templates")}
                  loading={loading}
                />
                <Button
                  text={"Submit"}
                  className={"md:!w-36"}
                  type="submit"
                  loading={loading}
                />
              </div>
            </div>
            {templateLoading && (
              <p className="text-center my-8">Loading Template...</p>
            )}
            <div className="overflow-auto my-4">
              <EmailEditor
                ref={emailEditorRef}
                onReady={handleTemplateLoaded}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FormUI;
