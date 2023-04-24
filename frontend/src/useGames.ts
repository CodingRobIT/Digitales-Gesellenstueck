import {useEffect, useState} from "react";
import axios from "axios";
import {Game, NewGame} from "./Game"
export default function useGames() {

    const [games , setGames] = useState<Game[]>([])
    const [searchTerm , setSearchTerm] = useState('');
    const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchTerm.toLowerCase()));

    useEffect(() => {
        loadAllGames()
    }, [])
    function loadAllGames() {
        axios.get("/api/games")
            .then((getAllGamesResponse) => {
                setGames(getAllGamesResponse.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    function  addGame(newGame: NewGame) {
        axios.post("/api/games", newGame)
            .then(() => loadAllGames())
            .catch(() => console.error("post on /api/games not successful!!!"))
    }

    return {games: filteredGames, searchTerm, addGame}

}