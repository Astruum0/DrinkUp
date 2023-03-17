import cocktail1 from "../../assets/homeCocktails/mojito.png"
import cocktail2 from "../../assets/homeCocktails/cubalibre.jpg"
import cocktail3 from "../../assets/homeCocktails/moscowmule.jpg"
import { useEffect, useState } from "react"

function CocktailsCarousel() {
    const [currentCocktail, setCurrentCocktail] = useState(0)
    useEffect(() => {
        setInterval(() => {
            setCurrentCocktail((currentCocktail + 1) % 3)
        }, 3000)
    })



    return (
        <div className="carousel">
            <img className={currentCocktail === 0 ? "current" : "not-current"} src={cocktail1} alt="Mojito"/>
            <img className={currentCocktail === 1 ? "current" : "not-current"} src={cocktail2} alt="CubaLibre"/>
            <img className={currentCocktail === 2 ? "current" : "not-current"} src={cocktail3} alt="MoscowMule"/>
        </div>
    )
}

export default CocktailsCarousel