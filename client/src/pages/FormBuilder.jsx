import { useSelector } from "react-redux";
import FormEdit from "../components/FormEdit";
import JsonSchemaViewer from "../components/JsonSchema";
import Navbar from "../components/Navbar";

export default function FormBuilder() {
  const showJsonSchema = useSelector((state) => state.form.showJsonSchema);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
      
        <div className="flex-1 overflow-y-auto p-6 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <FormEdit />
          </div>
        </div>

        
        {showJsonSchema && (
          <div className="w-full max-w-md border-l border-gray-300 bg-gray-100 dark:bg-gray-800 overflow-y-auto p-4">
            <JsonSchemaViewer />
          </div>
        )}
      </div>
    </div>
  );
}
