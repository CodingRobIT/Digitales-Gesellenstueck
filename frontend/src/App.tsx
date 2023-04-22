import React from 'react';
import Header from "./Header"
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GameGallery from "./GameGallery";
import useGames from "./useGames";

function App() {

    const {games} = useGames()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route element={<Navigate to="/games"/>}/>
                    <Route path="/games"
                           element={<GameGallery games={games}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
