import "../styles/navbar.css"
import logo from "../assets/drinkupLogo.png"

function Navbar() {
  return (
    <div className="navbar">
        <div className="logo">
            <img src={logo} alt="DrinkUp" draggable="false"/>
        </div>
        <a href="tamere" className="selected">Accueil</a>
        <a href="tamere">Les cocktails</a>
        <a href="tamere">Commander</a>
        <a href="tamere" className="btn">Connexion</a>
    </div>
  )
}

export default Navbar;
