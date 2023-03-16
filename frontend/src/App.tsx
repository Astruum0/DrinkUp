import React from 'react'
import './App.css'
import DenseAppBar from './components/Navbar/Navbar'
import SwipeableTextMobileStepper from './components/Carousel/Carousel'
function App() {
    return (
        <div className="App">
            <DenseAppBar />
            <SwipeableTextMobileStepper />
            <p>oui</p>
        </div>
    )
}

export default App
