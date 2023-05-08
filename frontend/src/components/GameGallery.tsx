import {Game} from "../model/Game";
import React, {useEffect, useState} from "react";
import useGames from "../customHooks/useGames";
import GameCard from "./GameCard";
import {TextField} from "@mui/material";
import './GameGallery.css'
import {ToastContainer} from "react-toastify";

type GameGalleryProps = {
    games: Game[],
}

//eslint-disable-next-line
export default function GameGallery(props: GameGalleryProps) {
    const {games,loadAllGames} = useGames()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        loadAllGames().catch(
            (response) => {
                console.error(response)
            }
        )
        //eslint-disable-next-line
    }, []);

    return (
        <div className="game-gallery">
            <div className="searchbar">
                <TextField id="outlined-basic"
                           label="Games Suchen..."
                           variant="filled"
                           value={searchTerm}
                           InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                           InputLabelProps={{sx: {color: "Snow"}}}
                           onChange={(e) => setSearchTerm(e.target.value)}/>
                <div className="game-cards">  {filteredGames.map((card: Game) => (
                    <GameCard key={card.id}
                              game={card}/>
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
    )
}