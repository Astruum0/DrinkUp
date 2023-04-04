
  export interface ButtonInterface {
    text: string;
    type: string;
    href: string;
    filled?: boolean;
    icon?: JSX.Element;
  }
  
  export interface CardInterface {
    image?: string,
    title: string,
    subtitle?: string,
    body: any,
    btn: ButtonInterface
  }

  export interface CocktailResponse {
    cocktailData: string,
    setCocktailData: string
  }