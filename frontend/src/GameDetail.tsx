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
            {game ? (
                <Card sx={{ bgcolor: "transparent", boxShadow: "none" }}>
                    <CardHeader title={game.title} />
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 8 }}>
                            <Typography variant="body1" color="text.secondary">
                                {game.genre}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {game.publisher}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            {game.note}
                        </Typography>
                    </CardContent>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
