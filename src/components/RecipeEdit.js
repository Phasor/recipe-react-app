import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit';
import { RecipeContext } from './App';
import { uuid } from 'uuidv4'; //random ID generator

export default function RecipeEdit({ recipe }) {

    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext);

    function handleChange(changes) {

        //{...recipe, /.//changes} will create a new object where we take the old recipes array and overwrite with changes
        handleRecipeChange(recipe.id, { ...recipe, ...changes });
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients];//copy current recipe array so we don't change it
        const index = newIngredients.findIndex(ingred => ingred.id === id);
        newIngredients[index] = ingredient; //update this recipe
        handleChange({ ingredients: newIngredients });
    }

    function handleIngredientAdd() {
        const newIngredient = {
            id: uuid(),
            name: '',
            amount: ''
        }
        handleChange({ ingredients: [...recipe.ingredients, newIngredient] })
    }

    function handleIngredientDelete(id) {
        handleChange({
            ingredients: recipe.ingredients.filter(i => i.id !== id)
        })
    }


    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-container">
                <button
                    className="btn recipe-edit__remove-button"
                    onClick={() => handleRecipeSelect(undefined)}
                >
                    &times;
                </button>
            </div>

            <div className="recipe-edit__details-grid">
                <label htmlFor="name" className="recipe-edit__label">Name</label>
                <input
                    type="text" name="name"
                    id="name" className="recipe-edit__input"
                    value={recipe.name}
                    onChange={event => handleChange({ name: event.target.value })}
                />
                <label htmlFor="cookTime" className="recipe-edit__label">Cook Time</label>
                <input type="text" name="cookTime" id="cookTime"
                    className="recipe-edit__input" value={recipe.cookTime}
                    onChange={event => handleChange({ cookTime: event.target.value })}
                />
                <label htmlFor="servings" className="recipe-edit__label">Servings</label>
                <input type="number" min="1" name="servings" id="servings"
                    className="recipe-edit__input" value={recipe.servings}
                    onInput={event => handleChange({ servings: parseInt(event.target.value) || '' })}
                />
                <label htmlFor="instructions" className="recipe-edit__label">Instructions</label>
                <textarea name="instructions" id="instructions"
                    className="recipe-edit__input"
                    onChange={event => handleChange({ instructions: event.target.value })}
                    value={recipe.instructions}
                />

            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>

                {/*Ingredient Components*/}
                {recipe.ingredients.map(ingredient => (
                    <RecipeIngredientEdit
                        key={ingredient.id}
                        ingredient={ingredient}
                        handleIngredientChange={handleIngredientChange}
                        handleIngredientDelete={handleIngredientDelete}
                    />
                ))}
            </div>
            <div className="recipe-edit__add-ingredient-container">
                <button
                    className="btn btn--primary"
                    onClick={handleIngredientAdd}
                >
                    Add Ingredient
                </button>
            </div>


        </div>
    )
}
