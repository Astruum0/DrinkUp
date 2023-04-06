import { useEffect, useState } from "react"
import { IFullyDetailedCocktail } from "../../models"
import { useApi } from "../../api/useApi"
import CocktailPreviewCard from "../CocktailPreviewCard"
import { deleteCocktail } from "../../api/deleteCocktail"

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
    }, [cocktailsState])

    const onDeleteCocktail = async (cocktail: IFullyDetailedCocktail) => {
        try {
            let res = await deleteCocktail(cocktail)
            if (res) {       
                setAllCocktails(allCocktails.filter(c => c.id !== cocktail.id))
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="home-container">
            <h1>Gérer les cocktails</h1>
            <div className="cocktails-list">
                {allCocktails.map((cocktail) => {
                    return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail} fullyDetailed onDelete={() => onDeleteCocktail(cocktail)}/>
                })
                }
            </div>
        </div>
    )
}

export default AdminPanel