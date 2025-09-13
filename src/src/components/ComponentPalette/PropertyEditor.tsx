import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useAppContext } from '../../contexts/AppContext';
import { FaTrash } from 'react-icons/fa';

export const PropertyEditor: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [showColorPicker, setShowColorPicker] = useState(false);

  if (!state.selectedComponent) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Properties</h2>
        <p className="text-gray-500">Select a component to edit its properties</p>
      </div>
    );
  }

  const component = state.components.find(
    (c) => c.id === state.selectedComponent
  );

  if (!component) return null;

  const handleStyleChange = (property: string, value: string | number) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: component.id,
        updates: {
          styles: {
            ...component.styles,
            [property]: value,
          },
        },
      },
    });
  };

  const handleContentChange = (content: string) => {
    dispatch({
      type: 'UPDATE_COMPONENT',
      payload: {
        id: component.id,
        updates: { content },
      },
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_COMPONENT', payload: component.id });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Properties</h2>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          <FaTrash />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          {component.type === 'image' ? (
            <input
              type="text"
              value={component.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Image URL"
            />
          ) : (
            <textarea
              value={component.content}
              onChange={(e) => handleContentChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Font Size
          </label>
          <input
            type="range"
            min="8"
            max="72"
            value={parseInt(component.styles.fontSize as string) || 16}
            onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)}
            className="w-full"
          />
          <div className="text-sm text-gray-500">
            {component.styles.fontSize || '16px'}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer mr-2"
              style={{ backgroundColor: component.styles.color as string || '#000' }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <input
              type="text"
              value={component.styles.color || '#000000'}
              onChange={(e) => handleStyleChange('color', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          {showColorPicker && (
            <div className="mt-2">
              <HexColorPicker
                color={component.styles.color as string || '#000'}
                onChange={(color) => handleStyleChange('color', color)}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex items-center">
            <div
              className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer mr-2"
              style={{ backgroundColor: component.styles.backgroundColor as string || '#fff' }}
              onClick={() => setShowColorPicker(!showColorPicker)}
            />
            <input
              type="text"
              value={component.styles.backgroundColor || '#ffffff'}
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Margin
          </label>
          <input
            type="text"
            value={component.styles.margin || '0'}
            onChange={(e) => handleStyleChange('margin', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. 10px or 10px 20px"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Padding
          </label>
          <input
            type="text"
            value={component.styles.padding || '0'}
            onChange={(e) => handleStyleChange('padding', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g. 10px or 10px 20px"
          />
        </div>
      </div>
    </div>
  );
};