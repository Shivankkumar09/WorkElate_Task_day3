import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateField, removeField } from "../store/Formslice"; 

export default function FormCard({ field }) {
  const dispatch = useDispatch();
  const [newOption, setNewOption] = useState("");

  const handleChange = (key, value) => {
    dispatch(updateField({ ...field, [key]: value }));
  };

  const handleAddOption = () => {
    if (!newOption.trim()) return;
    const updatedOptions = [...(field.options || []), newOption];
    dispatch(updateField({ ...field, options: updatedOptions }));
    setNewOption("");
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...(field.options || [])];
    updatedOptions.splice(index, 1);
    dispatch(updateField({ ...field, options: updatedOptions }));
  };

  const renderFieldPreview = () => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={field.placeholder || "Short answer"}
            className="border px-2 py-1 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            disabled
          />
        );

      case "textarea":
        return (
          <textarea
            placeholder={field.placeholder || "Paragraph"}
            className="border px-2 py-1 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            disabled
          />
        );

        return (
          <input
            type="email"
            placeholder={field.placeholder || "example@email.com"}
            className="border px-2 py-1 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            disabled
          />
        );

        return (
          <input
            type="tel"
            placeholder={field.placeholder || "1234567890"}
            className="border px-2 py-1 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            disabled
          />
        );

      case "date":
        return (
          <input
            type="date"
            className="border px-2 py-1 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            disabled
          />
        );

      case "dropdown":
        return (
          <select
            className="border px-2 py-1 w-full rounded bg-white dark:bg-gray-700 text-black dark:text-white"
            disabled
          >
            <option>Select an option</option>
            {(field.options || []).map((opt, idx) => (
              <option key={idx}>{opt}</option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="space-y-1">
            {(field.options || []).map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2 text-black dark:text-white">
                <input type="checkbox" name={field.id} disabled />
                {opt}
              </label>
            ))}
          </div>
        );

        return (
          <div className="space-y-1">
            {(field.options || []).map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2 text-black dark:text-white">
                <input type="radio" name={field.id} disabled />
                {opt}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded shadow p-4 mb-4 border dark:border-gray-600">
      <input
        type="text"
        value={field.label}
        onChange={(e) => handleChange("label", e.target.value)}
        placeholder="Question"
        className="text-lg font-semibold w-full border-b border-gray-300 dark:border-gray-600 mb-2 text-black dark:text-white bg-transparent outline-none"
      />

      {["text", "textarea"].includes(field.type) && (
        <input
          type="text"
          value={field.placeholder || ""}
          onChange={(e) => handleChange("placeholder", e.target.value)}
          placeholder="Placeholder text"
          className="text-sm w-full px-2 py-1 mb-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
        />
      )}

      <input
        type="text"
        value={field.helpText || ""}
        onChange={(e) => handleChange("helpText", e.target.value)}
        placeholder="Help text (optional)"
        className="text-sm w-full px-2 py-1 mb-2 border rounded text-black dark:text-white bg-white dark:bg-gray-700"
      />

      <select
  value={field.type}
  onChange={(e) => handleChange("type", e.target.value)}
  className="mb-2 w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
>
        <option value="text">Short Answer</option>
        <option value="textarea">Paragraph</option>
        <option value="dropdown">Dropdown</option>
        <option value="checkbox">Checkbox</option>
        <option value="date">Date</option>
      </select>

      {(field.type === "dropdown" || field.type === "checkbox") && (
        <div className="mb-2">
          <div className="space-y-1">
            {(field.options || []).map((opt, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
              >
                <span>{opt}</span>
                <button
                  onClick={() => handleRemoveOption(idx)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div className="flex mt-2 gap-2">
            <input
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
              placeholder="Add option"
              className="border px-2 py-1 flex-1 text-white rounded"
            />
            <button
              onClick={handleAddOption}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="mt-2">{renderFieldPreview()}</div>

      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => dispatch(removeField(field.id))}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>

        <label className="flex items-center gap-2">
          Required
          <input
            type="checkbox"
            checked={field.required}
            onChange={(e) => handleChange("required", e.target.checked)}
          />
        </label>
      </div>
    </div>
  );
}
