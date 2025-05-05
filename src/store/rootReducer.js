import layout from "./layoutReducer";
// import auth from "@/components/partials/auth/store";
import authReducer from "./authSlice";
import meetingsReducer from "./features/meetings/meetingSlice"
import userReducer from "./features/users/userSlice";
import clientReducer from "./features/clients/clientSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import invoicesReducer from "./features/invoices/invoicesSlice";

const rootReducer = {
  layout,
  auth: authReducer,
  meetings: meetingsReducer,
  users: userReducer,
  clients: clientReducer,
  dashboard: dashboardReducer,
  invoices: invoicesReducer,
};
export default rootReducer;
