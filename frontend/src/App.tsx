import Header from "./components/Header"
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import GameGallery from "./components/GameGallery";
import useGames from "./customHooks/useGames";
import AddGame from "./components/AddGame";
import GameDetails from "./components/GameDetail";
import useUser from "./customHooks/useUser";
import {LoginPage} from "./components/LoginPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import {useEffect} from "react";


function App() {

    const {games,deleteGame, addGame, loadAllGames} = useGames();

    const { user, login, logout, isLoading } = useUser(loadAllGames);
    useEffect(() => {
        if (user) {

            loadAllGames();
        }
    }, []);

    function handleLogout() {
        return new Promise<void>((resolve) => {
            logout();
            resolve();
        });
    }

    function handleLogin(username: string, password: string) {
        return login(username, password).catch((error) => {
            console.error('An error occurred during login:', error);
        });
    }

    return (
        <BrowserRouter>
            <div className="App">
                <Header onLogout={handleLogout}/>
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>

                    <Route element={<ProtectedRoutes user={user} isLoading={isLoading} />}>
                        <Route element={<Navigate to="/games"/>}/>
                        <Route path="/games"
                               element={<GameGallery games={games}/>}/>
                        <Route path="/games/add"
                               element={<AddGame addGame={addGame}/>}/>
                        <Route path="/games/:id"
                               element={<GameDetails deleteGame={deleteGame}/>}/>
                        <Route path="/" element={<Navigate to="/games"/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;