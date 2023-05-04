import React from 'react';
import Header from "./components/Header"
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GameGallery from "./components/GameGallery";
import useGames from "./customHooks/useGames";
import AddGame from "./components/AddGame";
import GameDetails from "./components/GameDetail";
import useUser from "./customHooks/useUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import LoginPage from "./components/LoginPage";

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
                        <Route path="/"/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;