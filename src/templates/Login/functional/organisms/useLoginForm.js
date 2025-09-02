import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/authSlice";
import { API_URL, API_PREFIX } from "../../../../configs/index";
import { postRequest } from "../../../../libs/utils/request_handler";

// Define validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const useForm = () => {
  const initialFormValues = {
    email: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((form) => ({ ...form, [name]: value }));

    // Use Yup schema to validate a specific field
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setErrors((errors) => ({ ...errors, [name]: "" })))
      .catch((error) =>
        setErrors((errors) => ({ ...errors, [name]: error.message }))
      );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formValues, { abortEarly: false });

      setLoading(true);
      const response = await postRequest(`login`, formValues);

      if (response.status) {
        const { data } = response;
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("role", data.user.role);
        dispatch(setUser(data?.user));
        setFormValues(initialFormValues);
        toast.success("Login Successfully");
        router.push("/dashboard");
      }
    } catch (error) {
      setLoading(false);

      if (error.response) {
        // Handle server errors and show error toast messages
        const { data, status } = error.response;
        console.error("Server error:", data);
        if (status === 403) {
          const message = data.message?.toLowerCase();

          if (message.includes("joining date")) {
            toast.error("You cannot login before your joining date.");
          } else if (message.includes("deactivated")) {
            toast.error(
              "Your account has been deactivated. Please contact the administrator."
            );
          } else {
            toast.error(
              data.message || "Access denied. Please contact support."
            );
          }
        } else {
          toast.error(data.message || "Invalid credentials. Please try again.");
        }
      } else if (error.name === "ValidationError") {
        // Handle Yup validation errors and show toast
        const formattedErrors = error.inner.reduce(
          (acc, err) => ({ ...acc, [err.path]: err.message }),
          {}
        );
        setErrors(formattedErrors);

        toast.error("Please fix the validation errors.");
      } else {
        // Handle other errors (e.g., network issues)
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleInputChange,
    handleSubmit,
    errors,
    formValues,
    loading,
  };
};
