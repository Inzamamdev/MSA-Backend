import { useEffect, useState } from "react";
import axios from "axios";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import APISelect from "../components/APISelect";
import RequestSelect from "../components/RequestSelect";
import PlaceList from "../components/PlaceList";

const client = new ApolloClient({
  uri: `${import.meta.env.VITE_API_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default function PlaceSearch() {
  const [location, setLocation] = useState("");
  const [requestType, setRequestType] = useState("pizza");
  const [apiMethod, setApiMethod] = useState("REST");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  // State for GraphQL field selection
  const [selectedFields, setSelectedFields] = useState({
    name: true,
    address: true,
    rating: true,
    phone: true,
  });

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude},${longitude}`);
        },
        (err) => {
          console.error("Error obtaining location", err);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser");
    }
  };

  const fetchREST = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/search/${requestType}?location=${location}`
      );
      setResults(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data via REST");
    }
  };

  const fetchGraphQL = async () => {
    try {
      let field;
      if (requestType === "combo") {
        field = "searchCombo";
      } else if (requestType === "juice") {
        field = "searchJuice";
      } else {
        field = "searchPizza";
      }

      // Dynamically construct the fields to query from selectedFields state
      const fields = Object.keys(selectedFields)
        .filter((key) => selectedFields[key])
        .join("\n");

      const query = gql`
        query GetPlaces($location: String) {
          ${field}(location: $location) {
            ${fields}
          }
        }
      `;

      const { data } = await client.query({
        query,
        variables: { location },
      });
      setResults(data[field]);
    } catch (err) {
      console.error(err);
      setError("GraphQL request failed");
    }
  };

  const fetchData = async () => {
    setError(null);
    if (apiMethod === "REST") {
      await fetchREST();
    } else {
      await fetchGraphQL();
    }
  };
  useEffect(() => {
    fetchData();
  }, [selectedFields, requestType]);
  const handleFieldChange = (e) => {
    setSelectedFields({
      ...selectedFields,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <div className="max-w-xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-4">Find Places</h1>

      <APISelect apiMethod={apiMethod} setApiMethod={setApiMethod} />
      <RequestSelect
        requestType={requestType}
        setRequestType={setRequestType}
      />

      {apiMethod === "GraphQL" && (
        <div className="mb-3">
          <label className="block mb-1">Select Fields for GraphQL Query:</label>
          <div className="flex flex-wrap gap-2">
            {["name", "address", "rating", "phone"].map((field) => (
              <label key={field} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name={field}
                  checked={selectedFields[field]}
                  onChange={handleFieldChange}
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="mb-3">
        <label className="block mb-1">Location:</label>
        <input
          type="text"
          placeholder="Enter location or click detect"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button
          onClick={handleDetectLocation}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Detect My Location
        </button>
      </div>

      <div className="mb-3">
        <button
          onClick={fetchData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Fetch Data
        </button>
      </div>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <PlaceList results={results} />
    </div>
  );
}
