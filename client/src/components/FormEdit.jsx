import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  updateField,
  removeField,
  setFormName,
  setFormDescription,
  reorderFields,
} from "../store/Formslice";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableFormCard from "./DraggableCard";

export default function FormEdit() {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.form.fields);
  const name = useSelector((state) => state.form.name);
  const description = useSelector((state) => state.form.description);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleAddField = (type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: "",
      required: false,
      placeholder: "",
      options: type === "dropdown" || type === "checkbox" ? [] : undefined,
    };
    dispatch(addField(newField));
  };

  const handleUpdateField = (id, data) => {
    const existing = fields.find((f) => f.id === id);
    if (!existing) return;
    dispatch(updateField({ ...existing, ...data }));
  };

  const handleDeleteField = (id) => {
    dispatch(removeField(id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const reordered = arrayMove(fields, oldIndex, newIndex);
      dispatch(reorderFields(reordered));
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white transition-colors">
        <div className="p-6 max-w-4xl mx-auto">
          <div className="mb-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Form Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => dispatch(setFormName(e.target.value))}
                placeholder="Enter form title"
                className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Form Description
              </label>
              <textarea
                value={description}
                onChange={(e) => dispatch(setFormDescription(e.target.value))}
                placeholder="Add a short description for this form"
                className="w-full border border-gray-700 bg-gray-800 text-white p-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={() => handleAddField("text")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              + Add Field
            </button>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
          >
            <SortableContext
              items={fields.map((f) => f.id)}
              strategy={verticalListSortingStrategy}
            >
              {fields.map((field) => (
                <DraggableFormCard
                  key={field.id}
                  field={field}
                  onUpdate={(data) => handleUpdateField(field.id, data)}
                  onDelete={() => handleDeleteField(field.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
