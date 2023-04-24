import React from 'react';
import Header from "./Header"
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GameGallery from "./GameGallery";
import useGames from "./useGames";
import AddGame from "./AddGame";
import GameDetails from "./GameDetail";

function App() {

    const {games , addGame, deleteGame} = useGames()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route element={<Navigate to="/games"/>}/>
                    <Route path="/games"
                           element={<GameGallery games={games}/>}/>
                    <Route path="/games/add"
                    element={<AddGame addGame={addGame}/>}/>
                    <Route path="/games/:id"
                           element={<GameDetails deleteGame={deleteGame}/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;