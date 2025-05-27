import Card from "@/components/combined/molecules/CardUIContainer";
import ReactSelect from "react-select";
import Textinput from "@/components/ui/atoms/TextInput";
import Button from "../../../../components/ui/molecules/Button";

export default function FormUI({
  register,
  errors,
  loading,
  selectedProperty,
  handleSelectProperty,
  properties,
  push,
  handleSubmit,
  onSubmit,
}) {
  return (
    <div className="w-full lg:w-[75%]">
      <Card title="Create ACM">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="date_of_sale"
                  label="Sold Date*"
                  type="date"
                  register={register}
                  error={errors.date_of_sale}
                  placeholder="Sold Date"
                  disabled={loading}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <div className="my-2 text-sm font-medium">Property Name*</div>
                <ReactSelect
                  name="property"
                  value={selectedProperty}
                  onChange={handleSelectProperty}
                  options={properties}
                  placeholder="Property Name"
                  isDisabled={loading}
                  className="text-sm"
                />
                {errors?.property && !selectedProperty && (
                  <p className="text-sm text-danger-500 mt-2">
                    {errors?.property?.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="unit_sold"
                  label="Unit Sold*"
                  type="text"
                  register={register}
                  error={errors.unit_sold}
                  placeholder="Unit Sold"
                  disabled={loading}
                />
              </div>
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="sale_price"
                  label="Sale Price*"
                  type="number"
                  register={register}
                  error={errors.email}
                  placeholder="Sale Price"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-[49%]">
                <Textinput
                  name="net_operating_income"
                  label="Net Operating Income (NOI)*"
                  type="number"
                  register={register}
                  error={errors.net_operating_income}
                  placeholder="Net Operating Income (NOI)"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex justify-center md:justify-end mt-12">
              <Button
                text={"Discard"}
                className={
                  "md:!w-36 mx-4 bg-transparent border border-black-default !text-black-default"
                }
                onClick={() => push("/acms")}
                loading={loading}
              />
              <Button
                text={loading ? "Submitting..." : "Submit"}
                className={"bg-primary-default text-white md:!w-36"}
                type="submit"
                loading={loading}
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
