import { useSelector } from "react-redux";
import { generateJsonSchema } from "../utils/generateJsonSchema";

export default function JsonSchema() {
  const form = useSelector((state) => state.form);
  const schema = generateJsonSchema(form);

  return (
    <div className="w-full h-full bg-gray-100 dark:bg-gray-900 p-4 border-l border-gray-300 dark:border-gray-700 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
        📄 JSON Schema
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-inner max-h-full overflow-y-auto">
        <pre className="text-sm text-gray-800 dark:text-gray-100 whitespace-pre-wrap break-words">
          {JSON.stringify(schema, null, 2)}
        </pre>
      </div>
    </div>
  );
}
