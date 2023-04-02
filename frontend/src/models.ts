export interface ICocktail {
    id?: string
    name: string,
    description: string,
    ingredients: IRecipe[],
    picture: File | string |undefined,
    rating?: number
    ratingsNb?: number
}

export interface IRecipe {
    id: string,
    ingredient: string,
    quantity: string,
}
export interface IIngredient {
    id: string,
    name: string
}