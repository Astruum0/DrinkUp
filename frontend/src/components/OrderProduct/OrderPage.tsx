import { Link } from "react-router-dom";
import "../../styles/home.css";
import vodka from "../../assets/products/vodka.png"
import bailey from "../../assets/products/bailey.png"
import rhum from "../../assets/products/rhum.png"

function OrderPage() {
  return (
    <div className="container">
      <div className="product-preview-card">
        <img
          className="product-image-preview"
          src={rhum}
          alt="bouteille"
        ></img>
        <h1>Rhum</h1>
        <p className="description">Alcool</p>
        <Link className="btn" to="rhum">Commander</Link>
      </div>

      <div className="product-preview-card">
        <img
          className="product-image-preview"
          src={vodka}
          alt="bouteille"
        ></img>
        <h1>Vodka</h1>
        <p className="description">Alcool</p>
        <Link className="btn" to="vodka">Commander</Link>
      </div>

      <div className="product-preview-card">
        <img
          className="product-image-preview"
          src={bailey}
          alt="bouteille"
        ></img>
        <h1>Bailey</h1>
        <p className="description">Alcool</p>
        <Link className="btn" to="bailey">Commander</Link>
      </div>
    </div>
  );
}

export default OrderPage;
