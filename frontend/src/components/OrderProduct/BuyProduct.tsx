import React, { useState, useEffect } from "react";
import vodka from "../../assets/products/vodka.png"
import bailey from "../../assets/products/bailey.png"
import rhum from "../../assets/products/rhum.png"

let image_dict = {
  "vodka": vodka,
  "bailey": bailey,
  "rhum": rhum
}


interface Product {
  name: "vodka" | "bailey" | "rhum",
  base_price: number,
  description: string
}

const ProductDisplay = ({name, base_price, description} :Product) => (
  <section>
    <div className="product">
      <img
        src={image_dict[name]}
        alt="product_picture"
        className="product-image-preview"
      />
      <div className="description">
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <h2>{base_price}€</h2>
      </div>
    </div>
    <form action="http://localhost:3001/ingredients/create-checkout-session" method="POST">
      <input type="number" name="qty" defaultValue={1} className="qty-input" min="1" max="100"></input><br></br><br></br>
      <input type="hidden" name="name" value={name}></input>
      <input type="hidden" name="base_price" value={base_price}></input>
      <input type="hidden" name="description" value={description}></input>
      <button className="btn btn-filled btn-checkout" type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }: any) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay name={window.location.href.split("/").slice(-1).pop() as "vodka" | "bailey" | "rhum"} base_price={15} description="Bon produit miam"/>
  );
}