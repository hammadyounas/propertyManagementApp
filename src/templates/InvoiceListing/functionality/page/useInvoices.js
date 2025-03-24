import { useEffect, useMemo, useState } from "react";
import { rows } from "../constants/data";
import { useRouter } from "next/navigation";
import { getRequest } from "../../../../libs/utils/request_handler";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const useInvoices = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const [loading, setLoading] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const response = await getRequest("invoices");
      const filteredInvoices = response?.data?.filter(
        (invoice) => !invoice.isDeleted
      );
      setInvoices(filteredInvoices);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
    // setInvoices(rows);
  }, []);

  // Calculate the paginated users
  const paginatedInvoices = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return invoices.slice(startIndex, startIndex + pageSize);
  }, [invoices, currentPage, pageSize]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

  const downloadPDF = async () => {
    const element = document.getElementById("invoice");
    
    if (!element) {
      console.error("Invoice element not found!");
      return;
    }
  
    try {
      // Wait for Next.js to render the invoice properly
      await new Promise((resolve) => setTimeout(resolve, 500)); 
  
      // Capture the invoice as an image
      const canvas = await html2canvas(element, {
        scale: 3, // Higher resolution
        useCORS: true, // Allow cross-origin elements
        allowTaint: false, // Prevent security issues
        logging: true, // Enable debugging
      });
  
      const imgData = canvas.toDataURL("image/png");
  
      // Debug: Ensure image data is valid
      if (!imgData || imgData.length < 50) {
        console.error("Captured image is empty or corrupt.");
        return;
      }
  
      console.log("Image data:", imgData.substring(0, 100)); // Log first 100 chars
  
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${selectedInvoice?.invoiceNumber || "invoice"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  

  return {
    globalFilter,
    setGlobalFilter,
    invoices,
    setInvoices,
    paginatedInvoices, // Return paginated users
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    selectedInvoice,
    setSelectedInvoice,
    downloadPDF,
  };
};

export default useInvoices;
