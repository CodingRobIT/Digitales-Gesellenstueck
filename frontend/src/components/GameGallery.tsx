import {Game} from "../model/Game";
import React, {useState} from "react";
import GameCard from "./GameCard";
import {TextField} from "@mui/material";
import './GameGallery.css'
import {ToastContainer} from "react-toastify";

type GameGalleryProps = {
    games: Game[],
}

export default function GameGallery(props: GameGalleryProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredGames = props.games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="game-gallery">
            <div className="searchbar">
                <TextField
                    id="outlined-basic"
                    label="Games Suchen..."
                    variant="filled"
                    value={searchTerm}
                    InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                    InputLabelProps={{sx: {color: "Snow"}}}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className="game-cards">
                    {[...filteredGames].reverse().map((card: Game) => (
                        <GameCard key={card.id} game={card}/>
                    ))}
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </div>
    );
}
