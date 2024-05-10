import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        <img src={recipe.image} className="card-img-top" alt={recipe.label} />
        <div className="card-body">
          <h5 className="card-title">{recipe.label}</h5>
          <p className="card-text">Calories: {Math.round(recipe.calories)}</p>
          <p className="card-text">Servings: {recipe.yield}</p>
          <ul className="list-unstyled recipe-ingredient">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
