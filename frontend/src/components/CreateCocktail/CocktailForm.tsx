import { useState } from "react";
import "../../styles/form.css"


interface CocktailFormData {
  title: string,
  description: string,
  ingredients: Recipe[],
}
interface Recipe {
  ingredient: string,
  quantity: string,
}

function CocktailForm() {
  const initialState: CocktailFormData = {
    title: "",
    description: "",
    ingredients: []
  };
  const emptyRecipe: Recipe = {
    ingredient: "",
    quantity: "",
  }
  const [values, setValues] = useState(initialState);
  const [newIngredient, setNewIngredient] = useState(emptyRecipe)
  const addIngredient = () => {
    values.ingredients.push(newIngredient)
    setValues(values)
    setNewIngredient(emptyRecipe)
  }
  const onChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient({ ...newIngredient, [event.target.name]: event.target.value });
  };

  const onSubmit = () => {
    console.log(values);
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div className="create-cocktail">
      <h1>Créer cocktail</h1>
      <input
          name='title'
          id='title'
          placeholder='Titre'
          onChange={onChange}
          required
          />

      <div className="add-ingredient">
        <input 
          name='ingredient'
          id='ingredient'
          placeholder='Ajouter ingrédient'
          value={newIngredient.ingredient}
          onChange={onChangeIngredient}
        />
        <input 
          name='quantity'
          id='quantity'
          placeholder='Ajouter quantité'
          value={newIngredient.quantity}
          onChange={onChangeIngredient}
        />
        <button className="btn btn-filled add-ingredient-btn" onClick={addIngredient}>+</button>
      </div>
      <div className="list-ingredients">
        
      </div>
      <textarea
          name='description'
          id='description'
          placeholder='Description'
          onChange={onChange}
          required
          />
      <button onClick={onSubmit} className="btn btn-filled create-btn">Créer</button>
    </div>
  );
}

export default CocktailForm