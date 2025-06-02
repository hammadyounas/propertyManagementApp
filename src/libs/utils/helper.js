export const clsx = (...className) => {
  return className.filter(Boolean).join(" ");
};

export const dateFormat = (dateString) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const calculateTotal = (key, db) => {
    return db.reduce((total, row) => total + (Number(row[key]) || 0), 0);
  };
  // Calculate average sale price
export const calculateAverage = (key, db) => {
    if (!db || db.length === 0) return 0;
    const total = calculateTotal(key, db);
    return total / db.length;
  };

export const getStatusClasses = (status) => {
  switch (status) {
    case "approved":
      return "text-green-600";
    case "rejected":
      return "text-red-600";
    case "pending":
      return "text-yellow-600";
    case "scheduled":
      return "text-purple-600"; // Blue #6F42C1
    case "completed":
      return "text-green-700"; // Green
    case "cancelled":
      return "text-red-600"; // Red
    case "rescheduled":
      return "text-orange-600"; // Purple #FFC107
    default:
      return "text-gray-600";
  }
};
