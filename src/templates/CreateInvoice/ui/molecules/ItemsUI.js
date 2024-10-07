import Icon from "@/components/ui/atoms/Icon";
import Textinput from "@/components/ui/atoms/TextInput";
import { v4 as uuidv4 } from "uuid";

const ItemsUI = ({
  register,
  errors,
  loading,
  fields,
  append,
  remove,
  getValues,
  setValue,
}) => {
  return (
    <div className="mt-8">
      <h6>Items</h6>
      <div className="my-4 border border-1 border-dashed p-4">
        {errors?.items && (
          <p className="text-sm text-danger-500 mt-2">
            {errors?.items?.message}
          </p>
        )}
        {fields?.map((item, index) => {
          return (
            <div
              className="flex flex-wrap justify-between items-center mb-4"
              key={index}
            >
              <div className="w-[12%]">
                <Textinput
                  name={`items[${index}].item_name`}
                  label="Item Name"
                  type="text"
                  register={register}
                  error={errors.items?.[index]?.item_name}
                  placeholder="Item Name"
                  disabled={loading}
                />
              </div>
              <div className="w-[12%]">
                <Textinput
                  name={`items[${index}].item_description`}
                  label="Description"
                  type="text"
                  register={register}
                  error={errors.items?.[index]?.item_description}
                  placeholder="Description"
                  disabled={loading}
                />
              </div>
              <div className="w-[12%]">
                <Textinput
                  name={`items[${index}].item_quantity`}
                  label="Quantity"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.item_quantity}
                  placeholder="Quantity"
                  disabled={loading}
                  value={getValues(`items[${index}]`).item_quantity}
                  // error={errors.title}
                  onChange={(e) => {
                    setValue(`items[${index}].item_quantity`, e.target.value);
                    const items = getValues("items");
                    setValue("items", [...items]);
                  }}
                />
              </div>
              <div className="w-[12%]">
                <Textinput
                  name={`items[${index}].item_price`}
                  label="Price"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.item_price}
                  placeholder="Price"
                  disabled={loading}
                  value={getValues(`items[${index}]`).item_price}
                  // error={errors.title}
                  onChange={(e) => {
                    setValue(`items[${index}].item_price`, e.target.value);
                    const items = getValues("items");
                    setValue("items", [...items]);
                  }}
                />
              </div>
              <div className="w-[12%]">
                <Textinput
                  name={`items[${index}].item_tax`}
                  label="Tax Percentage"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.item_tax}
                  placeholder="Price"
                  disabled={loading}
                  value={getValues(`items[${index}]`).item_tax}
                  // error={errors.title}
                  onChange={(e) => {
                    setValue(`items[${index}].item_tax`, e.target.value);
                    const items = getValues("items");
                    setValue("items", [...items]);
                  }}
                />
              </div>
              <div className="w-[12%]">
                <Textinput
                  name={`items[${index}].item_total`}
                  label="Total"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.item_total}
                  placeholder="Total"
                  disabled={true}
                  //   value={getValues(`items[${index}]`).item_total}
                />
              </div>
              <div className="w-[12%] self-end mb-2">
                <span onClick={() => remove(index)}>
                  <Icon icon="heroicons-outline:trash" width={25} />
                </span>
              </div>
            </div>
          );
        })}
        <button
          className="font-bold"
          type="button"
          onClick={() =>
            append({
              item_id: uuidv4(),
              item_name: "",
              item_description: "",
              item_quantity: 0,
              item_price: 0,
              item_tax: 0,
              item_total: 0,
            })
          }
        >
          + Add New
        </button>
      </div>
    </div>
  );
};

export default ItemsUI;
