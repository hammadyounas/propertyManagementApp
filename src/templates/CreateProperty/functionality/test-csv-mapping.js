// Test script to validate CSV header mapping
import { csvHeaderMap } from './constants/data.js';
import { formSections } from './constants/form_data.js';

console.log('🧪 Testing CSV Header Mapping...\n');

// Get all required fields from form sections
const requiredFields = [];
formSections.forEach(section => {
  section.fields.forEach(field => {
    if (field.required && field.type !== 'file') {
      requiredFields.push(field.name);
    }
  });
});

console.log('📋 Required fields from form:', requiredFields);
console.log('📊 CSV header mappings:', Object.keys(csvHeaderMap));
console.log('🔗 Field name mappings:', Object.values(csvHeaderMap));

// Check if all required fields have CSV mappings
const missingMappings = [];
requiredFields.forEach(fieldName => {
  const hasMapping = Object.values(csvHeaderMap).includes(fieldName);
  if (!hasMapping) {
    missingMappings.push(fieldName);
  }
});

if (missingMappings.length > 0) {
  console.error('❌ Missing CSV mappings for required fields:', missingMappings);
} else {
  console.log('✅ All required fields have CSV mappings');
}

// Check for duplicate field names in mappings
const fieldNames = Object.values(csvHeaderMap);
const duplicates = fieldNames.filter((item, index) => fieldNames.indexOf(item) !== index);
if (duplicates.length > 0) {
  console.error('❌ Duplicate field names in CSV mappings:', [...new Set(duplicates)]);
} else {
  console.log('✅ No duplicate field names in CSV mappings');
}

// Check for orphaned CSV headers (headers that don't map to any form field)
const allFormFields = [];
formSections.forEach(section => {
  section.fields.forEach(field => {
    allFormFields.push(field.name);
  });
});

const orphanedHeaders = [];
Object.values(csvHeaderMap).forEach(fieldName => {
  if (!allFormFields.includes(fieldName)) {
    orphanedHeaders.push(fieldName);
  }
});

if (orphanedHeaders.length > 0) {
  console.warn('⚠️  Orphaned CSV headers (no corresponding form field):', orphanedHeaders);
} else {
  console.log('✅ No orphaned CSV headers');
}

console.log('\n📊 Summary:');
console.log(`- Total required fields: ${requiredFields.length}`);
console.log(`- Total CSV headers: ${Object.keys(csvHeaderMap).length}`);
console.log(`- Missing mappings: ${missingMappings.length}`);
console.log(`- Duplicate field names: ${duplicates.length}`);
console.log(`- Orphaned headers: ${orphanedHeaders.length}`);
