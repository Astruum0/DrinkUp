import "../../styles/home.css"

function OrderPage() {
  return (
    <div className="cocktail-preview-card">
    <img className="cocktail-image-preview" src=""></img>
    <h3>Rhum</h3>
        <p className="description">description</p>
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
    </ul>

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
        {/* <button className="btn btn-filled">Détails</button> */}
    </div>
</div>
  )
}

export default OrderPage