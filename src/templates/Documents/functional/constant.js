export const categories = [
    { label: 'All Documents', value: 'all documents' },
    { label: 'Email Templates', value: 'email' },
    { label: 'Contract Templates', value: 'contract' },
    { label: 'Listing Templates', value: 'listing' },
    { label: 'Marketing Templates', value: 'marketing' },
  ];

export const columns = [
    { label: 'Document Name' },
    // { label: 'Client Name' },
    { label: 'Content Preview' },
    { label: 'Created Date' },
    { label: 'Actions' },
  ];

  export const getCategoryColor = (category) => {
    const colors = {
      email: 'text-blue-600 bg-blue-200',
      contract: 'text-green-600 bg-green-200',
      listing: 'text-purple-600 bg-purple-200',
      marketing: 'text-orange-600 bg-orange-200',
      document: 'text-red-600 bg-red-200',
      default: 'text-gray-600 bg-gray-200',
    };
    return colors[category] || colors.default;
  };

export const truncateContent = (content, maxLength = 100) => {
    if (!content) return '';
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...'
      : textContent;
  };