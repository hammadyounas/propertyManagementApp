import csv

# Read the original CSV file
with open('comprehensive-sample-property-data.csv', 'r', encoding='utf-8') as file:
    data = list(csv.reader(file))

header = data[0]
header_length = len(header)

print(f"Header has {header_length} fields")

# Fix each row by padding with empty values
fixed_data = [header]  # Keep the header as is

for i, row in enumerate(data[1:], 1):
    current_length = len(row)
    missing_fields = header_length - current_length
    
    if missing_fields > 0:
        print(f"Row {i}: Adding {missing_fields} empty fields")
        # Pad the row with empty values
        padded_row = row + [''] * missing_fields
        fixed_data.append(padded_row)
    else:
        fixed_data.append(row)

# Write the fixed CSV file
with open('comprehensive-sample-property-data-fixed.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerows(fixed_data)

print("Fixed CSV file created: comprehensive-sample-property-data-fixed.csv")

# Verify the fix
with open('comprehensive-sample-property-data-fixed.csv', 'r', encoding='utf-8') as file:
    fixed_data = list(csv.reader(file))
    
print(f"Fixed file header: {len(fixed_data[0])} fields")
for i, row in enumerate(fixed_data[1:], 1):
    print(f"Fixed row {i}: {len(row)} fields")
