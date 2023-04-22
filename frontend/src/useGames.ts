import {useEffect, useState} from "react";
import axios from "axios";
import {Game} from "./Game"
export default function useGames() {

    const [games , setGames] = useState<Game[]>([])
    const [searchTerm , setSearchTerm] = useState('');

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
    const filteredGames = games.filter((game) => game.titel.toLowerCase().includes(searchTerm.toLowerCase()));

    return {games: filteredGames, searchTerm}

}