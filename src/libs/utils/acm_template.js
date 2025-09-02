import { createRoot } from 'react-dom/client';
import React from 'react';
import ACMReportTemplate from '../../components/ACMReportTemplate';

export const generateACMPDF = async (acmData) => {
  console.log('Starting PDF generation with data:', acmData);
  try {
    // Create a temporary container for the React component
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    
    // Add CSS link for PDF styles
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = '/styles/pdf-styles.css';
    cssLink.onload = () => console.log('PDF styles loaded successfully');
    cssLink.onerror = () => {
      console.warn('PDF styles could not be loaded, using fallback styles');
      // Add fallback styles
      const fallbackStyle = document.createElement('style');
      fallbackStyle.textContent = `
        .page-container { 
          width: 100%; 
          height: 100vh; 
          page-break-after: always; 
          display: flex; 
          flex-direction: column; 
        }
        .page-break-before { page-break-before: always; }
        .page-break-after { page-break-after: always; }
        .no-break { page-break-inside: avoid; }
      `;
      tempContainer.appendChild(fallbackStyle);
    };
    tempContainer.appendChild(cssLink);
    
    document.body.appendChild(tempContainer);

    // Wait for CSS to load
    await new Promise(resolve => {
      if (cssLink.sheet) {
        resolve();
      } else {
        cssLink.onload = resolve;
        cssLink.onerror = resolve; // Continue even if CSS fails to load
      }
    });

    // Render the React component
    const root = createRoot(tempContainer);
    root.render(React.createElement(ACMReportTemplate, { acmData }));

    // Wait for the component to render
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Get the rendered HTML element
    const element = tempContainer.querySelector('#acm-report');
    
    if (!element) {
      console.error('ACM report element not found in tempContainer:', tempContainer.innerHTML);
      throw new Error('ACM report element not found');
    }
    
    console.log('ACM report element found, proceeding with PDF generation');
    console.log('Element dimensions:', {
      width: element.offsetWidth,
      height: element.offsetHeight,
      scrollHeight: element.scrollHeight
    });

    // Import html2pdf dynamically
    const html2pdf = (await import('html2pdf.js')).default;
    console.log('html2pdf imported successfully:', typeof html2pdf);

    // Configure PDF options
    const opt = {
<<<<<<< HEAD
      margin: 0,
=======
      margin: 0.5,
>>>>>>> eee5d97c3b32723f37083ec470d73c3070ce3acb
      filename: `ACM_Report_${acmData.base_property?.title?.replace(/\s+/g, '_') || 'Property'}_${new Date().toISOString().split('T')[0]}.pdf`,
      image: {
        type: 'jpeg',
        quality: 0.98
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        allowTaint: true
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: {
        mode: ['css', 'legacy'],
        before: '.page-break-before',
        after: '.page-break-after',
        avoid: '.no-break'
      }
    };

    // Generate and save the PDF with better page break handling
    try {
      console.log('Creating PDF with options:', opt);
      
      // Try the standard approach first
      const pdf = html2pdf().set(opt).from(element);
      console.log('PDF object created, starting save...');
      
      await pdf.save();
      console.log('PDF generated successfully');
    } catch (pdfError) {
      console.error('PDF generation failed:', pdfError);
      console.error('Error details:', {
        message: pdfError.message,
        stack: pdfError.stack,
        name: pdfError.name
      });
      
      // Try a simpler approach as fallback
      try {
        console.log('Trying fallback PDF generation...');
        const simpleOpt = {
          margin: 0.5,
          filename: `ACM_Report_${acmData.base_property?.title?.replace(/\s+/g, '_') || 'Property'}_${new Date().toISOString().split('T')[0]}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        const fallbackPdf = html2pdf().set(simpleOpt).from(element);
        await fallbackPdf.save();
        console.log('Fallback PDF generated successfully');
      } catch (fallbackError) {
        console.error('Fallback PDF generation also failed:', fallbackError);
        throw new Error(`PDF generation failed: ${pdfError.message}. Fallback also failed: ${fallbackError.message}`);
      }
    }

    // Clean up
    root.unmount();
    document.body.removeChild(tempContainer);

  } catch (error) {
    console.error('Error generating ACM PDF:', error);
    throw error;
  }
};

export default generateACMPDF;
