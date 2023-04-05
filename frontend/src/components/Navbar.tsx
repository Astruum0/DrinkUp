import "../styles/navbar.css"
import logo from "../assets/drinkupLogo.png"
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation()
  return (
    <div className="navbar">
      <div className="logo"><Link to=""><img src={logo} alt="DrinkUp" draggable="false"/></Link></div>
        <Link to="" className={location.pathname === "/" ? "selected" : ""}>Accueil</Link>
        <Link to="search" className={location.pathname === "/search" ? "selected" : ""}>Rechercher</Link>
        <Link to="cocktails" className={location.pathname === "/cocktail" ? "selected" : ""}>Les cocktails</Link>
        <Link to="order" className={location.pathname === "/order" ? "selected" : ""}>Commander</Link>
        {/* <Link to="" className="btn">Connexion</Link> */}
    </div>
  )
}

export default Navbar;
