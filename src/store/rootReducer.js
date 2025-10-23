import layout from "./layoutReducer";
// import auth from "@/components/partials/auth/store";
import authReducer from "./authSlice";
import meetingsReducer from "./features/meetings/meetingSlice"
import userReducer from "./features/users/userSlice";
import clientReducer from "./features/clients/clientSlice";
import dashboardReducer from "./features/dashboard/dashboardSlice";
import propertiesReducer from "./features/properties/propertiesSlice";
import invoicesReducer from "./features/invoices/invoicesSlice";
import acmReducer from "./features/acm/acmSlice";
import templatesReducer from "./features/templates/templateSlice"
import documentsReducer from "./features/documents/documentSlice"

const rootReducer = {
  layout,
  auth: authReducer,
  meetings: meetingsReducer,
  users: userReducer,
  clients: clientReducer,
  dashboard: dashboardReducer,
  properties: propertiesReducer,
  invoices: invoicesReducer,
  acm: acmReducer,
  templates: templatesReducer,
  documents: documentsReducer,
};
export default rootReducer;
