import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
    // Reset error message when user types
    setErrorMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      setErrorMessage("Please enter a search query");
    } else {
      onSearch(query);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <form className="col-lg-6 col-md-8 col-sm-10" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="form-control"
            placeholder="Search for recipes..."
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </form>
      {errorMessage && (
        <div className="col-lg-6 col-md-8 col-sm-10 mt-2">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
