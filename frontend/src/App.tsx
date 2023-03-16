import React, { useState, useEffect } from "react";
import "./App.css";

interface Product {
  name: string,
  base_price: number,
  description: string
}

const ProductDisplay = ({name, base_price, description} :Product) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>{name}</h3>
      <h5>{base_price}€</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <input type="number" name="qty" defaultValue={1} min="1" max="100"></input>
      <input type="hidden" name="name" value={name}></input>
      <input type="hidden" name="base_price" value={base_price}></input>
      <input type="hidden" name="description" value={description}></input>
      <button type="submit">Checkout</button>
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
    <ProductDisplay name="dseggzerg" base_price={100} description="Bon produit miam"/>
  );
}