"use client";
import Image from "next/image";
import Card from "../../../components/ui/molecules/CardUI";
import TemplateEditor from "../../../components/ui/organisms/TemplateEditor";
import { formatDate } from "@fullcalendar/core/index.js";

export default function TemplateEditorUI({
  title,
  editorValue,
  setEditorValue,
  setTitle,
}) {
  return (
    <Card
      className="max-w-full bg-white dark:bg-slate-800 text-sm shadow"
      title={<div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Template Title"
        className="text-xl font-medium focus:outline-none flex-1 first-letter:capitalize"
      />
      <p className="text-sm text-gray-400 mt-1">Date to: {new Date().toISOString().split("T")[0]}</p>

      </div>}
    >
      <div className="flex justify-between space-x-2">
        <div className="w-1/2 space-y-4">

          {/* Description */}
          <div className="mt-2 flex flex-col">
            <TemplateEditor
              editorValue={editorValue}
              setEditorValue={setEditorValue}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-between pt-2">
            <button className="px-4 py-2 border rounded-lg">← Back</button>
            <button
              onClick={() => {
                console.log("Saving:", { title, description });
                alert("Template saved! (check console)");
              }}
              className="px-5 py-2 bg-primary-default text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>

        <div className="w-1/2">
          {/* Right Sidebar - Live Preview */}
          <Card
            title={"Live Preview"}
            className="w-full bg-white h-[60vh] overflow-y-scroll dark:bg-slate-800 text-sm shadow"
            titleClass=""
          >
            {title && (
              <h3 className="text-xl font-semibold mb-2 first-letter:capitalize">
                {title}
              </h3>
            )}
            
            {editorValue !== "" ? (
              <div 
                className="prose max-w-none prose-img:max-w-full prose-img:h-auto prose-video:max-w-full prose-video:h-auto"
                dangerouslySetInnerHTML={{ __html: editorValue }}
              />
            ) : (
              <div className="text-gray-400 italic flex flex-col items-center justify-center">
                <Image 
                src={'/assets/images/all-img/No preview.png'}
                alt="No Preview"
                width={150}
                height={150}
                className="opacity-40 mb-4"
                />
                Start typing to see the preview...
              </div>
            )}
          </Card>
        </div>
      </div>
      
      {/* Additional styles for better media display */}
      <style jsx global>{`
        .ql-editor video {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .ql-editor img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        /* Preview panel styles */
        .prose video {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 4px;
          margin: 10px 0;
        }
        
        .prose img {
          max-width: 100% !important;
          height: auto !important;
          border-radius: 4px;
          margin: 10px 0;
        }
      `}</style>
    </Card>
  );
}