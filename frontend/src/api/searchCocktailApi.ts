import { ICocktail, IFullyDetailedCocktail, IIngredient } from "../models"

export const getCocktailsFromSearch = async (ingredients: IIngredient[]): Promise<{"doable": IFullyDetailedCocktail[], "partially": IFullyDetailedCocktail[]}> => {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/cocktails/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ingredients: ingredients.map((i) => i.id).filter(field => field !== "")
            })
        })

        let resJson = await res.json() as {"doable": IFullyDetailedCocktail[], "partially": IFullyDetailedCocktail[]}
        return resJson

    } catch(err) {
        console.log(err);
        throw new Error("An error occured")
    }
}