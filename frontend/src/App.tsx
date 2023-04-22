import React from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GameGallery from "./GameGallery";
import useGames from "./useGames";

function App() {

    const {games} = useGames()

    return (
        <BrowserRouter>
            <div className="App">
                <header className="App-header"/>
                <Routes>
                    <Route element={<Navigate to="/games"/>}/>
                    <Route path="/recipes"
                           element={<GameGallery games={games}/>}/>
                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
