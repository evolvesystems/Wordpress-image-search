
import React, { useRef, useEffect } from 'react';

interface EmbedPreviewProps {
  embedCode: string;
}

const EmbedPreview: React.FC<EmbedPreviewProps> = ({ embedCode }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument;
    if (!doc) return;

    const iframeContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { 
              margin: 0; 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              text-align: center;
              color: #2563eb; /* text-blue-600 */
              font-weight: 500; /* font-medium */
              background-color: #eff6ff; /* bg-blue-50 */
            }
          </style>
        </head>
        <body>
          <div>Your Website Content Here</div>
          ${embedCode}
        </body>
      </html>
    `;

    doc.open();
    doc.write(iframeContent);
    doc.close();
  }, [embedCode]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
      <p className="text-gray-600 mb-4">
        This is a true preview of how the chat widget will appear on your website. The script below is running in this sandboxed frame. Try clicking the chat button!
      </p>
      <div className="bg-blue-100 rounded-lg h-[300px] relative border-2 border-dashed border-blue-200 overflow-hidden">
        <iframe
          ref={iframeRef}
          title="Embed Preview"
          className="w-full h-full absolute top-0 left-0 border-0"
        />
      </div>
    </div>
  );
};

export default EmbedPreview;
