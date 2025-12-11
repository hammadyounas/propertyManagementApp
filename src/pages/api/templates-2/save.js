import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName, htmlContent } = req.body;

    if (!fileName || !htmlContent) {
      return res.status(400).json({ error: 'fileName and htmlContent are required' });
    }

    // Ensure the file name ends with .html
    let finalFileName = fileName.endsWith('.html') ? fileName : `${fileName}.html`;
    
    // Remove unwanted prefixes like "2._" from the beginning
    finalFileName = finalFileName.replace(/^(\d+\._)+/i, '');
    
    // Sanitize file name to prevent directory traversal
    const sanitizedFileName = finalFileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    // Path to public/templates folder
    const templatesDir = path.join(process.cwd(), 'public', 'templates');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
    }

    // Full path to the file
    const filePath = path.join(templatesDir, sanitizedFileName);

    // Write the HTML file
    fs.writeFileSync(filePath, htmlContent, 'utf8');

    return res.status(200).json({ 
      success: true, 
      message: 'Template saved successfully',
      fileName: sanitizedFileName,
      path: `/templates/${sanitizedFileName}`
    });
  } catch (error) {
    console.error('Error saving template:', error);
    return res.status(500).json({ error: 'Failed to save template', details: error.message });
  }
}

