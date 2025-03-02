import React from "react";

export default function RequestSelect({ requestType, setRequestType }) {
  return (
    <div>
      <div className="mb-3">
        <label className="block mb-1">Select Request Type:</label>
        <select
          value={requestType}
          onChange={(e) => setRequestType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="pizza">Pizza</option>
          <option value="juice">Juice</option>
          <option value="combo">Combo (Pizza and Juice)</option>
        </select>
      </div>
    </div>
  );
}
