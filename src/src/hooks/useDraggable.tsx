    import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function useDraggableComponent(id: string) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return {
    attributes,
    listeners,
    setNodeRef,
    style,
  };
}