import "../styles/navbar.css"
import logo from "../assets/drinkupLogo.png"
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="logo"><Link to=""><img src={logo} alt="DrinkUp" draggable="false"/></Link></div>
        <Link to="" className="selected">Accueil</Link>
        <Link to="/cocktails">Les cocktails</Link>
        <Link to="">Commander</Link>
        <Link to="" className="btn">Connexion</Link>
    </div>
  )
}

export default Navbar;
