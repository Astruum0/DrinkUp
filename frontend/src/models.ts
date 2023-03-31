export interface ICocktail {
    title: string,
    description: string,
    ingredients: IRecipe[],
    picture: File | undefined,
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