import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileName } = req.query;

    if (!fileName) {
      return res.status(400).json({ error: 'fileName is required' });
    }

    // Sanitize file name to prevent directory traversal
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    // Ensure it's an HTML file
    const finalFileName = sanitizedFileName.endsWith('.html') 
      ? sanitizedFileName 
      : `${sanitizedFileName}.html`;
    
    // Path to public/templates folder
    const templatesDir = path.join(process.cwd(), 'public', 'templates');
    const filePath = path.join(templatesDir, finalFileName);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Read the file content
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract body content from HTML (remove DOCTYPE, html, head tags)
    const bodyMatch = fileContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    let content = bodyMatch ? bodyMatch[1] : fileContent;

    // Remove legacy auto-page-break divs jo imported templates mein aa rahe hain
    // Ye sirf blank pages aur extra white space banate hain PDF mein
    content = content.replace(
      /<div[^>]*class=["']auto-page-break["'][^>]*>[\s\S]*?<\/div>/gi,
      ''
    );

    return res.status(200).json({ content });
  } catch (error) {
    console.error('Error reading template:', error);
    return res.status(500).json({ error: 'Failed to read template', details: error.message });
  }
}

