export const clsx = (...className) => {
  return className.filter(Boolean).join(" ");
};

export const dateFormat = (dateString) => {
  if(!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month:"2-digit",
    day:"2-digit",
    year:"numeric",
  });
};

export const getStatusClasses = (status) => {
  switch (status) {
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "pending":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};
