export const formatPercentage = (value) => {
    const num = Number(value);
    if (isNaN(num)) return '0%';
    
    // Special case for 0
    if (num === 0) return '0%';
    
    // Check if number has meaningful decimal places
    const hasDecimals = num % 1 !== 0;
    
    if (hasDecimals) {
      return `${num.toFixed(2)}%`;
    } else {
      return `${num}%`;
    }
  };

  export const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(Number(value) || 0);
  };

  export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    }).toUpperCase();
  };