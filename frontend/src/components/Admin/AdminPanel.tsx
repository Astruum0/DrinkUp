import { useEffect, useState } from "react"
import { IFullyDetailedCocktail } from "../../models"
import { useApi } from "../../api/useApi"
import CocktailPreviewCard from "../Home/CocktailPreviewCard"

interface NavbarProps {
    token: string,
    setToken: (name: string) => void
  }

const AdminPanel = ({token, setToken}:NavbarProps) => {
    let [allCocktails, setAllCocktails] = useState<IFullyDetailedCocktail[]>([])
    const cocktailsState = useApi(`${process.env.REACT_APP_API_URL}/cocktails`) 
    useEffect(() => {
        if (cocktailsState.error) console.error(cocktailsState.error)
        else setAllCocktails(cocktailsState.data)
    })
  return (
    <div>
        <h1>Gérer les cocktails</h1>
        <div className="cocktails-list">
            {allCocktails.map((cocktail) => {
                return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail} fullyDetailed/>
            })
            }
        </div>
    </div>
  )
}

export default AdminPanel