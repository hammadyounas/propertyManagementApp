import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (invoiceData) => {
    const doc = new jsPDF();

     // Draw Half Circle Background (Orange)
  doc.setFillColor(255, 165, 0); // Orange color
  doc.circle(200, 5, 40, "F"); // (centerX, centerY, radius, fill)

  // Add "GET IN TOUCH" text inside the half-circle
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255); // White text for contrast
  doc.text("GET IN TOUCH", 150, 12); // Adjust text placement

  // Contact Info inside the half-circle
  doc.setFontSize(10);
  doc.text(`Phone: ${invoiceData?.seller?.contact_number}`, 150, 18);
  doc.text(`Email: ${invoiceData?.seller?.email}`, 150, 24);
  doc.text(`Website: ${invoiceData?.seller?.website}`, 150, 30);

  // Add Company Logo on the Top Left
  const logoUrl = "/assets/images/logo/BLACK-LOGO.png"; // Replace with your actual logo URL or base64
  doc.addImage(logoUrl, "PNG", 14, 10, 50, 15); // (x, y, width, height)

    // doc.setFontSize(22);
    // doc.text("Invoice", 80, 20);

    // Invoice Details Box (Left Aligned with Light Gray Background)
    doc.setFillColor(230, 230, 230); // Light gray background
    doc.rect(14, 30, 190, 30, "F"); // Rectangle box for invoice details

    // doc.setFontSize(10);
    // doc.setTextColor(0, 0, 0); // Black text
    // doc.text(`Invoice Number: ${invoiceData?.invoiceNumber}`, 18, 38);
    // doc.text(`Invoice Date: ${invoiceData?.invoiceDate}`, 18, 44);
    // doc.text(`Due Date: ${invoiceData?.dueDate}`, 18, 50);
    // doc.text(`Status: ${invoiceData?.status}`, 18, 56);

    // Bill from & Bill to section
    doc.setFontSize(12);
    doc.text("Bill From:", 14, 70);
    doc.text(`Name: ${invoiceData?.seller?.name}`, 14, 78);
    doc.text(`Address: ${invoiceData?.seller?.address}`, 14, 86);
    doc.text(`Email: ${invoiceData?.seller?.email}`, 14, 94);
    doc.text(`Phone Number: ${invoiceData?.seller?.contact_number}`, 14, 102);

    doc.text("Bill To:", 120, 70);
    doc.text(`Name: ${invoiceData?.buyer?.name}`, 120, 78);
    doc.text(`Address: ${invoiceData?.buyer?.address}`, 120, 86);
    doc.text(`Email: ${invoiceData?.buyer?.email}`, 120, 94);
    doc.text(`Phone Number: ${invoiceData?.buyer?.phoneNumber}`, 120, 102);

    // Property Details
    doc.text("Property Details:", 14, 118);
    doc.text(`Title: ${invoiceData?.property?.title}`, 14, 126);
    doc.text(`Type: ${invoiceData?.property?.property_type}`, 14, 134);
    doc.text(`Description: ${invoiceData?.property?.description}`, 14, 142);
    doc.text(`Address: ${invoiceData?.property?.address}`, 14, 150);

    // Table for Items
    doc.autoTable({
      startY: 160,
      head: [
        ["Item", "Description", "Price", "GST (5%)", "QST (9.75%)", "Total"],
      ],
      body: invoiceData?.items?.map((item) => [
        item?.itemName,
        item?.description,
        `$${item?.price?.toFixed(2)}`,
        `$${item?.gst?.toFixed(2)}`,
        `$${item?.qst?.toFixed(2)}`,
        `$${item?.total?.toFixed(2)}`,
      ]),
      styles: { fontSize: 10, cellPadding: 3 },
    });

    let finalY = doc.autoTable.previous.finalY;

    // Summary Table
    doc.autoTable({
      startY: finalY + 10,
      head: [["Summary", "Amount"]],
      body: [
        [
          "Total Commission Payable",
          `$${invoiceData?.totalCommissionPayable?.toFixed(2) || 0}`,
        ],
        [
          "Commission Amount",
          `$${invoiceData?.commissionAmount?.toFixed(2) || 0}`,
        ],
        ["Plus GST (5%)", `$${invoiceData?.totalGst?.toFixed(2) || 0}`],
        ["Plus QST (9.75%)", `$${invoiceData?.totalQst?.toFixed(2) || 0}`],
        ["Total", `$${invoiceData?.totalCommissionPayable?.toFixed(2) || 0}`],
      ],
      styles: { fontSize: 10, cellPadding: 3 },
    });

    finalY = doc.autoTable.previous.finalY;

    doc.save(`${invoiceData?.invoiceNumber}_invoice.pdf`);
  };