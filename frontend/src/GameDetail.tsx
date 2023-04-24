import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";
import useGameDetail from "./useGameDetail";

export default function GameDetails() {

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
                        <Box sx={{ display: "flex", justifyContent: "center", gap: 8 }}>
                        <Button sx={{bgcolor: '#1E2432', color: '#fff', fontWeight: 'bold', minWidth: '80px' }}
                                size="small"
                                onClick={() => navigate('/')}>
                            Hier kommt Edit
                        </Button>
                        <Button sx={{bgcolor: '#1E2432', color: '#fff', fontWeight: 'bold', minWidth: '80px' }}
                                size="small"
                                onClick={() => navigate('/')}>
                            Hier kommt Löschen
                        </Button>
                    </Box>
                    </CardContent>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
