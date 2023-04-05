export interface ICocktail {
    id?: string
    name: string,
    description: string,
    ingredients: IRecipe[],
    picture: File | string |undefined,
    rating?: number
    ratingsNb?: number
}

export interface IFullyDetailedCocktail {
    id?: string
    name: string,
    description: string,
    ingredients: {
        id: string,
        ingredient: {
            id: string,
            name: string
        },
        quantity: string,
    }[],
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