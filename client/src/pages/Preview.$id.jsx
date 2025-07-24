import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { addFormResponse } from "../service/api"; 
import { useNavigate } from "react-router-dom";

export default function PreviewForm() {
  const fields = useSelector((state) => state.form.fields);
  const formName = useSelector((state) => state.form.name);
  const formDescription = useSelector((state) => state.form.description);
  const theme = useSelector((state) => state.form.theme);
  const formId = useSelector(state => state.form.id);

  const [viewMode, setViewMode] = useState("desktop");
  const navigate = useNavigate();

  const renderField = (field) => {
    const nameAttr = field.id;
    const placeholder = field.placeholder || `Enter ${field.label}`;

    switch (field.type.toLowerCase()) {
      case "text":
        return (
          <input
            name={nameAttr}
            type="text"
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            pattern={field.pattern}
            placeholder={placeholder}
            className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        );
      case "textarea":
        return (
          <textarea
            name={nameAttr}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            placeholder={placeholder}
            className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        );
      case "date":
        return (
          <input
            name={nameAttr}
            required={field.required}
            type="date"
            className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        );
      case "email":
        return (
          <input
            name={nameAttr}
            type="email"
            required={field.required}
            placeholder={placeholder}
            className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        );
      case "phone":
        return (
          <input
            name={nameAttr}
            type="tel"
            required={field.required}
            pattern={field.pattern || "^\\d{10}$"}
            placeholder={placeholder}
            className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          />
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={nameAttr}
                  value={option}
                  required={field.required}
                  className="accent-blue-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="space-y-2">
            {field.options?.map((option, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  name={`${nameAttr}-${option}`}
                  type="checkbox"
                  value={option}
                  className="accent-blue-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <select
            name={nameAttr}
            required={field.required}
            className="border p-2 w-full rounded bg-white dark:bg-gray-800 text-black dark:text-white"
          >
            <option value="">Select</option>
            {field.options?.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return null;
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const formElements = e.currentTarget.elements;

  const formData = {};
  const schema = {
    title: formName || "",
    description: formDescription || "",
    type: "object",
    properties: {},
    required: [],
  };

  for (const field of fields) {
    const key = field.id;
    let userValue = "";

    try {
      if (field.type === "checkbox") {
        const selected = [];
        field.options?.forEach((option) => {
          const input = formElements.namedItem(`${key}-${option}`);
          if (input?.checked) selected.push(option);
        });

        if (field.required && selected.length === 0) {
          alert(`Please select at least one option for: ${field.label}`);
          return; 
        }

        userValue = selected;
        formData[field.label] = selected;

      } else if (field.type === "radio") {
        const radios = formElements[key];
        let selected = "";

        if (radios instanceof RadioNodeList) {
          selected = Array.from(radios).find((r) => r.checked)?.value || "";
        } else {
          selected = radios?.checked ? radios.value : "";
        }

        if (field.required && !selected) {
          alert(`Please select an option for: ${field.label}`);
          return; 
        }

        userValue = selected;
        formData[field.label] = selected;

      } else {
        const input = formElements.namedItem(key);
        const value = input?.value?.trim() || "";

        if (field.required && !value) {
          alert(`Please fill out the required field: ${field.label}`);
          return; 
        }

        if (field.minLength && value.length < field.minLength) {
          alert(`${field.label} should be at least ${field.minLength} characters.`);
          return;
        }

        if (field.maxLength && value.length > field.maxLength) {
          alert(`${field.label} should be no more than ${field.maxLength} characters.`);
          return;
        }

        if (field.pattern) {
          const regex = new RegExp(field.pattern);
          if (!regex.test(value)) {
            alert(`Please enter a valid ${field.label}`);
            return;
          }
        }

        userValue = value;
        formData[field.label] = value;
      }

      
      schema.properties[key] = {
        type: field.type || "string",
        title: field.label || "",
        default: userValue,
      };

      if (field.required) {
        schema.required.push(key);
      }

    } catch (err) {
      console.warn(`Skipping field ${key} due to error`, err);
    }
  }


  try {
    await addFormResponse({ formId, schema }); 
    alert("✅ Form submitted successfully!");
    navigate(`/formsubmitted`, { state: { formId } }); 
  } catch (err) {
    console.error(" Error submitting form:", err);
    alert("Something went wrong. Try again!");
  }
};



  return (
    <div className={theme === "dark" ? "dark bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <Navbar />
      <div className="flex gap-2 mb-4">
        <button onClick={() => setViewMode("mobile")} className="px-3 py-1 rounded bg-blue-500 text-white">Mobile</button>
        <button onClick={() => setViewMode("tablet")} className="px-3 py-1 rounded bg-blue-500 text-white">Tablet</button>
        <button onClick={() => setViewMode("desktop")} className="px-3 py-1 rounded bg-blue-500 text-white">Desktop</button>
      </div>

      <div
        className={`border shadow-lg p-6 rounded bg-white dark:bg-gray-800 overflow-hidden break-words ${
          viewMode === "mobile"
            ? "w-[375px] max-w-[375px] mx-auto"
            : viewMode === "tablet"
            ? "w-[768px] max-w-[768px] mx-auto"
            : "w-full max-w-5xl mx-auto"
        }`}
      >
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white drop-shadow-md">
            {formName}
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8 whitespace-pre-wrap break-words max-w-3xl mx-auto">
            {formDescription}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-4 shadow-sm space-y-2"
              >
                <label className="block text-sm font-medium text-gray-800 dark:text-gray-200">
                  {idx + 1}: {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderField(field)}
              </div>
            ))}

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
