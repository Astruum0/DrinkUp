import { log } from "console";
import { ICocktail } from "../models";

export const createCocktail = async (cocktail: ICocktail) => {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/cocktails/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                name: cocktail.title,
                cocktailIngredients: cocktail.ingredients,
                description: cocktail.description
            })
        })
        let resJson = await res.json()
        const cocktailId = resJson["id"]
        if (!cocktailId) throw new Error("An error occured while creating the cocktail")
        if (cocktail.picture) {
            const fileExt = cocktail.picture.name.split(".").at(-1)

            const formData = new FormData();
            formData.append("file", cocktail.picture, `${cocktailId}.${fileExt}` )
            await fetch(`${process.env.REACT_APP_API_URL}/cocktails/upload`, {
                method: "POST",
                body: formData
            })
        }

        return res
    } catch(err) {
        console.log(err);
        throw new Error("An error occured")
    }
}