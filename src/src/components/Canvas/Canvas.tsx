import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { useAppContext } from '../../contexts/AppContext';
import { CanvasComponent } from './CanvasComponent';
import { Component } from '../../types';

export const Canvas: React.FC = () => {
  const { state } = useAppContext();
  const { setNodeRef } = useDroppable({
    id: 'canvas',
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 bg-white p-6 rounded-lg shadow-md min-h-screen"
    >
      <h2 className="text-xl font-semibold mb-6">Canvas</h2>
      <div className="border border-dashed border-gray-300 rounded-lg p-4 min-h-[500px]">
        {state.components.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Drag components here or add them from the palette</p>
          </div>
        ) : (
          state.components.map((component) => (
            <CanvasComponent
              key={component.id}
              component={component}
              isSelected={state.selectedComponent === component.id}
            />
          ))
        )}
      </div>
    </div>
  );
};