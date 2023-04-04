import { useEffect, useState } from "react";
import "../../styles/form.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { ICocktail, IIngredient, IRecipe } from "../../models";
import { createCocktail } from "../../api/createCocktail";
import { getAllIngredients } from "../../api/getAllIngredients";
import { useApi } from "../../api/useApi";

function CocktailForm() {
  let allIngredients: IIngredient[] = []

  const initialState: ICocktail = {
    name: "",
    description: "",
    ingredients: [],
    picture: undefined
  };
  const emptyRecipe: IRecipe = {
    id: "",
    ingredient: "",
    quantity: "",
  }
  const [values, setValues] = useState(initialState);
  const [newIngredient, setNewIngredient] = useState(emptyRecipe)
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [autoCompleteIngredients, setAutoCompleteIngredients] = useState<IIngredient[]>([])
  const [showAutoComplete, setShowAutoComplete] = useState(false)
  const ingredientState = useApi(`${process.env.REACT_APP_API_URL}/ingredients`)

  useEffect(() => {
    if (image) setImageUrl(URL.createObjectURL(image))
  }, [image])

  useEffect(() => {
    if (ingredientState.error) console.error(ingredientState.error)
    else allIngredients = ingredientState.data
  })

  const updateAutoCompletion = (field: string) => {
    setAutoCompleteIngredients(allIngredients.filter(i => i.name.toLowerCase().includes(field.toLowerCase())))
    setShowAutoComplete(true)
  }

  const addIngredient = () => {
    if (newIngredient.ingredient.trim() === '') return
    values.ingredients.push(newIngredient)
    setValues(values)
    setNewIngredient(emptyRecipe)
  }
  const onChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.name == "ingredient" && event.target.value.length >= 2) {
      updateAutoCompletion(event.target.value)
    } else {
      setAutoCompleteIngredients([])
      setShowAutoComplete(false)
    }
    const knownIngredient = allIngredients.filter(i => i.name.toLowerCase() === event.target.value.toLowerCase()).at(0)
    if (knownIngredient) {
      setShowAutoComplete(false)
      setNewIngredient({
        ...newIngredient,
        id: knownIngredient.id,
        ingredient: knownIngredient.name
      })
    } else {
      setNewIngredient({ ...newIngredient, [event.target.name]: event.target.value });
    }

  };
  const setIngredientFromAutoComplete = (ingredient: IIngredient) => {
    setNewIngredient({
      ...newIngredient,
      id: ingredient.id,
      ingredient: ingredient.name
    })
    setAutoCompleteIngredients([])
    setShowAutoComplete(false)
  }
  const deleteIngredient = (index: number) => {  
    setValues({...values, ingredients: values.ingredients.filter((_, i) => i !== index)})
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

  const onSubmit = () => {
    console.log(values);
    
    try {
      const res = createCocktail(values)
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="create-cocktail">
      <h1>Créer un cocktail</h1>
      <input
          name='name'
          id='name'
          type='text'
          placeholder='Titre'
          onChange={onChange}
          required
          />
      <div className="add-ingredient">
        <div className="dropdown">
          <input 
            name='ingredient'
            id='ingredient'
            type='text'
            placeholder='Ajouter ingrédient'
            value={newIngredient.ingredient}
            onChange={onChangeIngredient}
            onFocus={() => setShowAutoComplete(true)}
          />
          <div className="dropdown-options">
            { showAutoComplete && autoCompleteIngredients.map((ingredient, i) => {
                return <div key={`${ingredient.name}-${i}`} onClick={() => setIngredientFromAutoComplete(ingredient)}>{ingredient.name}</div>
              })
            }
          </div>
        </div>
        
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