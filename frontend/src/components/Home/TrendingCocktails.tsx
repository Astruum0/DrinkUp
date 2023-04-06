import { useEffect, useState } from "react"
import { useApi } from "../../api/useApi"
import { IFullyDetailedCocktail } from "../../models"
import CocktailPreviewCard from "../CocktailPreviewCard"

const TrendingCocktails = () => {
    let [trendingCocktails, setTrendingCocktails] = useState<IFullyDetailedCocktail[]>([])
    const cocktailsState = useApi(`${process.env.REACT_APP_API_URL}/cocktails/trending`) 
    useEffect(() => {
        if (cocktailsState.error) console.error(cocktailsState.error)
        else setTrendingCocktails(cocktailsState.data)
    })
    return (
        <div className="cocktails-list">
            {trendingCocktails.slice(0, 6).map((cocktail) => {
                return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail}/>
            })
            }
        </div>
    )
}

export default TrendingCocktails