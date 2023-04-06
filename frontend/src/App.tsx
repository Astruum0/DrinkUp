import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, Form, Navigate } from 'react-router-dom';
import CocktailForm from './components/CreateCocktail/CocktailForm';
import HomePage from './components/Home/HomePage';
import SearchWithIngredients from './components/SearchCocktail/SearchWithIngredients';
import OrderPage from './components/OrderProduct/OrderPage';
import BuyProduct from './components/OrderProduct/BuyProduct';
import CocktailList from './components/CocktailList/CocktailList';
// import CocktailDetail from './components/CocktailDisplay/CocktailDisplay'
import LoginForm from './components/Authentification/LoginForm';
import { useState } from 'react';
import AdminPanel from './components/Admin/AdminPanel';



function App() {

    const [token, setToken] = useState("")

    return (
        <div className="App">
            <Navbar setToken={setToken} token={token}/>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchWithIngredients />} />
                <Route path="/new" element={<CocktailForm />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/order/:product" element={<BuyProduct />} />
                <Route path="/cocktails" element={<CocktailList />} />
                <Route path="/login" element={<LoginForm setToken={setToken}/>} />
                <Route path="/admin" element={
                    token ?
                        <AdminPanel token={token} setToken={setToken}/>
                    :
                        <Navigate to={"/"} />
                } />
            </Routes>
        </div>
    )
}

export default App
