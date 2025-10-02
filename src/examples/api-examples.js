// Example API functions for template management

// 1. Save template to database
export const saveTemplate = async (templateData) => {
  try {
    const response = await fetch('/api/templates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // If using auth
      },
      body: JSON.stringify({
        name: templateData.name,
        content: templateData.content,
        placeholders: templateData.placeholders,
        category: templateData.category || 'general',
        createdAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save template');
    }

    const savedTemplate = await response.json();
    return savedTemplate;
  } catch (error) {
    console.error('Error saving template:', error);
    throw error;
  }
};

// 2. Get all templates
export const getTemplates = async () => {
  try {
    const response = await fetch('/api/templates', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch templates');
    }

    const templates = await response.json();
    return templates;
  } catch (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
};

// 3. Get template by ID
export const getTemplate = async (templateId) => {
  try {
    const response = await fetch(`/api/templates/${templateId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch template');
    }

    const template = await response.json();
    return template;
  } catch (error) {
    console.error('Error fetching template:', error);
    throw error;
  }
};

// 4. Generate document from template
export const generateDocument = async (templateId, placeholderValues, options = {}) => {
  try {
    const response = await fetch('/api/documents/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        templateId,
        placeholderValues,
        format: options.format || 'html', // 'html', 'pdf', 'docx'
        fileName: options.fileName,
        metadata: options.metadata
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate document');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error generating document:', error);
    throw error;
  }
};

// 5. Save generated document
export const saveGeneratedDocument = async (documentData) => {
  try {
    const response = await fetch('/api/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        templateId: documentData.templateId,
        content: documentData.content,
        placeholderValues: documentData.placeholderValues,
        generatedAt: documentData.generatedAt,
        status: 'generated',
        metadata: documentData.metadata
      })
    });

    if (!response.ok) {
      throw new Error('Failed to save document');
    }

    const savedDocument = await response.json();
    return savedDocument;
  } catch (error) {
    console.error('Error saving document:', error);
    throw error;
  }
};

// Example usage in a React component:
/*

import { useState, useEffect } from 'react';
import { saveTemplate, getTemplates, generateDocument } from './api-examples';
import TemplateEditor from '../components/ui/organisms/TemplateEditor';
import TemplateRenderer from '../components/ui/organisms/TemplateRenderer';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editorValue, setEditorValue] = useState('');
  const [templateData, setTemplateData] = useState(null);

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const fetchedTemplates = await getTemplates();
      setTemplates(fetchedTemplates);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const handleSaveTemplate = async (templateName) => {
    if (!templateData) return;

    try {
      const savedTemplate = await saveTemplate({
        name: templateName,
        ...templateData
      });
      
      setTemplates(prev => [...prev, savedTemplate]);
      alert('Template saved successfully!');
    } catch (error) {
      alert('Failed to save template');
    }
  };

  const handleGenerateDocument = async (generatedData) => {
    try {
      const result = await generateDocument(
        selectedTemplate.id,
        generatedData.placeholderValues,
        {
          format: 'pdf',
          fileName: `${selectedTemplate.name}_${Date.now()}.pdf`
        }
      );
      
      console.log('Document generated:', result);
      // Handle the generated document (download, display, etc.)
    } catch (error) {
      console.error('Failed to generate document:', error);
    }
  };

  return (
    <div>
      // Your template management UI here
    </div>
  );
};

*/

// Database schema examples (for reference):

/*

-- Templates table
CREATE TABLE templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  placeholders JSONB NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Generated documents table
CREATE TABLE generated_documents (
  id SERIAL PRIMARY KEY,
  template_id INTEGER REFERENCES templates(id),
  content TEXT NOT NULL,
  placeholder_values JSONB NOT NULL,
  file_path VARCHAR(500), -- if you save actual files
  status VARCHAR(50) DEFAULT 'generated',
  metadata JSONB,
  created_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_templates_created_by ON templates(created_by);
CREATE INDEX idx_templates_category ON templates(category);
CREATE INDEX idx_documents_template_id ON generated_documents(template_id);
CREATE INDEX idx_documents_created_by ON generated_documents(created_by);

*/
