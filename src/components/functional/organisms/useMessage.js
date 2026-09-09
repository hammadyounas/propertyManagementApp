import Icon from "@/components/ui/atoms/Icon";

const message = [];

const useMessage = () => {
  const messagelabel = () => {
    return (
      <span className="relative lg:h-[32px] lg:w-[32px] lg:bg-slate-100 lg:dark:bg-slate-900 dark:text-white text-slate-900 cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
        <Icon icon="heroicons-outline:mail" />
        {message.length > 0 && (
          <span className="absolute lg:right-0 lg:top-0 -top-2 -right-2 h-4 w-4 bg-red-500 text-[8px] font-semibold flex flex-col items-center justify-center rounded-full text-white z-[99]">
            {message.length}
          </span>
        )}
      </span>
    );
  };
  const newMessage = message.slice(0, 4);

  return {
    messagelabel,
    newMessage,
  };
};

export default useMessage;
