import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ICocktail, IFullyDetailedCocktail, IIngredient } from "../models"
import "../styles/home.css"
import "../styles/cocktailCard.css"
import { faCheck, faStar as faSolidStar, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faStar as faRegularStar, faStarHalfStroke} from "@fortawesome/free-regular-svg-icons"

interface CocktailPreviewCardProps {
    cocktail: IFullyDetailedCocktail, 
    fullyDetailed?: boolean, 
    ownedIngredients?: IIngredient[]
    onDelete?: any,
}

const CocktailPreviewCard = ({cocktail, fullyDetailed, ownedIngredients, onDelete}: CocktailPreviewCardProps) => {
    const { rating, ratingsNb } = cocktail
    const average = (rating && ratingsNb && ratingsNb > 0) ? (rating / ratingsNb) / 2 : undefined

    let starsDisplay = {
        full: 0,
        half: false,
        empty: 0,
    }
    if (average) {
        starsDisplay.full = Math.floor(average)
        starsDisplay.half = (average % 1) >= 0.5
        starsDisplay.empty = 5 - starsDisplay.full - Number(starsDisplay.half)
    }    

    return (
        <div className="cocktail-preview-card">
            <img className="cocktail-image-preview" src={`${process.env.REACT_APP_API_URL}/images/get?id=${cocktail.picture}`}></img>
            <h3>{cocktail.name}</h3>
            {fullyDetailed && <>
                <ul className="recipe">
                {
                    cocktail.ingredients.filter(r => ownedIngredients?.map(i => i.id).includes(r.ingredient.id)).map(r => {
                        return <li key={r.ingredient.id} className="owned">– {r.ingredient.name} {r.quantity ? `(${r.quantity})` : ""} <FontAwesomeIcon icon={faCheck}/></li>
                    })
                }
                {
                    cocktail.ingredients.filter(r => !ownedIngredients?.map(i => i.id).includes(r.ingredient.id)).map(r => {
                        return <li key={r.ingredient.id}>– {r.ingredient.name} {r.quantity ? `(${r.quantity})` : ""}</li>
                    })
                }
                <p className="description">{cocktail.description ? cocktail.description : "Aucune description"}</p>
            </ul>
                </>
            }

            <div className="card-footer">
                <div className="rating">
                    {
                    average ? 
                    <>
                        <p>{average.toFixed(1)}</p>
                        {[...Array(starsDisplay.full)].map((_, i) => {
                            return <FontAwesomeIcon key={i} icon={faSolidStar}/>
                        })}
                        {starsDisplay.half ? <FontAwesomeIcon icon={faStarHalfStroke}/> : <></>}
                        {[...Array(starsDisplay.empty)].map((_, i) => {
                            return <FontAwesomeIcon key={i+10} icon={faRegularStar}/>
                        })}
                        <span>({cocktail.ratingsNb})</span>
                    </> 
                    : <span>Aucune notes</span>
                    }
                </div>
                {onDelete && <button className="btn btn-error" onClick={onDelete}>Supprimer <FontAwesomeIcon icon={faTrash}/> </button>}
            </div>
        </div>
    )
}

export default CocktailPreviewCard