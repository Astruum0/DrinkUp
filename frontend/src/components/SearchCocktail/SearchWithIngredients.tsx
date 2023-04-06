import { useEffect, useState } from "react"
import { useApi } from "../../api/useApi"
import { IFullyDetailedCocktail, IIngredient } from "../../models"
import "../../styles/form.css"
import "../../styles/search.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { getCocktailsFromSearch } from "../../api/searchCocktailApi"
import CocktailPreviewCard from "../CocktailPreviewCard"
import { Link } from "react-router-dom"

const SearchWithIngredients = () => {
    let allIngredients: IIngredient[] = []
    const ingredientState = useApi(`${process.env.REACT_APP_API_URL}/ingredients`)

    const [searchField, setSearchField] = useState("")
    const [listedIngredients, setListedIngredients] = useState<IIngredient[]>([])    
    const [autoCompleteIngredients, setAutoCompleteIngredients] = useState<IIngredient[]>([])
    const [showAutoComplete, setShowAutoComplete] = useState(false)
    const [doableCocktails, setDoableCocktails] = useState<IFullyDetailedCocktail[]>([])
    const [partiallyDoableCocktails, setPartiallyDoableCocktails] = useState<IFullyDetailedCocktail[]>([])

    useEffect(() => {
        if (ingredientState.error) console.error(ingredientState.error)
        else allIngredients = ingredientState.data
    })

    const updateAutoCompletion = (field: string) => {
        setAutoCompleteIngredients(allIngredients.filter(i => i.name.toLowerCase().includes(field.toLowerCase()) && !listedIngredients.map(li => li.id).includes(i.id)))
        setShowAutoComplete(true)
    }

    const onChangeIngredient = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.name == "ingredient" && event.target.value.length >= 2) {
          updateAutoCompletion(event.target.value)
        } else {
          setAutoCompleteIngredients([])
          setShowAutoComplete(false)
        }
        // const knownIngredient = allIngredients.filter(i => i.name.toLowerCase() === event.target.value.toLowerCase()).at(0)
        // if (knownIngredient) {
        //   setShowAutoComplete(false)
        // } 
        setSearchField(event.target.value)
    };

    const setIngredientFromAutoComplete = (ingredient: IIngredient) => {
        setSearchField("")
        setListedIngredients([...listedIngredients, ingredient])
        setAutoCompleteIngredients([])
        setShowAutoComplete(false)
    }

    const addIngredient = () => {
        if (searchField.trim() === '') return
        const knownIngredient = allIngredients.filter(i => i.name.toLowerCase() === searchField.toLowerCase()).at(0)
        if (knownIngredient) {
            setListedIngredients([...listedIngredients, knownIngredient])
        } else {
            setListedIngredients([...listedIngredients, {id: "", name: searchField}])
        }
        setSearchField("")
        setShowAutoComplete(false)
      }

    const deleteIngredient = (toDeleteId: string) => {  
        setListedIngredients(listedIngredients.filter(i => i.id !== toDeleteId))
    }

    const onSubmit = async () => {
        try {
          const res = await getCocktailsFromSearch(listedIngredients)
          setDoableCocktails(res.doable)
          setPartiallyDoableCocktails(res.partially)
        } catch(err) {
          console.log(err);
        }
      }

    return (<>
        <div className="search-cocktail">
            <h1>Rechercher un cocktails</h1>
            <div className="add-ingredient">
                <div className="dropdown">
                    <input 
                        name='ingredient'
                        id='ingredient'
                        type='text'
                        placeholder='Indiquez vos ingrédients'
                        className="searchbar"
                        value={searchField}
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
            <button className="btn btn-filled add-ingredient-btn" onClick={addIngredient}>+</button>
            </div>
            <div className="list-ingredients">
            { 
                listedIngredients.map((ingredient) => {
                return <div className="ingredient" key={ingredient.id}>
                    <p>{ingredient.name}</p>
                    <FontAwesomeIcon icon={faXmark} className="icon" onClick={() => deleteIngredient(ingredient.id)}/>
                    </div>
                })
            }
            </div>
            <button onClick={onSubmit} className="btn btn-filled create-btn">Trouvez votre bonheur</button>

            

            
        </div>
        <div className="search-output">
        {doableCocktails.length > 0 && <>
            <h2>Voici les cocktails que vous pouvez faire</h2>
                <div className="cocktails-list">
                {doableCocktails.map((cocktail) => {
                    return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail} fullyDetailed ownedIngredients={listedIngredients}/>
                })
            }
            </div></>
            }
            {partiallyDoableCocktails.length > 0 && <>
                <div className="cocktails-list-header">
                    <h2>Essayez ces cocktails</h2>
                    <Link to="../order" className="filled-link">Commandez ce qui vous manque {'>'}</Link>
                </div>
                <div className="cocktails-list">
                {partiallyDoableCocktails.map((cocktail) => {
                    return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail} fullyDetailed ownedIngredients={listedIngredients}/>
                })
            }
            </div></>
            }
        
        </div>
    </>
    )
}

export default SearchWithIngredients