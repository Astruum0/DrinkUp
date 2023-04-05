import { IIngredient } from "../models";

export const getAllIngredients = async (): Promise<IIngredient[] | undefined> => {
    try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/ingredients`, {method: "GET"})
        let jsonResponse = await res.json() as IIngredient[]
        return jsonResponse
    } catch(err) {
        console.log(err)
    }
}