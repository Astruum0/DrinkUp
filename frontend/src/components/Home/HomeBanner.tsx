import "../../styles/home.css"
import CocktailsCarousel from "./CocktailsCarousel"

function HomeBanner() {
  return (
    <div className="banner">
      <div className="text-pannel">
        <h1>Révélez le barman qui est en vous</h1>
        <p>Votre frigo et votre armoire à alcool cachent bien plus de cocktails que vous ne le pensez</p>
        <a href="tamere" className="btn btn-filled">Découvrez nos centaines de cocktails</a>
      </div>
      <CocktailsCarousel />
    </div>
  )
}

export default HomeBanner