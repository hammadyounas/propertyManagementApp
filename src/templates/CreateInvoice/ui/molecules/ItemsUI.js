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
              className="w-full flex flex-wrap justify-between items-start mb-4"
              key={index}
            >
              <div className="w-full md:w-[33%] xl:w-[14%]">
                <Textinput
                  name={`items[${index}].itemName`}
                  label="Item Name"
                  type="text"
                  register={register}
                  error={errors.items?.[index]?.itemName}
                  placeholder="Item Name"
                  disabled={loading}
                />
              </div>
              <div className="w-full md:w-[33%] xl:w-[14%]">
                <Textinput
                  name={`items[${index}].description`}
                  label="Description"
                  type="text"
                  register={register}
                  error={errors.items?.[index]?.description}
                  placeholder="Description"
                  disabled={loading}
                />
              </div>
              {/* <div className="w-full md:w-[33%] xl:w-[14%]">
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
              </div> */}
              <div className="w-full md:w-[33%] xl:w-[14%]">
                <Textinput
                  name={`items[${index}].price`}
                  label="Price"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.price}
                  placeholder="Price"
                  disabled={loading}
                  value={getValues(`items[${index}]`).price}
                  // error={errors.title}
                  onChange={(e) => {
                    setValue(`items[${index}].price`, e.target.value);
                    const items = getValues("items");
                    setValue("items", [...items]);
                  }}
                />
              </div>
              <div className="w-full md:w-[33%] xl:w-[14%]">
                <Textinput
                  name={`items[${index}].gst`}
                  label="GST (5%)"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.gst}
                  placeholder="GST"
                  disabled={true}
                  //   value={getValues(`items[${index}]`).item_total}
                />
              </div>
              <div className="w-full md:w-[33%] xl:w-[14%]">
                <Textinput
                  name={`items[${index}].qst`}
                  label="QST (9.975%)"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.qst}
                  placeholder="Total"
                  disabled={true}
                  //   value={getValues(`items[${index}]`).item_total}
                />
              </div>
              <div className="w-full md:w-[33%] xl:w-[14%]">
                <Textinput
                  name={`items[${index}].total`}
                  label="Total"
                  type="number"
                  register={register}
                  error={errors.items?.[index]?.total}
                  placeholder="Total"
                  disabled={true}
                  //   value={getValues(`items[${index}]`).item_total}
                />
              </div>
              <div className="w-full md:w-[33%] xl:w-[14%] h-16 xl:h-28 flex items-center pl-4">
                <span className="cursor-pointer" onClick={() => remove(index)}>
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
              // item_id: uuidv4(),
              itemName: "",
              description: "",
              // item_quantity: 0,
              price: 0,
              // item_tax: 0,
              gst: 0,
              qst: 0,
              total: 0,
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
