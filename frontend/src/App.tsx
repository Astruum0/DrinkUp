import ArticleIcon from '@mui/icons-material/Send'
import CameraAltIcon from '@mui/icons-material/Send'
import SendIcon from '@mui/icons-material/Send'
import './App.css'

import Card from './components/Card/Card'

function App() {

  return (
    <div className="App">
      <section className="card-container">
        <Card
          body='Cocktail de boisson alcoolisé pour pa'
          title='Negroni'
          image='https://source.unsplash.com/random'
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
        <Card
          body='Slurpy cocktaily.'
          title='Vodka Pomme'
          image='https://source.unsplash.com/random/500X400'
          badge={{
            text: "Classique incontournable",
            filled: false,
          }}
          indicator="New"
          subtitle='Get your photo now'
          btn={{
            text: "Voir plus",
            href: '#',
            type: 'secondary',
            filled: true,
            icon: <CameraAltIcon />
          }} />
      </section>
    </div>
  )
}

export default App