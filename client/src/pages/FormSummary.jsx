import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFormResponses } from "../service/api";

const FormSummary = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">📝 Form Summary</h1>

      {loading ? (
        <p className="text-gray-600 text-lg">Loading...</p>
      ) : responses.length === 0 ? (
        <p className="text-red-600 text-lg">No responses yet.</p>
      ) : (
        <>
          <div className="bg-gray-100 p-4 rounded-md mb-6 shadow-sm">
            <p className="text-lg">
              <span className="font-semibold text-gray-700">Total Responses:</span>{" "}
              <span className="text-blue-600 font-bold">{responses.length}</span>
            </p>
            <p className="text-lg mt-1">
              <span className="font-semibold text-gray-700">Last Submitted At:</span>{" "}
              <span className="text-blue-600 font-bold">{getLastSubmittedDate()}</span>
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead className="bg-blue-100 text-blue-800">
                <tr>
                  <th className="px-5 py-3 text-left text-sm font-semibold">#</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold">Submitted At</th>
                  <th className="px-5 py-3 text-left text-sm font-semibold">Responses</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((res, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50 border-b">
                    <td className="px-5 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">
                      {new Date(res.submittedAt ?? "").toLocaleString()}
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-800">
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          <span className="font-medium text-gray-700">Title:</span>{" "}
                          {res.schema?.title || "Untitled Form"}
                        </li>
                        <li>
                          <span className="font-medium text-gray-700">Description:</span>{" "}
                          {res.schema?.description || "No description provided"}
                        </li>
                        {Object.entries(res.schema?.properties || {}).map(([key, value], i) => (
                          <li key={i}>
                            <span className="font-medium text-gray-700">{value.title || key}:</span>{" "}
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
