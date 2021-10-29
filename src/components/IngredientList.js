import React from 'react'
import Ingredient from './Ingredient'

export default function IngredientList({ ingredients }) {

    //Looping outside the JSX. 
    //We can also loop through a collection outside the JSX like this:
    // ... passes down the ingredient props to the <Ingredient> child element

    const ingredientElements = ingredients.map(ingredient => {
        return <Ingredient key={ingredient.id} {...ingredient} />
    })

    return (
        <div className="ingredient-grid">
            {ingredientElements}
        </div>
    )
}
