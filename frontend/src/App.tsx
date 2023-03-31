import './App.css'
import HomeBanner from './components/Home/HomeBanner'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import CocktailForm from './components/CreateCocktail/CocktailForm';


function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomeBanner />} />
                <Route path="/new" element={<CocktailForm />} />
            </Routes>
        </div>
    )
}

export default App
