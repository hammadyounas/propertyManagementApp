import useNotification from "../../functional/organisms/useNotification";
import NotificationUI from "../../ui/organisms/NotificationUI";

const NotificationUIContainer = () => {
  const { notifications, notifyLabel } = useNotification();
  return <NotificationUI notifications={notifications} notifyLabel={notifyLabel}/>;
};

export default NotificationUIContainer;
