import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Form } from 'react-router-dom';
import CocktailForm from './components/CreateCocktail/CocktailForm';
import HomePage from './components/Home/HomePage';
import CocktailList from './components/CocktailList/CocktailList';


function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/new" element={<CocktailForm />} />
                <Route path="/cocktails" element={<CocktailList/>} />
            </Routes>
        </div>
    )
}

export default App
