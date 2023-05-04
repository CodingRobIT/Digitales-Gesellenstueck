import React from 'react';
import Header from "./Header"
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GameGallery from "./components/GameGallery";
import useGames from "./customHooks/useGames";
import AddGame from "./AddGame";
import GameDetails from "./GameDetail";
import LoginPage from "./LoginPage";
import useUser from "./customHooks/useUser";
import ProtectedRoutes from "./ProtectedRoutes";

function App() {

    const {user, login} = useUser()
    const {games, addGame, deleteGame} = useGames()

    return (
        <BrowserRouter>
            <div className="App">
                <Header/>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={login}/>}/>

                    <Route element={<ProtectedRoutes user={user}/>}>
                        <Route element={<Navigate to="/games"/>}/>
                        <Route path="/games"
                               element={<GameGallery games={games}/>}/>
                        <Route path="/games/add"
                               element={<AddGame addGame={addGame}/>}/>
                        <Route path="/games/:id"
                               element={<GameDetails deleteGame={deleteGame}/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;