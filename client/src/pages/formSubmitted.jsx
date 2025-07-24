
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SubmitSuccess = () => {
  const formId = useSelector(state => state.form.id);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-8">🎉 Form Submitted Successfully!</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => navigate(`/summary/${formId}`)}
        >
          📊 View Form Summary
        </button>
        <button
          className="px-6 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 transition"
          onClick={() => navigate("/")}
        >
          🔙 Back to Form Create
        </button>
      </div>
    </div>
  );
};

export default SubmitSuccess;
