import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { CanvasComponent } from '../Canvas/CanvasComponent';

export const Preview: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow-md min-h-screen">
      <h2 className="text-xl font-semibold mb-6">Preview</h2>
      <div className="border border-gray-300 rounded-lg p-4 min-h-[500px]">
        {state.components.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No components to preview</p>
          </div>
        ) : (
          state.components.map((component) => (
            <CanvasComponent
              key={component.id}
              component={component}
              isSelected={false}
            />
          ))
        )}
      </div>
    </div>
  );
};