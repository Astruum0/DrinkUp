import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import CocktailForm from './components/CreateCocktail/CocktailForm';
import HomePage from './components/Home/HomePage';
import SearchWithIngredients from './components/SearchCocktail/SearchWithIngredients';
import CocktailList from './components/CocktailList/CocktailList';


function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchWithIngredients />} />
                <Route path="/new" element={<CocktailForm />} />
                <Route path="/cocktail" element={<CocktailList/>}/>
            </Routes>
        </div>
    )
}

export default App
