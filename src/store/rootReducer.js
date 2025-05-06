import layout from "./layoutReducer";
// import auth from "@/components/partials/auth/store";
import authReducer from "./authSlice";
import meetingsReducer from "./features/meetings/meetingSlice"
import userReducer from "./features/users/userSlice";
import clientReducer from "./features/clients/clientSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import propertiesReducer from "./features/properties/propertiesSlice";

const rootReducer = {
  layout,
  auth: authReducer,
  meetings: meetingsReducer,
  users: userReducer,
  clients: clientReducer,
  dashboard: dashboardReducer,
  properties: propertiesReducer,
};
export default rootReducer;
