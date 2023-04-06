import "../../App.css";
import "../../styles/cocktailDetail.css";
import React from "react";
import { useApi } from "../../api/useApi";
import { useState, useEffect } from "react";
import { IFullyDetailedCocktail, IIngredient } from "../../models";
import { useParams } from "react-router-dom";
import {
  faCheck,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faRegularStar,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CocktailDetail({
  cocktail,
  ownedIngredients,
}: {
  cocktail: IFullyDetailedCocktail;
  ownedIngredients?: IIngredient[];
}) {
  var cocktailId = useParams();
  return (
    <>
      {cocktail.id === cocktailId.id ? (
        <div className="mainDetail">
          <h1>{cocktail.name}</h1>
          <img
            className="cocktail-image-detail"
            src={`${process.env.REACT_APP_API_URL}/images/get?id=${cocktail.picture}`}
          ></img>
          <div className="cocktail-data">
            <p>{cocktail.description}</p> <br />
          </div>
          <h1>Ingredient</h1>
          <ul>
            {cocktail.ingredients.map((test, i) => {
              return <li>{test.ingredient.name}</li>;
            })}
          </ul>
          <h1>Notes :</h1>
          {cocktail.rating} / 5
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default CocktailDetail;
