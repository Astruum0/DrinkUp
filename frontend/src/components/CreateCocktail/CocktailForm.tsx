import { useEffect, useState } from "react";
import "../../styles/form.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface CocktailFormData {
  title: string,
  description: string,
  ingredients: Recipe[],
  picture: File | undefined,
}
interface Recipe {
  ingredient: string,
  quantity: string,
}

function CocktailForm() {
  const initialState: CocktailFormData = {
    title: "",
    description: "",
    ingredients: [],
    picture: undefined
  };
  const emptyRecipe: Recipe = {
    ingredient: "",
    quantity: "",
  }
  const [values, setValues] = useState(initialState);
  const [newIngredient, setNewIngredient] = useState(emptyRecipe)
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (image) setImageUrl(URL.createObjectURL(image))
  }, [image])

  const addIngredient = () => {
    if (newIngredient.ingredient.trim() === '') return
    values.ingredients.push(newIngredient)
    setValues(values)
    setNewIngredient(emptyRecipe)
  }
  const onChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewIngredient({ ...newIngredient, [event.target.name]: event.target.value });
  };
  const deleteIngredient = (index: number) => {  
    setValues({...values, ingredients: values.ingredients.filter((_, i) => i !== index)})
  }

  const onSubmit = () => {
    console.log(values);
  }
  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files?.length > 0) {
      setImage(event.target.files?.item(0) as File)
      setValues({...values, picture: event.target.files?.item(0) as File})
    }
  }

  return (
    <div className="create-cocktail">
      <h1>Créer un cocktail</h1>
      <input
          name='title'
          id='title'
          type='text'
          placeholder='Titre'
          onChange={onChange}
          required
          />

      <div className="add-ingredient">
        <input 
          name='ingredient'
          id='ingredient'
          type='text'
          placeholder='Ajouter ingrédient'
          value={newIngredient.ingredient}
          onChange={onChangeIngredient}
        />
        <input 
          name='quantity'
          id='quantity'
          type='text'
          placeholder='Ajouter quantité'
          value={newIngredient.quantity}
          onChange={onChangeIngredient}
        />
        <button className="btn btn-filled add-ingredient-btn" onClick={addIngredient}>+</button>
      </div>
      <div className="list-ingredients">
        { 
          values.ingredients.map((recipe, i) => {
            return <div className="ingredient" key={`${recipe.ingredient}-${recipe.quantity}`}>
              <p>{recipe.quantity} {recipe.ingredient}</p>
              <FontAwesomeIcon icon={faXmark} className="icon" onClick={() => deleteIngredient(i)}/>
              </div>
          })
        }
      </div>
      <textarea
          name='description'
          id='description'
          placeholder='Description'
          onChange={onChange}
          required
          />
      <label htmlFor="file" className="btn image-input">Ajouter une image</label>
      <input type="file" accept="image/*" id="file" onChange={onImageChange}/>
      {imageUrl && <img className="cocktail-image" src={imageUrl}/>}
      <button onClick={onSubmit} className="btn btn-filled create-btn">Créer</button>
    </div>
  );
}

export default CocktailForm