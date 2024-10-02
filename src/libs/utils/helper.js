export const clsx = (...className) => {
  return className.filter(Boolean).join(" ");
};
