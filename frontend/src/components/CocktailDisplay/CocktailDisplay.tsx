// import "../../App.css";
import { useApi } from "../../api/useApi";
import { useState, useEffect } from "react";
import { ICocktail, IFullyDetailedCocktail } from "../../models";
import CocktailDetail from "../CocktailDetail/CocktailDetail";

function CocktailDisplay() {
  let [trendingCocktails, setTrendingCocktails] = useState<
    IFullyDetailedCocktail[]
  >([]);
  const cocktailsState = useApi(`${process.env.REACT_APP_API_URL}/cocktails/`);
  useEffect(() => {
    if (cocktailsState.error) console.error(cocktailsState.error);
    else setTrendingCocktails(cocktailsState.data);
  });

  trendingCocktails.filter((cocktails) => {
    return cocktails.id;
  });
  return (
    <div className="cocktails-detail">
      {trendingCocktails.map((cocktail) => {
        return <CocktailDetail key={cocktail.id} cocktail={cocktail} />;
      })}
    </div>
  );
}

export default CocktailDisplay;
