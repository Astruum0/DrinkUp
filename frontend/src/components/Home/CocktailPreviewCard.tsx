import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ICocktail } from "../../models"
import "../../styles/home.css"
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons"
import { faStar as faRegularStar, faStarHalfStroke} from "@fortawesome/free-regular-svg-icons"


const CocktailPreviewCard = ({cocktail}: {cocktail: ICocktail}) => {
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
            <img className="cocktail-image-preview" src={`${process.env.REACT_APP_API_URL}/images/get?id=${cocktail.id}`}></img>
            <h3>{cocktail.name}</h3>
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
                    </> 
                    : <span>No rating</span>
                    }
                </div>
                <button className="btn btn-filled">Détails</button>
            </div>
        </div>
    )
}

export default CocktailPreviewCard