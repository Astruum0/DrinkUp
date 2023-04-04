// import '../../styles/index'
import axios from 'axios'

import Card from "../Card/Card/Card";
import { useState, useEffect } from "react";
import { CocktailResponse } from "../Card/types"


const API = "http://localhost:3001/cocktails";


function CocktailList() {
  const [cocktailData , setCocktailData] = useState<any>("");
useEffect(() => {
  getCocktail();
}, []);

const getCocktail = async () => {
  const response = await axios.get(API);
  setCocktailData(response.data);
  console.log(response.data)


};
function test(){
  for (let i =0 ; i < cocktailData.lentght; i++){
    <Card
    body={cocktailData.description}
    title={cocktailData.name}
    image='https://source.unsplash.com/random'
    btn={{
      text: "Read Post",
      href: '#',
      type: 'primary',
      filled: true,
    }} />
  }
}


  return (
    <div className="main">
        <div>{this.test()}</div>
    </div>
  )
}

export default CocktailList;
