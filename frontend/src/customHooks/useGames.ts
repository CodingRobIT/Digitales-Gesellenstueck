import {useState} from "react";
import axios from "axios";
import {Game, NewGame} from "../model/Game"
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function useGames() {

    const [games , setGames] = useState<Game[]>([]);
    const [searchTerm] = useState('');
    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const loadAllGames = async () => {
        axios.get("/api/games")
            .then((getAllGamesResponse) => {
                setGames(getAllGamesResponse.data)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    async function addGame(newGame: NewGame) {
        try {
            await axios.post('/api/games', newGame);
            setGames(games.filter(() => newGame));
            await loadAllGames();
            toast.success('Game wurde erfolgreich hinzugefügt!');
        } catch (error) {
            console.error('POST auf /api/games nicht erfolgreich!!!', error);
            toast.error('Es gab ein Problem beim Hinzufügen des Spiels!');
        }
    }

    function deleteGame(id: string) {
        axios.delete('/api/games/' + id)
            .then(() => {
                setGames(games.filter((game ) => game.id !== id))
                toast.success("Game wurde erfolgreich gelöscht")
            })
            .catch((error) => {
            console.error(error)
        })
    }

    return {games: filteredGames, searchTerm, addGame , deleteGame, loadAllGames}

}