export const normalizeId = (value) => {
  if (value == null || value === "") return "";
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "object") {
    if (value.$oid) return String(value.$oid);
    if (value._id && value._id !== value) return normalizeId(value._id);
    if (typeof value.toHexString === "function") return value.toHexString();
    if (typeof value.toString === "function") {
      const asString = value.toString();
      if (asString && asString !== "[object Object]") return asString;
    }
  }
  return "";
};

export const getCurrentUserId = (user) =>
  normalizeId(user?._id) ||
  normalizeId(user?.id) ||
  normalizeId(user?.value) ||
  "";

export const isCurrentUser = (person, currentUser) => {
  const currentId = getCurrentUserId(currentUser);
  if (!currentId) return false;
  return getCurrentUserId(person) === currentId;
};

export const includeCurrentUser = (users, currentUser) => {
  const list = Array.isArray(users) ? [...users] : [];
  const currentId = getCurrentUserId(currentUser);
  if (!currentId && !currentUser?.name) return list;

  const alreadyIncluded = currentId
    ? list.some((person) => isCurrentUser(person, currentUser))
    : list.some(
        (person) =>
          String(person?.name || "").trim().toLowerCase() ===
          String(currentUser?.name || "").trim().toLowerCase()
      );
  if (alreadyIncluded) return list;

  return [currentUser, ...list];
};
