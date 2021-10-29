import React, { useState, useEffect } from 'react';
import RecipeList from './RecipeList';
import RecipeEdit from './RecipeEdit';
import '../css/app.css';
import { uuid } from 'uuidv4'; //random ID generator

export const RecipeContext = React.createContext();
const LOCAL_STORAGE_KEY = 'cookingWithReact.recipes';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState();
  const [recipes, setRecipes] = useState(sampleRecipes);
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId);


  //fetch list of recipes from DB when app starts
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY);

    //if something is in DB, convert JSON string to JS array and set recipes in App state
    if (recipeJSON != null) setRecipes(JSON.parse(recipeJSON))

  }, []) //empty dependency array i.e. runs on app startup

  //update the recipes in the DB when they change
  useEffect(() => {
    //store the list of recipes locally in DB 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes])


  const recipeContextValue = {
    handleRecipeAdd: handleRecipeAdd,
    handleRecipeDelete: handleRecipeDelete,
    handleRecipeSelect: handleRecipeSelect,
    handleRecipeChange: handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id);
  }


  function handleRecipeAdd() {

    //create new recipe
    const newRecipe = {
      id: uuid(), //random Id generated for us
      name: '',
      servings: '',
      cookTime: '',
      instructions: '',
      ingredients: [
        { id: uuid(), name: '', amount: '' }
      ]
    }

    setSelectedRecipeId(newRecipe.id)
    //set the recipe in state
    //get all current recipes and add newRecipe to the end of array
    setRecipes([...recipes, newRecipe])
  }

  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes];//copy current recipe array so we don't change it
    const index = newRecipes.findIndex(recipe => recipe.id === id);
    newRecipes[index] = recipe; //update this recipe
    setRecipes(newRecipes);
  }


  function handleRecipeDelete(id) {

    if (selectedRecipeId != null && selectedRecipeId === id) {
      setSelectedRecipeId(undefined);
    }

    setRecipes(recipes.filter(recipe => {
      return recipe.id !== id;
    }))
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList recipes={recipes} />
      {selectedRecipe && <RecipeEdit recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  );

}



const sampleRecipes = [
  {
    id: 1,
    name: 'Plain Chicken',
    servings: 3,
    cookTime: '1:45',
    instructions: "1. Put salt on Chicken\n2. Put chicken in oven\n3. Eat chicken",
    ingredients: [
      {
        id: 1,
        name: 'Chicken',
        amount: '2 Lbs'
      },
      {
        id: 2,
        name: 'Salt',
        amount: '1 Tbs'
      },
    ]
  },
  {
    id: 2,
    name: 'Plain Pork',
    servings: 5,
    cookTime: '0:45',
    instructions: "1. Put paprika on pork\n2. Put pork in oven\n3. Eat pork",
    ingredients: [
      {
        id: 1,
        name: 'Pork',
        amount: '3 Lbs'
      },
      {
        id: 2,
        name: 'Paprika',
        amount: '2 Tbs'
      },
    ]
  }
]


export default App;
