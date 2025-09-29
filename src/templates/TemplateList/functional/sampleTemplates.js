// Sample templates for demonstration
export const sampleTemplates = [
  {
    id: 'sample-1',
    title: 'Property Listing Email',
    content: `
      <h2>New Property Listing: {{property_address}}</h2>
      <p>Dear {{client_name}},</p>
      <p>I'm excited to share with you a new property that just came on the market:</p>
      <ul>
        <li><strong>Address:</strong> {{property_address}}</li>
        <li><strong>Type:</strong> {{property_type}}</li>
        <li><strong>Price:</strong> {{property_price}}</li>
        <li><strong>Features:</strong> {{property_features}}</li>
      </ul>
      <p>This property offers excellent value and is located in a desirable neighborhood. I'd love to schedule a viewing for you.</p>
      <p>Please let me know your availability for {{viewing_schedule}}.</p>
      <p>Best regards,<br>{{agent_name}}<br>{{agent_phone}}<br>{{agent_email}}</p>
    `,
    category: 'email',
    createdAt: '2024-01-15T10:30:00Z',
    date: '2024-01-15T10:30:00Z',
  },
  {
    id: 'sample-2',
    title: 'Contract Template',
    content: `
      <h1>Property Purchase Agreement</h1>
      <h2>Property Details</h2>
      <p><strong>Property Address:</strong> {{property_address}}</p>
      <p><strong>Property Type:</strong> {{property_type}}</p>
      <p><strong>Purchase Price:</strong> {{property_price}}</p>
      
      <h2>Terms and Conditions</h2>
      <p>This agreement is subject to the following conditions:</p>
      <ul>
        <li>Property inspection within 10 days</li>
        <li>Mortgage approval within 30 days</li>
        <li>Closing date: {{closing_date}}</li>
      </ul>
      
      <h2>Commission</h2>
      <p>Commission rate: {{commission_rate}}</p>
      
      <h2>Legal Notes</h2>
      <p>{{legal_notes}}</p>
      
      <p>Agent: {{agent_name}}<br>Company: {{company_name}}</p>
    `,
    category: 'contract',
    createdAt: '2024-01-10T14:20:00Z',
    date: '2024-01-10T14:20:00Z',
  },
  {
    id: 'sample-3',
    title: 'Marketing Flyer Template',
    content: `
      <div style="text-align: center; padding: 20px;">
        <h1 style="color: #2563eb;">{{property_address}}</h1>
        <h2 style="color: #1f2937;">{{property_type}} - {{property_price}}</h2>
        
        <div style="background: #f3f4f6; padding: 15px; margin: 20px 0; border-radius: 8px;">
          <h3>Property Features:</h3>
          <p>{{property_features}}</p>
        </div>
        
        <div style="background: #dbeafe; padding: 15px; margin: 20px 0; border-radius: 8px;">
          <h3>Viewing Information</h3>
          <p>Available for viewing: {{viewing_schedule}}</p>
          <p>Contact: {{agent_name}} - {{agent_phone}}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; margin: 20px 0; border-radius: 8px;">
          <h3>Mortgage Information</h3>
          <p>{{mortgage_info}}</p>
        </div>
        
        <p style="font-size: 12px; color: #6b7280;">
          {{company_name}} | {{agent_email}}
        </p>
      </div>
    `,
    category: 'marketing',
    createdAt: '2024-01-08T09:15:00Z',
    date: '2024-01-08T09:15:00Z',
  },
];

// Function to initialize sample templates in localStorage
export const initializeSampleTemplates = () => {
  try {
    const existingTemplates = localStorage.getItem('propertyTemplates');
    if (!existingTemplates || JSON.parse(existingTemplates).length === 0) {
      localStorage.setItem('propertyTemplates', JSON.stringify(sampleTemplates));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error initializing sample templates:', error);
    return false;
  }
};
