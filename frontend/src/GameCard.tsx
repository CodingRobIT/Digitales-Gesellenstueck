import {Game} from "./Game";
import {useNavigate} from "react-router-dom";

type GameProps = {
    game: Game
}

export default function GameCard(props: GameProps) {

    const navigate = useNavigate()

    return (
        <div className="Game-Card">
            {props.game.titel}
            {props.game.id}
        </div>
    )
}