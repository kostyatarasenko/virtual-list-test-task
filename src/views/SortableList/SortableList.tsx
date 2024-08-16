import React, { ReactNode, useMemo } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { get as _get } from 'lodash';

type SortableListProps<T> = {
  items: T[];
  children: ReactNode;
  itemIdKey: string;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
};

const SortableList = <T,>({ items, children, itemIdKey, setItems }: SortableListProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => _get(item, itemIdKey) === active.id);
        const newIndex = items.findIndex(item => _get(item, itemIdKey) === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const sortedItemIds = useMemo(
    () => items.map((item) => _get(item, itemIdKey) as string | number),
    [items, itemIdKey],
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={sortedItemIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableList;
