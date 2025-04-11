import React from "react";

interface EditorProps {
  htmlContent: string;
  setHtmlContent: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ htmlContent, setHtmlContent }) => {
  return (
    <div className="flex flex-col h-full">
      <label
        htmlFor="html-input"
        className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        HTML Input
      </label>
      <textarea
        id="html-input"
        value={htmlContent}
        onChange={(e) => setHtmlContent(e.target.value)}
        className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-accent focus:border-accent dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-accent dark:focus:border-accent font-mono text-sm"
        placeholder="Paste your HTML snippet here..."
        spellCheck="false"
      />
    </div>
  );
};

export default Editor;
