export const clsx = (
    ...className: ReadonlyArray<string | boolean | undefined>
  ) => {
    return className.filter(Boolean).join(" ");
  };
  