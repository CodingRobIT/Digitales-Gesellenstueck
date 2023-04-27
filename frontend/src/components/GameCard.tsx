import { Box, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Game } from '../model/Game';
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
                    <img src={props.game.imageUrl}
                         alt="Ohne Bild"
                         width="150"
                         height="150" />
                </CardContent>
                <CardActions sx={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Button sx={{
                        color: '#fff',
                        fontWeight: 'bold' }}
                            size="small"
                            onClick={() => navigate('/games/' + props.game.id)}>
                        Game Details
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}