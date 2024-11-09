import React from "react";

function SearchEngine({ query, setQuery, search }) {
  // Handler function
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      search(e);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", marginTop: "50px" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "10px" }}>Hello Jamie!!!</h1>
      <p style={{ fontSize: "1.2rem", color: "#555", marginBottom: "20px" }}>
        Enter the city you want weather for
      </p>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <input
          type="text"
          className="city-search"
          placeholder="Enter city name"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            padding: "10px",
            fontSize: "1rem",
            marginRight: "10px",
            border: "2px solid #ccc",
            borderRadius: "5px",
            width: "250px"
          }}
        />
        <button
          onClick={search}
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            border: "none",
            color: "white",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
        </button>
      </div>
    </div>
  );
}

export default SearchEngine;
