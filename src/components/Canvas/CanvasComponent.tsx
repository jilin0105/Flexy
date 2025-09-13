import React from 'react';
import { useDraggableComponent } from '../../hooks/useDraggable';
import { useAppContext } from '../../contexts/AppContext';
import { Component } from '../../types';

interface CanvasComponentProps {
  component: Component;
  isSelected: boolean;
}

export const CanvasComponent: React.FC<CanvasComponentProps> = ({
  component,
  isSelected,
}) => {
  const { dispatch } = useAppContext();
  const { attributes, listeners, setNodeRef, style } = useDraggableComponent(
    component.id
  );

  const handleSelect = () => {
    dispatch({ type: 'SELECT_COMPONENT', payload: component.id });
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_COMPONENT', payload: component.id });
  };

  const renderComponent = () => {
    const { type, content, styles } = component;
    const styleProps = {
      style: {
        ...styles,
        border: isSelected ? '2px solid #3b82f6' : 'none',
        position: 'relative' as const,
        cursor: 'pointer',
      },
    };

    switch (type) {
      case 'heading':
        return (
          <h1 {...styleProps} onClick={handleSelect}>
            {content}
          </h1>
        );
      case 'paragraph':
        return (
          <p {...styleProps} onClick={handleSelect}>
            {content}
          </p>
        );
      case 'button':
        return (
          <button {...styleProps} onClick={handleSelect}>
            {content}
          </button>
        );
      case 'image':
        return (
          <img
            src={content}
            alt="Component"
            {...styleProps}
            onClick={handleSelect}
          />
        );
      case 'container':
        return (
          <div {...styleProps} onClick={handleSelect}>
            {content}
          </div>
        );
      default:
        return (
          <div {...styleProps} onClick={handleSelect}>
            {content}
          </div>
        );
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-4 group"
    >
      {renderComponent()}
      {isSelected && (
        <div className="absolute top-0 right-0 flex space-x-1 p-1">
          <button
            className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            onClick={handleDelete}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};