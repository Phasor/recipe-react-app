import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from './App'

//here we loop through recipes collection INSIDE the JSX:

export default function RecipeList({ recipes }) {

    const { handleRecipeAdd } = useContext(RecipeContext);

    return (
        <div className="recipe-list">
            <div>
                {recipes.map(recipe => {
                    return (
                        <Recipe key={recipe.id} {...recipe} />
                        /* ... spread operator allows us to pass down each recipe attribute (id, name, servings etc)
                         to the child Recipe element
                         
                         Ensure when you return a list of items that you provide a key.
                         
                         */
                    )
                })}
            </div>
            <div className="recipe-list__add-recipe-button-container">
                <button
                    className="btn btn--primary"
                    onClick={handleRecipeAdd}
                >
                    Add Recipe</button>
            </div>
        </div>
    )
}
