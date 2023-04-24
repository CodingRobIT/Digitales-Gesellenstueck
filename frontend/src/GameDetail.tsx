import React, {useEffect, useState} from "react";
import {Game} from "./Game";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import axios from "axios";
import {toast} from "react-toastify";
import useGameDetail from "./useGameDetail";

export default function GameDetails() {

    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
     const {game} = useGameDetail()



    return (
        <div>
            {
                game
                ?<div>
                    <header>{game.title}</header>
                    <p>{game.genre}</p>
                    <p>{game.publisher}</p>
                    <p>{game.note}</p>
                    </div>
                    : <div>Loading...</div>
            }
        </div>
    );
}