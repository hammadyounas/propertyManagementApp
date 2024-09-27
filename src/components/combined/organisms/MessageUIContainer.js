import useMessage from "../../functional/organisms/useMessage";
import MessageUI from "../../ui/organisms/MessageUI";

const MessageUIContainer = () => {
  const { messagelabel, newMessage } = useMessage();
  return <MessageUI messagelabel={messagelabel} newMessage={newMessage}/>;
};

export default MessageUIContainer;
