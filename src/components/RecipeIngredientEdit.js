import React from 'react'

export default function RecipeIngredientEdit({ ingredient, handleIngredientChange, handleIngredientDelete }) {

    function handleChange(changes) {

        //{...recipe, /.//changes} will create a new object where we take the old recipes array and overwrite with changes
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes });
    }



    return (
        <>
            <input className="recipe-edit__input" type="text"
                value={ingredient.name}
                onChange={e => handleChange({ name: e.target.value })}
            />
            <input className="recipe-edit__input" type="text"
                value={ingredient.amount}
                onChange={e => handleChange({ amount: e.target.value })}
            />

            <button
                className="btn 
                btn--danger"
                onClick={() => handleIngredientDelete(ingredient.id)}
            >
                &times;
            </button>
        </>
    )
}
