import useSignUpForm from "../../functional/organisms/useSignUpForm";
import SignUpFormUI from "../../ui/organisms/SignUpFormUI";

const SignUpFormUIContainer = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    errors,
    setChecked,
    checked,
    loading,
  } = useSignUpForm();
  return (
    <SignUpFormUI
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      setChecked={setChecked}
      checked={checked}
      loading={loading}
    />
  );
};

export default SignUpFormUIContainer;
