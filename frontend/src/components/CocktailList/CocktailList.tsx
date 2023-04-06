import { useEffect, useState } from "react"
import { useApi } from "../../api/useApi"
import { IFullyDetailedCocktail } from "../../models"
import CocktailPreviewCard from "../CocktailPreviewCard"

const CocktailList = () => {
    let [trendingCocktails, setTrendingCocktails] = useState<IFullyDetailedCocktail[]>([])
    const cocktailsState = useApi(`${process.env.REACT_APP_API_URL}/cocktails/`) 
    useEffect(() => {
        if (cocktailsState.error) console.error(cocktailsState.error)
        else setTrendingCocktails(cocktailsState.data)
    })
    return (
        <div className="home-container">
            <h1>Nos cocktails</h1>
            <div className="cocktails-list">
                {trendingCocktails.map((cocktail) => {
                    return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail} fullyDetailed/>
                })
                }
            </div>
        </div>
    )
}

export default CocktailList 
