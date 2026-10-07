export const getCurrentUserId = (user) =>
  user?._id?.toString() || user?.id?.toString() || user?.value?.toString() || "";

export const isCurrentUser = (person, currentUser) => {
  const currentId = getCurrentUserId(currentUser);
  if (!currentId) return false;
  return (
    (person?._id || person?.value || person?.id)?.toString() === currentId
  );
};

export const includeCurrentUser = (users, currentUser) => {
  const list = Array.isArray(users) ? [...users] : [];
  const currentId = getCurrentUserId(currentUser);
  if (!currentId) return list;

  const alreadyIncluded = list.some((person) =>
    isCurrentUser(person, currentUser)
  );
  if (alreadyIncluded) return list;

  return [currentUser, ...list];
};
