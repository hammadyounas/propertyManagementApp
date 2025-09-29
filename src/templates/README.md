# Template Management System

A comprehensive template management system for property management applications with rich text editing, placeholder functionality, and template organization.

## Features

### ✅ Template Editor
- **Rich Text Editor**: Full-featured WYSIWYG editor with formatting options
- **Placeholder System**: Insert dynamic content placeholders for property management
- **Live Preview**: Real-time preview with placeholder replacements
- **Category Management**: Organize templates by type (Email, Contract, Listing, Marketing)
- **Save & Load**: Persistent storage with localStorage

### ✅ Template List View
- **Search & Filter**: Find templates by title, content, or category
- **Sort Options**: Sort by date, title, or category
- **Grid Layout**: Responsive card-based layout
- **Template Actions**: Edit, duplicate, and delete templates
- **Empty State**: Helpful guidance when no templates exist

### ✅ Placeholder System
Predefined placeholders for property management:
- `{{client_name}}` - Client Name
- `{{property_address}}` - Property Address
- `{{property_type}}` - Property Type
- `{{property_price}}` - Property Price
- `{{agent_name}}` - Agent Name
- `{{agent_phone}}` - Agent Phone
- `{{agent_email}}` - Agent Email
- `{{company_name}}` - Company Name
- `{{listing_date}}` - Listing Date
- `{{closing_date}}` - Closing Date
- `{{commission_rate}}` - Commission Rate
- `{{property_features}}` - Property Features
- `{{viewing_schedule}}` - Viewing Schedule
- `{{mortgage_info}}` - Mortgage Information
- `{{legal_notes}}` - Legal Notes

## File Structure

```
src/templates/
├── CreateTemplate/
│   ├── ui/
│   │   └── TextEditorUI.js          # Main editor interface
│   ├── functional/
│   │   └── useTextEditor.js         # Editor logic and state
│   └── combined/
│       └── pages/
│           └── CreateTextEditorPage.jsx
├── TemplateList/
│   ├── ui/
│   │   └── TemplateListUI.js        # Template list interface
│   ├── functional/
│   │   ├── useTemplateList.js       # List logic and state
│   │   └── sampleTemplates.js       # Sample data
│   └── combined/
│       └── pages/
│           └── TemplateListPage.jsx
└── README.md
```

## Usage

### Creating a New Template
1. Navigate to `/templates/create`
2. Enter template title and select category
3. Use the placeholder buttons to insert dynamic content
4. Write your template content with rich text formatting
5. Preview the result in the live preview panel
6. Save the template

### Managing Templates
1. Navigate to `/templates` to view all templates
2. Use search and filter options to find specific templates
3. Click "Edit" to modify existing templates
4. Click "Duplicate" to create copies
5. Click "Delete" to remove templates

### Using Placeholders
1. Click "Show Placeholders" in the editor
2. Select from the list of available placeholders
3. Placeholders are automatically inserted at cursor position
4. Preview shows sample data for each placeholder

## API Integration

The system is designed to work with localStorage for frontend-only functionality. For production use, integrate with your backend API:

```javascript
// Example API integration
const saveTemplate = async (templateData) => {
  const response = await fetch('/api/templates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(templateData)
  });
  return response.json();
};
```

## Customization

### Adding New Placeholders
Edit `src/templates/CreateTemplate/ui/TextEditorUI.js`:

```javascript
const placeholders = [
  // Add your custom placeholders
  { key: '{{custom_field}}', label: 'Custom Field', description: 'Your custom description' },
  // ... existing placeholders
];
```

### Adding New Categories
Edit the category select in `TextEditorUI.js`:

```javascript
<option value="custom">Custom Category</option>
```

### Styling
The system uses Tailwind CSS classes. Customize the appearance by modifying the className props in the UI components.

## Sample Data

The system includes sample templates for demonstration:
- Property Listing Email
- Contract Template  
- Marketing Flyer Template

These are automatically loaded when no templates exist.

## Future Enhancements

- [ ] Template versioning
- [ ] Template sharing
- [ ] Advanced placeholder validation
- [ ] Template import/export
- [ ] Collaborative editing
- [ ] Template analytics
