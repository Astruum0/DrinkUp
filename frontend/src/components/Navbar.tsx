import "../styles/navbar.css";
import logo from "../assets/drinkupLogo.png";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  token: string;
  setToken: (name: string) => void;
}

function Navbar({ token, setToken }: NavbarProps) {
  const location = useLocation();
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="">
          <img src={logo} alt="DrinkUp" draggable="false" />
        </Link>
      </div>
      <Link to="" className={location.pathname === "/" ? "selected" : ""}>
        Accueil
      </Link>
      <Link
        to="search"
        className={location.pathname === "/search" ? "selected" : ""}
      >
        Rechercher
      </Link>
      <Link
        to="cocktails"
        className={location.pathname === "/cocktails" ? "selected" : ""}
      >
        Les cocktails
      </Link>
      <Link
        to="order"
        className={location.pathname === "/order" ? "selected" : ""}
      >
        Commander
      </Link>
      <Link to="new" className={location.pathname === "/new" ? "selected" : ""}>
        Créer
      </Link>
      <Link to="new" className={location.pathname === "/new" ? "selected" : ""}>
        Créer
      </Link>
      {token ? (
        <Link to="admin" className="btn">
          Admin
        </Link>
      ) : (
        <Link to="login" className="btn">
          Connexion
        </Link>
      )}
      {token ? (
        <button className="btn" onClick={() => setToken("")}>
          Deconnexion
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
