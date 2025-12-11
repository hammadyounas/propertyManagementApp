import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName } = req.query;

    if (!fileName) {
      return res.status(400).json({ error: 'fileName is required' });
    }

    // Decode the fileName if it's URL encoded
    const decodedFileName = decodeURIComponent(fileName);
    
    // Only sanitize truly dangerous characters (directory traversal, null bytes, etc.)
    // Preserve spaces, parentheses, and other valid filename characters
    let sanitizedFileName = decodedFileName
      .replace(/\.\./g, '') // Remove directory traversal attempts
      .replace(/[<>:"|?*\x00-\x1f]/g, '_') // Remove dangerous characters
      .replace(/^\/+|\/+$/g, ''); // Remove leading/trailing slashes
    
    // Ensure it's an HTML file
    const finalFileName = sanitizedFileName.endsWith('.html') 
      ? sanitizedFileName 
      : `${sanitizedFileName}.html`;
    
    // Path to public/templates folder
    const templatesDir = path.join(process.cwd(), 'public', 'templates');
    const filePath = path.join(templatesDir, finalFileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      // Try with original decoded fileName (in case sanitization changed it)
      const originalPath = path.join(templatesDir, decodedFileName.endsWith('.html') ? decodedFileName : `${decodedFileName}.html`);
      if (fs.existsSync(originalPath)) {
        fs.unlinkSync(originalPath);
        return res.status(200).json({ 
          success: true, 
          message: 'Template deleted successfully'
        });
      }
      return res.status(404).json({ error: 'Template not found', fileName: finalFileName });
    }

    // Delete the file
    fs.unlinkSync(filePath);

    return res.status(200).json({ 
      success: true, 
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting template:', error);
    return res.status(500).json({ error: 'Failed to delete template', details: error.message });
  }
}

