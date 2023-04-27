import React, {useEffect, useState} from "react";
import {Game} from "../model/Game";
import axios from "axios";
import {toast} from "react-toastify";
import {useParams} from "react-router-dom";

export default function useGameDetail() {
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
                toast.error("Game dose not exist");
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

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios
            .put("/api/games/" + id, editedGame)
            .then((response) => {
                setGame(response.data);
                setEditing(false);
                window.location.reload();
                toast.success("Game updated successfully");
            })
            .catch(() => {
                toast.error("Failed to update Game");
            });
    }

    return {game, editedGame, editing, handleFormSubmit, editOnClick, gameInputChange}
}