---
template: BlogPost
path: /migrating-to-dnd-kit-from-react-sortable-hoc
date: 2023-04-27T03:03:46.203Z
title: Migrating to React DND Kit from React Sortable Hoc
thumbnail: /assets/edwardsmoses_react_dnd_kit.png
---

<!--StartFragment-->

## **Introduction**

I recently worked on a feature request to build a drag-and-drop sorting interface for a project I'm a part of. When we started on the feature, across many libraries that offered this functionality for React, we settled on two: React Sortable Hoc and React DND Kit. (spoiler: we eventually settled on DND Kit)

After comparing the API for both libraries, we went with React Sortable HOC, as the API for the library was relatively simpler, and so it was easier to implement the drag and drop interface we wanted.

But a new feature for the drag-and-drop interface was requested by the project stakeholder; we had to add a new feature, allowing users to drag across different sortable lists.

Previously, the interface only allowed for dragging and dropping across one list, but we now needed to allow users to drag and drop across different lists, and unfortunately, React Sortable HOC didn't have that feature set.

So, we looked into React DND Kit, and voila, it allowed for both sorting across one list, and dragging/dropping across to a different list, albeit with a relatively complex API. And so, we set out to migrate from React Sortable HOC to React DND kit, with some little hiccups.

So, in this article, we'll together be migrating a component from React Sortable HOC to the new React DND Kit.

Here's the [component](https://github.com/edwardsmoses/dnd-kit-from-react-sortable-hoc/blob/8c8b91873f1d3cd138f90068c7303e5d5f64264b/src/start/index.jsx#L11) we'll be migrating.

## Getting started

To get started, as we're used to, via `npm` / `yarn`, install the core library and the sortable preset:

```bash
npm install @dnd-kit/core @dnd-kit/sortable

```

Excellent! With the core library and the sortable preset installed, we're all set to proceed.

## Implementing the Drag and Drop Functionality

Now, we have the necessary libraries installed, let's explore how we can replace the components from React Sortable HOC with their counterparts from the DND Kit package.

### Draggable

In React DND Kit, the `useSortable` hook takes center stage when it comes to making elements sortable - notice that it's an abstraction over the `useDraggable` [hook](https://docs.dndkit.com/api-documentation/draggable).

To replace the usage of the `SortableElement` component from React Sortable HOC, we'll employ the `useSortable` hook

Take a look at this example:

```jsx
// Before
import { sortableElement } from "react-sortable-hoc";

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

// After
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableItem = ({ id, value }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
      Item {value}
    </li>
  );
};
```

In the updated code, notice how we utilize the useSortable hook.

The `useSortable` hook accepts an `id` argument that uniquely identifies the element that's been dragged, and returns the `attributes`, `listeners`, `setNodeRef`, and the `transform` / `transition` properties.

These properties enable event handling, attribute binding, and styling for the dragging functionality.

- `setNodeRef` : Specifies the component that should be moved during the dragging operation.
- `listeners`: Specifies which element listens to the drag events.
- `transform`: Sets up the necessary styles when an element is being moved due to the drag action.
- `transition` : Sets up any animations that occur during the element's movement.

For further customization options using the useSortable hook, you can refer to the [official documentation](https://docs.dndkit.com/presets/sortable/usesortable).

### Sortable

In `dnd-kit`, the concept of sortable containers is handled by the `SortableContext` component.

To replace the usage of `SortableContainer` from React Sortable HOC, we'll utilize the `SortableContext`.

Here's a snippet to demonstrate the transition:

```jsx
// Before
import { sortableContainer, sortableElement } from "react-sortable-hoc";

const SortableItem = sortableElement(({ value }) => <li>{value}</li>);

const SortableContainer = sortableContainer(({ children }) => {
  return <div>{children}</div>;
});

<SortableContainer onSortEnd={onSortEnd}>
  <ul>
    {items.map((item, i) => (
      <SortableItem key={item} index={i} value={`Item ${item}`} />
    ))}
  </ul>
</SortableContainer>;

// After
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext } from "@dnd-kit/core";

const SortableList = ({ items }) => {
  return (
    <DndContext>
      <SortableContext items={items}>{/* ... */}</SortableContext>
    </DndContext>
  );
};
```

### Drag Overlay

One cool functionality that `dnd-kit` offers is the ability to customize the component that would be rendered during the drag operation. Here's an example of doing that:

```jsx
import {DragOverlay} from '@dnd-kit/core';
import {SortableContext} from '@dnd-kit/sortable';

const SortableList = ({ items }) => (
  <SortableContext items={items}>
    {items.map((value, index) => (
      <DraggableItem key={index} value={value} />
    ))}

    <DragOverlay>
        {activeId ? (
          <DraggableItem value={`Dragged Item ${activeId}`} />
        ): null}
    </DragOverlay>

  <SortableContext items={items}>
);

```

In the above example, we've customized the dragged component by setting a different value, opening up endless possibilities for personalized drag visuals.

## Putting it all together

Now, we have an idea of the components we'll be replacing, it's time to bring everything together.

As a refresher, here's the [start](https://github.com/edwardsmoses/dnd-kit-from-react-sortable-hoc/blob/main/src/start/index.jsx#L11) component we'll be migrating to `dnd-kit`, and the resulting [migrated](https://github.com/edwardsmoses/dnd-kit-from-react-sortable-hoc/blob/main/src/end/index.jsx) component.

```jsx
import { DndContext, useSensors, useSensor, PointerSensor, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

const App = () => {
  const [collections, setCollections] = React.useState([0, 1, 2, 3, 4]);

  const sensors = useSensors(useSensor(PointerSensor));

  const onSortEnd = (event) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setCollections((prev) => {
        const activeIndex = prev.findIndex((item) => item === active?.id);
        const overIndex = prev.findIndex((item) => item === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onSortEnd}>
      <SortableContext items={collections} strategy={verticalListSortingStrategy}>
        <ul>
          {collections.map((item) => (
            <SortableItem id={item} key={item} value={item} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
```

In the above, we use the PointerSensor to detect when the user is dragging an item using the mouse.
DND Kit provides other [input sensors](https://docs.dndkit.com/api-documentation/sensors) you can explore - one example of the amazing versatility that the library's abstraction offers.

The `closestCenter` collision detection algorithm is used to determine the target center during the drag operation.You can find more [collision detection algorithms](https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms) that might better suit your specific use case.

We have also defined the `onSortEnd` function to handle the sorting event.
When the **active** item is dropped over another item (**over**), we find the indices of the **active** and **over** items in the collections array.

Then, we use the `arrayMove` function to update the array with the active item moved to the over item's position. Note that if they are the same, we don't need to do anything.

Additionally, we have defined the `verticalListSortingStrategy` to customize the sorting behavior for vertical lists. You can find more information [here](https://docs.dndkit.com/presets/sortable#sorting-strategies).

## Conclusion

Migrating to React DND Kit offers additional flexibility by enabling fine customization of sorting and dragging components.

Although React DND Kit has a relatively more complex API, it provides powerful features to handle intricate drag-and-drop scenarios.

In this article, we covered the installation process, component replacements, and sorting event handling. By following these steps, you should be able to successfully migrate your project from React Sortable HOC to React DND Kit.

Here's the repo that we'd used through the article:
<https://github.com/edwardsmoses/dnd-kit-from-react-sortable-hoc>

Happy sorting and dragging!
