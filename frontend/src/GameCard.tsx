import { Box, Card, CardHeader, CardContent, CardActions, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Game } from './Game';
import './GameCard.css'

type GameProps = {
    game: Game;
};

export default function GameCard(props: GameProps) {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <Card sx={{ maxWidth: 345, bgcolor: '#2E3B55', color: '#fff', margin: '16px' }}>
                <CardHeader title={props.game.title} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {props.game.note}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => navigate('/')}>
                        noch keine Details
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}


// import {Game} from "./Game";
// import {useNavigate} from "react-router-dom";
//
// type GameProps = {
//     game: Game
// }
//
// export default function GameCard(props: GameProps) {
//
//     const navigate = useNavigate()
//
//     return (
//         <div className="Game-Card">
//             {props.game.title}
//             {props.game.id}
//         </div>
//     )
// }