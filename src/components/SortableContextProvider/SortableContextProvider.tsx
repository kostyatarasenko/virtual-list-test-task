import React, { ReactNode, useMemo } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import { get as _get } from 'lodash';

import { Direction as DirectionEnum } from '../../constants';

type SortableListProps<T> = {
  items: T[];
  children: ReactNode;
  itemIdKey: string;
  onDragEnd?: (event: DragEndEvent) => void;
  direction?: DirectionEnum;
};

const directionsMap = {
  [DirectionEnum.Vertical]: verticalListSortingStrategy,
  [DirectionEnum.Horizontal]: horizontalListSortingStrategy,
};

const SortableContextProvider = <T,>({
  items,
  children,
  itemIdKey,
  onDragEnd,
  direction = DirectionEnum.Vertical,
}: SortableListProps<T>) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const sortedItemIds = useMemo(
    () => items.map((item) => _get(item, itemIdKey) as number),
    [items, itemIdKey],
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
      <SortableContext items={sortedItemIds} strategy={directionsMap[direction]}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContextProvider;
