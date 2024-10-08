import React, { useEffect, useState, useRef } from "react";
import EmailEditor from "react-email-editor";

const EmailTemplateManager = () => {
  const emailEditorRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [showHtml, setShowHtml] = useState(false);
  const [emailHtml, setEmailHtml] = useState("");

  useEffect(() => {
    // Get all template keys from localStorage
    const savedTemplates = Object.keys(localStorage)
      .filter((key) => key.startsWith("template-"))
      .map((key) => key.replace("template-", ""));

    setTemplates(savedTemplates);
  }, []);

  const saveTemplateLocally = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.exportHtml((data) => {
        const { design, html } = data; // Get both design and HTML

        if (templateName) {
          // Save design and HTML in localStorage
          const templateData = { design, html };
          localStorage.setItem(
            `template-${templateName}`,
            JSON.stringify(templateData)
          );
          alert("Template saved locally!");
          setTemplates((prev) => [...prev, templateName]); // Update template list
          setTemplateName(""); // Clear input

          // Clear the editor after saving the template
          emailEditorRef.current.editor.loadBlank();
        } else {
          alert("Please enter a template name.");
        }
      });
    }
  };

  const loadTemplate = (templateName) => {
    const savedTemplateData = localStorage.getItem(`template-${templateName}`);
    if (savedTemplateData && emailEditorRef.current) {
      const { design, html } = JSON.parse(savedTemplateData);
      emailEditorRef.current.editor.loadDesign(design);
      setEmailHtml(html); // Store HTML for display or sending
    }
  };

  const discardTemplate = () => {
    if (emailEditorRef.current) {
      setSelectedTemplate(""); // Reset selected template
      emailEditorRef.current.editor.loadBlank(); // Load blank editor
    } else {
      console.error("EmailEditor is not initialized yet.");
    }
  };

  const sendEmail = () => {
    // Implement email sending logic using an API or email service
    // For demonstration, we'll just log the HTML content
    console.log("Sending email with HTML:", emailHtml);

    // Example of sending an email using an email sending service
    /*
    fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ html: emailHtml }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Email sent successfully!');
      })
      .catch(error => {
        console.error('Error sending email:', error);
      });
    */
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
        Email Template Manager
      </h1>
      <div className="editor-container mb-6">
        <div className="template-selection mb-4">
          <label
            htmlFor="templates"
            className="block text-gray-600 font-medium mb-2"
          >
            Select a Template:
          </label>
          <select
            id="templates"
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              loadTemplate(e.target.value);
            }}
            className="block w-full max-w-xs p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a template</option>
            {templates.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>
        </div>

        <div className="new-template flex items-center">
          <input
            type="text"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="New Template Name"
            className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
          />
          <button
            onClick={saveTemplateLocally}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Save New Template
          </button>
          <button
            onClick={discardTemplate}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Discard
          </button>
        </div>

        <button
          onClick={sendEmail}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
        >
          Send Email
        </button>
      </div>
      <div className="overflow-auto">
        <EmailEditor ref={emailEditorRef} />
      </div>

      {showHtml && (
        <div className="mt-4">
          <h2 className="text-lg font-bold mb-2">Email HTML:</h2>
          <div
            className="border p-4"
            dangerouslySetInnerHTML={{ __html: emailHtml }}
          />
        </div>
      )}
    </div>
  );
};

export default EmailTemplateManager;
