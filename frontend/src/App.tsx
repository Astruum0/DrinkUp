import './App.css'
import HomeBanner from './components/Home/HomeBanner'
import Navbar from './components/Navbar/Navbar'
import CocktailList from './Pages/CocktailList'

import Card from './components/Card/Card';
import ArticleIcon from '@mui/icons-material/Send'
import CameraAltIcon from '@mui/icons-material/Send'
import SendIcon from '@mui/icons-material/Send'


function App() {
    return (
        <div className="App">
            <Navbar />
            <HomeBanner />
        </div>
    )
}

export default App