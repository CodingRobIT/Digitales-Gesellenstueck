import {Game} from "./Game";
import {useState} from "react";
import useGames from "./useGames";
import GameCard from "./GameCard";
import {TextField} from "@mui/material";
import './GameGallery.css'

type GameGalleryProps = {
    games: Game[],
}

export default function GameGallery(props: GameGalleryProps) {
    const {games} = useGames()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="game-gallery">
            <div className="searchbar">
                <TextField id="outlined-basic" label="Games Suchen..." variant="filled" value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}/>
            <div className="game-cards">  {filteredGames.map((card: Game) => (
                <GameCard key={card.id} game={card}/>
            ))}
            </div>
            </div>
        </div>
    )
}