import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getFormResponses } from "../service/api";

const FormSummary = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔁 Getting form metadata from Redux
  const formName = useSelector((state) => state.form.name);
  const formDescription = useSelector((state) => state.form.description);

  useEffect(() => {
    if (!formId) return;

    getFormResponses(formId)
      .then((res) => {
        setResponses(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to fetch responses", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [formId]);

  const getLastSubmittedDate = () => {
    if (responses.length === 0) return "-";
    const latest = [...responses].sort(
      (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
    )[0];
    return new Date(latest.submittedAt).toLocaleString();
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">📝 Form Summary</h1>

      {/* Form metadata (shown always) */}
      <div className="bg-gray-800 p-4 rounded-md mb-6 shadow-sm text-white">
        <h2 className="text-xl font-bold">{formName || "Untitled Form"}</h2>
        <p className="text-sm mt-1 text-gray-300 whitespace-pre-wrap">{formDescription || "No description available."}</p>
      </div>

      {loading ? (
        <p className="text-gray-400 text-lg">Loading...</p>
      ) : responses.length === 0 ? (
        <p className="text-red-400 text-lg">No responses yet.</p>
      ) : (
        <>
          <div className="bg-gray-700 p-4 rounded-md mb-6 shadow-sm text-white">
            <p className="text-lg">
              <span className="font-semibold">Total Responses:</span>{" "}
              <span className="text-blue-400 font-bold">{responses.length}</span>
            </p>
            <p className="text-lg mt-1">
              <span className="font-semibold">Last Submitted At:</span>{" "}
              <span className="text-blue-400 font-bold">{getLastSubmittedDate()}</span>
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-sm ">
            <table className="min-w-full bg-gray-900 border rounded-lg shadow-sm text-white">
              <thead className="bg-gray-400 text-gray-900">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold">Submitted At</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold">Responses</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((res, index) => (
                  <tr key={index} className="odd:bg-gray-800 even:bg-gray-700 border-b border-gray-600">
                    <td className="px-5 py-4 text-sm">{index + 1}</td>
                    <td className="px-5 py-4 text-sm">
                      {new Date(res.submittedAt ?? "").toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <ul className="list-disc list-inside space-y-1">
                        {Object.entries(res.schema?.properties || {}).map(([key, value], i) => (
                          <li key={i}>
                            <span className="font-medium">{value.title || key}:</span>{" "}
                            {value.default || "(No answer)"}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default FormSummary;
