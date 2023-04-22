import {useEffect, useState} from "react";
import axios from "axios";
import {Game} from "./Game"
export default function useGames() {

    const [games , setGames] = useState<Game[]>([])

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

}