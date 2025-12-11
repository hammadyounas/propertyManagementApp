import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const templatesDir = path.join(process.cwd(), 'public', 'templates');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(templatesDir)) {
      fs.mkdirSync(templatesDir, { recursive: true });
      return res.status(200).json({ templates: [] });
    }

    // Read all files from the templates directory
    const files = fs.readdirSync(templatesDir);
    
    // Filter only HTML files and get their stats
    const templates = files
      .filter(file => file.endsWith('.html'))
      .map(file => {
        const filePath = path.join(templatesDir, file);
        const stats = fs.statSync(filePath);
        
        return {
          fileName: file,
          name: file.replace('.html', ''),
          path: `/templates/${file}`,
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime,
          size: stats.size
        };
      })
      .sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt)); // Sort by modified date, newest first

    return res.status(200).json({ templates });
  } catch (error) {
    console.error('Error listing templates:', error);
    return res.status(500).json({ error: 'Failed to list templates', details: error.message });
  }
}

