import React, { useState, useEffect } from "react";

// third-party server to fetch data using axios
import axios from "axios";

// component imoprt
import SearchBox from "./components/SearchBox/SearchBox";
import RecipeCard from "./components/RecipeCard/RecipeCard";
import Pagination from "./components/Pagination/Pagination";

const App = () => {
  // creating state
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(3); // Display 3 items per page
  const [searchQuery, setSearchQuery] = useState("");

  // fetching the data using axios
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.edamam.com/search?q=${searchQuery}&app_id=${"cd552ba7"}&app_key=${"7a4bcd71d955c74f3de54ce91451fb7d"}`
        );
        // if there is no data in the server then we get error msg
        if (response.data.count === 0) {
          setError("No recipes found");
        } else {
          setRecipes(response.data.hits);
          setError(null);
        }
      } catch (error) {
        setError(error.message);
      }
      setLoading(false);
    };
    if (searchQuery.trim() !== "") {
      fetchData();
    }
  }, [searchQuery]);

  // Pagination logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Reset pagination when performing a new search
    setCurrentPage(1);
    // Reset error when performing a new search
    setError(null);
  };

  return (
    <div className="container text-center mt-4">
      <h1 className="mb-4">Recipe Finder</h1>
      <SearchBox onSearch={handleSearch} />
      <div className="row justify-content-center ">
        <div className="col-lg-8">
          {loading ? (
            <div className="mt-4">Loading...</div>
          ) : error ? (
            <div className="mt-4">Error: {error}</div>
          ) : (
            <div>
              {currentRecipes.length > 0 ? (
                <div className="row justify-content-center p-5 ">
                  {currentRecipes.map((recipe, index) => (
                    <RecipeCard key={index} recipe={recipe.recipe} />
                  ))}
                  <Pagination
                    recipesPerPage={recipesPerPage}
                    totalRecipes={recipes.length}
                    paginate={paginate}
                    className="justify-content-center"
                  />
                </div>
              ) : (
                <div className="mt-4">No recipes found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
