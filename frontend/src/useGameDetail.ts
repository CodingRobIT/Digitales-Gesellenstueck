import {useEffect, useState} from "react";
import {Game} from "./Game";
import axios from "axios";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";


export default function useGameDetail() {
    const [game, setGame] = useState<Game>();
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if (id) {
            loadGameById(id);
        }
        //eslint-disable-next-line
    },[]);

    function loadGameById(id: string) {
        axios
            .get("/api/games/" + id)
            .then((response) => {
                setGame(response.data)
            })
            .catch((error) => {
                toast.error("Game dose not exist");
            });
    }

    return {game}
}