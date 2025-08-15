const useFile = () => {
  const getFileType = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif"].includes(extension)) {
      return "image";
    } else if (extension === "pdf") {
      return "pdf";
    } else if (["doc", "docx"].includes(extension)) {
      return "doc";
    }
    return "unknown";
  };

  const renderPreview = (file) => {
    const fileType = getFileType(file);

    switch (fileType) {
      case "image":
        return (
          <img
            src={file instanceof File || file instanceof Blob ? URL.createObjectURL(file) : file}
            className="w-full h-full block rounded object-contain  p-2 border-slate-200"
            alt={file.name}
          />
        );
      case "pdf":
        return (
          //   <embed
          //     src={URL.createObjectURL(file)}
          //     type="application/pdf"
          //     className="w-full h-full block rounded border p-2 border-slate-200"
          //     alt={file.name}
          //   />
          <div className="flex items-center p-2 border-slate-200 rounded">
            <span className="text-slate-600 dark:text-slate-400">
              {file.name.length > 10
                ? `${file.name.slice(0, 5)}...${file.name.slice(-5)}`
                : file.name}
            </span>
          </div>
        );
      case "doc":
        return (
          <div className="flex items-center p-2 border-slate-200 rounded">
            <span className="text-slate-600 dark:text-slate-400">
              {file.name.length > 10
                ? `${file.name.slice(0, 5)}...${file.name.slice(-5)}`
                : file.name}
            </span>
          </div>
        );
      default:
        return (
          <div className="flex items-center p-2 border border-slate-200 rounded">
            <span className="text-slate-600 dark:text-slate-400">
              Unsupported file type: {file.name}
            </span>
          </div>
        );
    }
  };

  return {
    renderPreview,
  };
};

export default useFile;
