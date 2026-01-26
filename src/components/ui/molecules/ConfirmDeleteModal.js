import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onDelete,
  text,
  disabled,
  confirmText = "Delete",
  cancelText = "Cancel",
  title = "Confirm Deletion",
  iconColor = "text-red-600",
  buttonColor = "bg-red-600 hover:bg-red-700",
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center space-x-3">
          <ExclamationTriangleIcon className={`h-8 w-8 ${iconColor}`} />
          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>
        </div>
        <p className="text-gray-600 mt-2">
          {text || "Are you sure you want to delete this item?"}
        </p>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            disabled={disabled}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            disabled={disabled}
            className={`px-4 py-2 ${buttonColor} text-white rounded-md transition`}
            onClick={onDelete}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
