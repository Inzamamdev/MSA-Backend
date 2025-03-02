import React from "react";

export default function PlaceList({ results }) {
  return (
    <div>
      {results.length > 0 ? (
        results.map((place, index) => (
          <div key={index} className="border p-3 mb-2 rounded">
            <h2 className="text-lg font-bold">{place.name}</h2>
            <p>{place.address}</p>
            <p>{place.rating}</p>
            <p>{place.phone}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No results found</p>
      )}
    </div>
  );
}
