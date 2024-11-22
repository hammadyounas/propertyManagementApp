import layout from "./layoutReducer";
// import auth from "@/components/partials/auth/store";
import authReducer from "./authSlice";
const rootReducer = {
  layout,
  auth: authReducer,
};
export default rootReducer;
