import React from 'react'

const Recipe = ({recipe,onDelete}) => {
  return (
    <div>
        <h3>{recipe.title}</h3>
        <img src={recipe.immage} alt="immage missing"></img>
        <div>Ingredients<ul>{recipe.ingredients.map((ingredient)=>
            <li key={ingredient.id}>{ingredient.name}</li>
        )}</ul></div>
    </div>
  )
}

export default Recipe
 
