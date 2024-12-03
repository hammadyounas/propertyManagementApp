import {useState, useEffect} from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

const schema = yup
.object({
  newPassword: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
})
.required();

export default function useProfile() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
      
        } catch (err) {
        //   console.error("Unexpected error:", err);
        }
      };
  
      fetchUserProfile();
    }, []);
  
    const onSubmit = async (data) => {
      setLoading(true);
      try {
        const payload = { ...data};
        // const response = await postRequest(`reset-password/${id}`, payload);
        toast.success("Password reset successfully!");
        reset();  
      } catch (error) {
        // console.error("Error resetting password:", error.response?.data || error.message);
        toast.error("Password reset failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };
 

  return{
    profileData,
    loading,
    register,
    errors,
    handleSubmit,
    onSubmit,
  }
}
