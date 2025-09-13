import React from 'react';
import { DndProvider } from '@dnd-kit/core';
import { HTML5Backend } from '@dnd-kit/core/dist/backends/HTML5Backend';
import { AppProvider } from './contexts/AppContext';
import { ComponentPalette } from './components/ComponentPalette/ComponentPalette';
import { Canvas } from './components/Canvas/Canvas';
import { PropertyEditor } from './components/PropertyEditor/PropertyEditor';
import { Preview } from './components/Preview/Preview';
import { ExportButton } from './components/ExportButton/ExportButton';
import { useAppContext } from './contexts/AppContext';

const AppContent: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const togglePreviewMode = () => {
    dispatch({ type: 'TOGGLE_PREVIEW_MODE' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Flexy</h1>
          <div className="flex space-x-3">
            <button
              onClick={togglePreviewMode}
              className={`px-4 py-2 rounded-md font-medium ${
                state.previewMode
                  ? 'bg-gray-200 text-gray-800'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {state.previewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
            <ExportButton />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {state.previewMode ? (
          <Preview />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ComponentPalette />
            </div>
            <div className="lg:col-span-2">
              <Canvas />
            </div>
            <div className="lg:col-span-1">
              <PropertyEditor />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Flexy - Visual Web Design Tool • Open Source Project
          </p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </DndProvider>
  );
}

export default App;