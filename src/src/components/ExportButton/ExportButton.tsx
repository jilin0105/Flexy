import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { generateHTML } from '../../utils/exportToHTML';

export const ExportButton: React.FC = () => {
  const { state } = useAppContext();

  const handleExport = () => {
    const html = generateHTML(state.components);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flexy-export.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
    >
      Export HTML
    </button>
  );
};