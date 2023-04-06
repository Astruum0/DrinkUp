import { ICocktail, IFullyDetailedCocktail } from "../models";

export const deleteCocktail = async (cocktail: IFullyDetailedCocktail) => {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/cocktails/${cocktail.id}`, {
            method: "DELETE",
        })
        let resJson = await res.json()
        if (resJson['acknowledged']) {
            return true
        } else {
            console.log(resJson);
            return false
        }
        

    } catch(err) {
        console.log(err);
        throw new Error("An error occured")
    }
}