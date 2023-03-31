export interface ICocktail {
    title: string,
    description: string,
    ingredients: IRecipe[],
    picture: File | undefined,
}

export interface IRecipe {
    ingredient: string,
    quantity: string,
}