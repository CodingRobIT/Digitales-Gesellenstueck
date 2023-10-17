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
import {SignUpPage} from "./components/SignUpPage";
import UserDetails from "./components/UserDetails";


function App() {

    const {games,deleteGame, addGame, loadAllGames} = useGames();
    const { user, login, logout, isLoading, createUser } = useUser();

    useEffect(() => {
        if (user) {
            loadAllGames();
        }
        //eslint-disable-next-line
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
                {/*This line displays the header only after successful login*/}
                {window.location.pathname !== '/login' && window.location.pathname !== '/signup' && <Header onLogout={handleLogout} />}
                {/*This line always displays the header*/}
                {/*<Header onLogout={handleLogout}/>*/}
                <Routes>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin}/>}/>
                    <Route path="/signup" element={<SignUpPage createUser={createUser}/>}/>

                    <Route element={<ProtectedRoutes user={user} isLoading={isLoading} />}>
                        <Route path="/games"
                               element={<GameGallery games={games}/>}/>
                        <Route path="/games/add"
                               element={<AddGame addGame={addGame}/>}/>
                        <Route path="/games/:id"
                               element={<GameDetails deleteGame={deleteGame}/>}/>
                        <Route path="/" element={<Navigate to="/games"/>}/>
                        <Route path="/user/me"
                            element={<UserDetails/>} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;