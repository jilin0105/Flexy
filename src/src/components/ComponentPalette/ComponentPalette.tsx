import React from 'react';
import { FaHeading, FaParagraph, FaButton, FaImage, FaSquare } from 'react-icons/fa';
import { useAppContext } from '../../contexts/AppContext';
import { ComponentType } from '../../types';

const componentTypes: ComponentType[] = [
  {
    name: 'Heading',
    type: 'heading',
    icon: <FaHeading className="text-xl" />,
    defaultStyles: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '16px',
    },
  },
  {
    name: 'Paragraph',
    type: 'paragraph',
    icon: <FaParagraph className="text-xl" />,
    defaultStyles: {
      fontSize: '16px',
      marginBottom: '16px',
    },
  },
  {
    name: 'Button',
    type: 'button',
    icon: <FaButton className="text-xl" />,
    defaultStyles: {
      backgroundColor: '#3b82f6',
      color: 'white',
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      cursor: 'pointer',
    },
  },
  {
    name: 'Image',
    type: 'image',
    icon: <FaImage className="text-xl" />,
    defaultStyles: {
      maxWidth: '100%',
      height: 'auto',
      marginBottom: '16px',
    },
  },
  {
    name: 'Container',
    type: 'container',
    icon: <FaSquare className="text-xl" />,
    defaultStyles: {
      padding: '16px',
      border: '1px dashed #ccc',
      marginBottom: '16px',
    },
  },
];

export const ComponentPalette: React.FC = () => {
  const { dispatch } = useAppContext();

  const handleAddComponent = (componentType: ComponentType) => {
    const newComponent = {
      id: `component-${Date.now()}`,
      type: componentType.type,
      content: componentType.type === 'image' 
        ? 'https://via.placeholder.com/300x200' 
        : componentType.name,
      styles: componentType.defaultStyles,
    };

    dispatch({ type: 'ADD_COMPONENT', payload: newComponent });
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Components</h2>
      <div className="grid grid-cols-2 gap-3">
        {componentTypes.map((component) => (
          <div
            key={component.type}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-md shadow cursor-pointer hover:bg-blue-50 transition-colors"
            onClick={() => handleAddComponent(component)}
          >
            <div className="text-blue-500 mb-2">{component.icon}</div>
            <span className="text-sm">{component.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};