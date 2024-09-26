import Textinput from "../../../../components/atoms/TextInput";
import Button from "../../../../components/atoms/Button";
import Checkbox from "../../../../components/atoms/Checkbox";

const SignUpFormUI = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setChecked,
  checked,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
      <Textinput
        name="name"
        label="name"
        type="text"
        placeholder=" Enter your name"
        register={register}
        error={errors.name}
        className="px-6"
        disabled={loading}
      />{" "}
      <Textinput
        name="email"
        label="email"
        type="email"
        placeholder=" Enter your email"
        register={register}
        error={errors.email}
        className="px-6"
        disabled={loading}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        placeholder=" Enter your password"
        register={register}
        error={errors.password}
        className="px-6"
        disabled={loading}
      />
      <Button loading={loading} text={"Create an account"} />
    </form>
  );
};

export default SignUpFormUI;
