import "../../App.css";
import React from "react";
import { useApi } from "../../api/useApi";
import { useState, useEffect } from "react";
import { IFullyDetailedCocktail } from "../../models";
import { useParams } from "react-router-dom";

function CocktailDetail({ cocktail }: { cocktail: IFullyDetailedCocktail }) {
  var cocktailId = useParams();
  return (
    <>
      {cocktail.id === cocktailId.id ? (
        <div>
          {cocktail.name}
          {cocktail.description}
        </div>
      ) : (
        <div></div>
      )}
      {/* {console.log(cocktailId)} */}
    </>
  );
}

export default CocktailDetail;
