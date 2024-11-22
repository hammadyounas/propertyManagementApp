import { useForm } from "../../functional/organisms/useLoginForm";
import FormUI from "../../ui/organisms/FormUI";

export const FormContainer = () => {
  const { ...props } = useForm();
  return <FormUI {...props} />;
};
