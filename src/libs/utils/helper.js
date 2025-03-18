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