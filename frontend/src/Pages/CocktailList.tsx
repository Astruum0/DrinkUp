import React from 'react';
import Card from '../components/Card/Card';
import Navbar from '../components/Navbar/Navbar';
import ArticleIcon from '@mui/icons-material/Send'
import CameraAltIcon from '@mui/icons-material/Send'


function CocktailList() {
    return (
            <div className="App">
      <Navbar/>
      <section className="card-container">
        <Card
          body='Cocktail de boisson alcoolisé pour pa'
          title='Negroni'
          image='https://source.unsplash.com/random/500X400'
          badge={{
            text: "Nouveau Cocktail",
            filled: false,
          }}
          indicator="New"
          btn={{
            text: "Voir plus",
            href: '#',
            type: 'primary',
            filled: true,
            icon: <ArticleIcon />
          }} />
      </section>
    </div>
    );
}

export default CocktailList;