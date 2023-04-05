import { Link } from "react-router-dom"
import "../../styles/home.css"
import CocktailsCarousel from "./CocktailsCarousel"
import TrendingCocktails from "./TrendingCocktails"

function HomePage() {
  return (
    <div className="home-container">
      <div className="banner">
        <div className="text-pannel">
          <h1>Révélez le barman qui est en vous</h1>
          <p>Votre frigo et votre armoire à alcool cachent bien plus de cocktails que vous ne le pensez</p>
          <a href="search" className="btn btn-filled">Découvrez le votre</a>
        </div>
        <CocktailsCarousel />
      </div>
      <div className="cocktails-list-header">
        <h2>Cocktails les plus populaires</h2>
        <Link to={"cocktails"} className="filled-link">Voir tout {'>'}</Link>
      </div>
      <TrendingCocktails />
    </div>
  )
}

export default HomePage