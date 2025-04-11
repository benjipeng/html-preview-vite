import React from "react";

interface PreviewProps {
  htmlContent: string;
}

const Preview: React.FC<PreviewProps> = ({ htmlContent }) => {
  return (
    <div className="flex flex-col h-full">
      <label
        htmlFor="preview-frame"
        className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Live Preview
      </label>
      <iframe
        id="preview-frame"
        srcDoc={htmlContent}
        title="HTML Preview"
        className="flex-1 w-full h-full border border-gray-300 rounded-md shadow-sm bg-white dark:border-gray-600"
        sandbox="allow-scripts allow-same-origin" // Basic sandbox for security
      />
    </div>
  );
};

export default Preview;
