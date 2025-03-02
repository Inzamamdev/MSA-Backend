import React from "react";

export default function APISelect({ apiMethod, setApiMethod }) {
  return (
    <div className="mb-3">
      <label className="block mb-1">Select API Method:</label>
      <select
        value={apiMethod}
        onChange={(e) => setApiMethod(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="REST">REST</option>
        <option value="GraphQL">GraphQL</option>
      </select>
    </div>
  );
}
