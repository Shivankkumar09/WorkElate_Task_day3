import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import FormCard from "./FormCard";
import { BsGripHorizontal } from "react-icons/bs"; // or any icon library you use

export default function DraggableFormCard({ field, onUpdate, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: field.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group border rounded-md bg-white dark:bg-gray-800 shadow mb-4"
    >
      <div
        {...listeners}
        {...attributes}
        className="absolute top-3 left-[-12px] flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        <BsGripHorizontal className="text-xl" />
      </div>

      <div className="pl-6 pr-3 py-4">
        <FormCard field={field} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </div>
  );
}
