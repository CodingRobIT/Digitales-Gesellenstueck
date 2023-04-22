import {Game} from "./Game";
import {useState} from "react";
import useGames from "./useGames";
import GameCard from "./GameCard";
import {TextField} from "@mui/material";

type GameGalleryProps = {
    games: Game[],
}

export default function GameGallery(props: GameGalleryProps) {
    const {games} = useGames()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredGames = games.filter((game) =>
        game.titel.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="game-gallery">
            <div className="searchbar">
                <TextField id="outlined-basic" label="Search for a Game..." variant="outlined" value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}/>
                <input
                    type="text"
                    placeholder="Search for a Game...(Temp)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {filteredGames.map((card: Game) => (
                <GameCard key={card.id} game={card}/>
            ))}
        </div>
    )
}

