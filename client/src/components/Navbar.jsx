import { FaMoon, FaSun } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { resetForm, toggleTheme } from "../store/Formslice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toggleJsonSchema } from "../store/Formslice"

export default function Navbar() {
  const theme = useSelector((state) => state.form.theme);
  const form = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const formId = useSelector((state) => state.form.id);
  const isPreviewPage = location.pathname.startsWith("/preview/");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const showJsonSchema = useSelector((state) => state.form.showJsonSchema);

  const handlePreview = () => {
    if (!form.name.trim()) {
      alert("Please add a form name before previewing.");
      return;
    }
    if (form.fields.length === 0) {
      alert("Please add at least one field to preview the form.");
      return;
    }
    navigate(`/preview/${formId}`);
    setIsMenuOpen(false);
  };

  const handleCreateNewForm = () => {
    dispatch(resetForm());
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <header className="flex items-center justify-between px-4 py-3 shadow bg-white text-black dark:bg-gray-900 dark:text-white">
        <h1 className="text-lg font-bold">FormBuilder</h1>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl">
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isPreviewPage && (
            <>
              <button onClick={handlePreview} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Preview</button>
              <button
        onClick={() => dispatch(toggleJsonSchema())}
        className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200"
      >
        {showJsonSchema ? "Hide JSON Schema" : "Show JSON Schema"}
      </button>
              <button onClick={handleCreateNewForm} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create New Form</button>
            </>
          )}

          {isPreviewPage && (
            <Link to="/">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Edit</button>
            </Link>
          )}

          
        </div>
      </header>

      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white shadow dark:bg-gray-800 dark:text-white space-y-2">
          {!isPreviewPage && (
            <>
              <button onClick={handlePreview} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Preview</button>
              <button onClick={handleCreateNewForm} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Create New Form</button>
            </>
          )}

          {isPreviewPage && (
            <Link to="/formedit">
              <button onClick={() => setIsMenuOpen(false)} className="block w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Back to Edit</button>
            </Link>
          )}

         
        </div>
      )}
    </div>
  );
}
