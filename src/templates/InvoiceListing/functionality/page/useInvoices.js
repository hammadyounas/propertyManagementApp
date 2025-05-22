import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchInvoices,
  updateInvoice,
} from "../../../../store/features/invoices/invoicesSlice";
import {
  selectInvoices,
  selectInvoicesLoading,
  selectTotalCount,
} from "../../../../store/features/invoices/invoiceSelectors";

const useInvoices = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const { push } = useRouter();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const dispatch = useDispatch();
  const invoices = useSelector(selectInvoices);
  const totalCount = useSelector(selectTotalCount);
  const loading = useSelector(selectInvoicesLoading);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(
      fetchInvoices({
        search: globalFilter,
        page: currentPage,
        limit: pageSize,
        statusFilter,
      })
    );
  }, [dispatch, globalFilter, currentPage, statusFilter]);

  console.log("Invoices from Redux:", invoices);

  useEffect(() => {
    setCurrentPage(1);
  }, [globalFilter, statusFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page + 1); // Increment by 1 for 1-based page indexing
  };

const handleStatusChange = async (invoiceId, status) => {
  try {
    await dispatch(updateInvoice({ invoiceId, status })).unwrap(); // wait for update to complete
    dispatch(fetchInvoices({ search: globalFilter, page: currentPage, limit: pageSize }));
  } catch (error) {
    console.error("Error updating invoice status:", error);
  }
};


  const downloadPDF = async (e, language, invoice) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    console.log("Dropdown item clicked", e);

    const html2pdf = (await import("html2pdf.js")).default;
    if (!invoice) {
      console.error("No invoice selected!");
      return;
    }

    setSelectedInvoice(invoice);
    setSelectedLanguage(language);

    await new Promise((resolve) => setTimeout(resolve, 500)); // Allow time for rendering

    const element = document.getElementById("invoice");
    // OR better (if you have invoiceRef): const element = invoiceRef.current;

    if (!element) {
      console.error("Invoice element not found!");
      return;
    }

    try {
      const opt = {
        margin: 0,
        filename: `${invoice.invoiceNumber || "INVOICE"}_${language}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2, // High quality
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };

      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return {
    globalFilter,
    setGlobalFilter,
    invoices,
    pageSize,
    handlePageChange,
    currentPage,
    push,
    loading,
    selectedInvoice,
    setSelectedInvoice,
    downloadPDF,
    selectedLanguage,
    totalCount,
    handleStatusChange,
    setStatusFilter,
    statusFilter,
  };
};

export default useInvoices;
