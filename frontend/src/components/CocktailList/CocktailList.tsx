// import '../../styles/index'
import { useApi } from "../../api/useApi"
import { useState, useEffect } from "react";
import { ICocktail } from "../../models"
import CocktailPreviewCard from "../Home/CocktailPreviewCard";




function CocktailList() {
  const [cocktailData , setCocktailData] = useState<ICocktail[]>([])
  const cocktailsState = useApi(`${process.env.REACT_APP_API_URL}/cocktails`) 
  useEffect(() => {
      if (cocktailsState.error) console.error(cocktailsState.error)
      else setCocktailData(cocktailsState.data)
  })
useEffect(() => {

}, []);

  return (
    <div className="cocktails-list">
    {cocktailData.map((cocktail) => {
        return <CocktailPreviewCard key={cocktail.id} cocktail={cocktail}/>
    })
    }
</div>
  )
}

export default CocktailList;
