import React, {useEffect, useState} from "react";
import {Game} from "../model/Game";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate, useParams} from "react-router-dom";
import useGames from "./useGames";

export default function useGameDetail() {

    const navigate = useNavigate();
    const {loadAllGames} = useGames()
    const [games , setGames] = useState<Game[]>([])
    const [game, setGame] = useState<Game>();
    const {id} = useParams<{ id: string }>();
    const [editing, setEditing] = useState(false);
    const [editedGame, setEditedGame] = useState<Game>({
        id: "",
        title: "",
        publisher: "",
        genre: "",
        note: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (id) {
            loadGameById(id);
        }
        //eslint-disable-next-line
    }, []);

    function loadGameById(id: string) {
        axios
            .get("/api/games/" + id)
            .then((response) => {
                setGame(response.data);
                setEditedGame(response.data);
            })
            .catch(() => {
                toast.error("Spiel existiert nicht");
            });
    }

    function editOnClick() {
        setEditing(true);
    }

    function gameInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setEditedGame((prevGame) => ({
            ...prevGame,
            [name]: value,
        }))
    }

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            await axios.put("/api/games/" + id, editedGame);
            setGames(games.filter(() => editedGame));
            setEditing(false);
            await loadAllGames();
            toast.success("Game erfolgreich bearbeitet");
            navigate('/games');
        } catch (error) {
            console.error(error);
            toast.error("Fehler beim update");
            navigate('/games');
        }
    }

    return {game, editedGame, editing, handleFormSubmit, editOnClick, gameInputChange}
}