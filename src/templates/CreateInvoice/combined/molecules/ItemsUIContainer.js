import ItemsUI from "../../ui/molecules/ItemsUI";

const Items = ({
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
    <ItemsUI
      register={register}
      errors={errors}
      loading={loading}
      fields={fields}
      append={append}
      remove={remove}
      getValues={getValues}
      setValue={setValue}
    />
  );
};

export default Items;
