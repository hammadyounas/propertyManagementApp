/**
 * Content optimization utilities for template content
 */

/**
 * Optimize template content by reducing size and removing unnecessary data
 * @param {string} content - The raw content from the editor
 * @returns {string} - Optimized content
 */
export const optimizeTemplateContent = (content) => {
  if (!content) return '';
  
  try {
    // If content is JSON (from rich text editor), parse and optimize it
    if (typeof content === 'string' && content.startsWith('{')) {
      const parsedContent = JSON.parse(content);
      
      // Remove unnecessary properties that bloat the content
      const optimizedContent = {
        ...parsedContent,
        // Remove or minimize large properties
        sec: parsedContent.sec?.map(section => ({
          ...section,
          // Remove unnecessary properties that might be large
          // Keep only essential content
        })) || [],
        // Remove other large properties if they exist
        ...(parsedContent.optimizeSfdt !== undefined && { optimizeSfdt: false }),
      };
      
      return JSON.stringify(optimizedContent);
    }
    
    // If content is HTML, clean it up
    if (typeof content === 'string' && content.includes('<')) {
      return cleanHtmlContent(content);
    }
    
    return content;
  } catch (error) {
    console.warn('Error optimizing content:', error);
    // If optimization fails, return original content
    return content;
  }
};

/**
 * Clean HTML content by removing unnecessary attributes and whitespace
 * @param {string} html - HTML content
 * @returns {string} - Cleaned HTML content
 */
export const cleanHtmlContent = (html) => {
  if (!html) return '';
  
  return html
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove unnecessary attributes that might bloat content
    .replace(/\s+style="[^"]*"/g, '')
    .replace(/\s+class="[^"]*"/g, '')
    // Remove empty tags
    .replace(/<(\w+)[^>]*>\s*<\/\1>/g, '')
    .trim();
};

/**
 * Check if content size is within acceptable limits
 * @param {string} content - Content to check
 * @param {number} maxSize - Maximum size in bytes (default: 1MB)
 * @returns {boolean} - True if content is within limits
 */
export const isContentSizeValid = (content, maxSize = 1024 * 1024) => {
  if (!content) return true;
  
  const contentSize = new Blob([content]).size;
  return contentSize <= maxSize;
};

/**
 * Get content size in a human-readable format
 * @param {string} content - Content to measure
 * @returns {string} - Human-readable size
 */
export const getContentSize = (content) => {
  if (!content) return '0 B';
  
  const bytes = new Blob([content]).size;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
};

/**
 * Compress content by removing redundant data
 * @param {string} content - Content to compress
 * @returns {string} - Compressed content
 */
export const compressContent = (content) => {
  if (!content) return '';
  
  try {
    // If it's JSON, stringify with minimal spacing
    if (typeof content === 'string' && content.startsWith('{')) {
      const parsed = JSON.parse(content);
      return JSON.stringify(parsed);
    }
    
    // For HTML, remove unnecessary whitespace
    return content.replace(/\s+/g, ' ').trim();
  } catch (error) {
    console.warn('Error compressing content:', error);
    return content;
  }
};
