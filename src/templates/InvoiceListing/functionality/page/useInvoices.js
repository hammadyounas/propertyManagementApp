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
  const [loading, setLoading] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const response = await getRequest("invoices");
      const filteredInvoices = response?.data?.filter(
        (invoice) => !invoice.isDeleted
      );
      setInvoices(filteredInvoices);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  const downloadPDF = async (language, invoice) => {
    if (!invoice) {
      console.error("No invoice selected!");
      return;
    }

    setSelectedInvoice(invoice); // Ensure the correct invoice is set
    setSelectedLanguage(language); // Set the selected language

    await new Promise((resolve) => setTimeout(resolve, 500)); // Allow state update

    const element = document.getElementById("invoice");

    if (!element) {
      console.error("Invoice element not found!");
      return;
    }

    try {
      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${invoice.invoiceNumber || "INVOICE"}_${language}.pdf`);
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
    selectedLanguage,
  };
};

export default useInvoices;
