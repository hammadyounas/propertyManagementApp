export const extractFileNameFromBase64 = (base64String, index) => {
    // Check if the string has a valid Base64 prefix
    const matches = base64String.match(/^data:(image|application)\/(\w+);base64,/);
    if (matches) {
      const fileType = matches[2]; // Extract the file type (e.g., png, jpeg)
      return `file_${index + 1}.${fileType}`; // Generate a mock file name
    }
    return `file_${index + 1}.unknown`; // Default name if type is not identified
  };
  