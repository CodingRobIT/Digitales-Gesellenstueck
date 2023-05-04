import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import useGameDetail from "../customHooks/useGameDetail";

type GameDetailProps = {
    deleteGame: (id: string) => void;
};

export default function GameDetails(props: GameDetailProps) {
    const navigate = useNavigate();
    const {game, editedGame, editing, handleFormSubmit, editOnClick, gameInputChange} = useGameDetail();

    function onDeleteClick() {
        if (game) {
            props.deleteGame(game.id);
        }
        navigate("/games");
    }

    return (
        <div>
            {game ? (
                <Card sx={{bgcolor: "transparent", boxShadow: "none"}}>
                    <CardHeader title={game.title} sx={{fontWeight: "bold", color: "lightBlue"}}/>
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center", gap: 5, marginBottom: '16px' }}>
                            <Box>
                                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: "bold", color: "snow" }}>
                                    Genre
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{color: "snow"}}>
                                    {game.genre}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: "bold", color: "snow"  }}>
                                    Publisher
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{color: "snow"}}>
                                    {game.publisher}
                                </Typography>
                            </Box>
                        </Box>
                        <img src={game.imageUrl} alt="Ohne Bild" width="300" height="300" />
                        <Typography variant="body2" color="text.secondary"
                                    sx={{marginTop: 2, paddingBottom: 2, maxWidth: 600, mx: "auto", color: "snow" }}>
                            {game.note}
                        </Typography>
                        {editing ? (
                            <form onSubmit={handleFormSubmit}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    paddingBottom: 2,
                                    gap: 2,
                                    maxWidth: 600,
                                    mx: "auto",
                                }}>
                                    <TextField
                                        label="Title"
                                        name="title"
                                        variant="filled"
                                        value={editedGame.title}
                                        onChange={gameInputChange}
                                        InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                                        InputLabelProps={{sx: {color: "Snow"}}}
                                    />
                                    <TextField
                                        label="Genre"
                                        name="genre"
                                        variant="filled"
                                        value={editedGame.genre}
                                        onChange={gameInputChange}
                                        InputProps={{sx: {color: "cadetblue"}}}
                                        InputLabelProps={{sx: {color: "Snow"}}}
                                    />
                                    <TextField
                                        label="Publisher"
                                        name="publisher"
                                        variant="filled"
                                        value={editedGame.publisher}
                                        onChange={gameInputChange}
                                        InputProps={{sx: {color: "cadetblue"}}}
                                        InputLabelProps={{sx: {color: "Snow"}}}
                                    />

                                    <TextField
                                        label="Bild-Link"
                                        name="imageUrl"
                                        variant="filled"
                                        value={editedGame.imageUrl}
                                        onChange={gameInputChange}
                                        InputProps={{sx: {color: "cadetblue"}}}
                                        InputLabelProps={{sx: {color: "Snow"}}}
                                    />

                                    <TextField
                                        id="filled-multiline-static"
                                        label="Note"
                                        multiline
                                        rows={10}
                                        name="note"
                                        variant="filled"
                                        value={editedGame.note}
                                        onChange={gameInputChange}
                                        InputProps={{sx: {color: "cadetblue"}}}
                                        InputLabelProps={{sx: {color: "Snow"}}}
                                    />
                                </Box>

                                <Box sx={{display: "flex", justifyContent: "center", gap: 8}}>
                                    <Button
                                        sx={{
                                            bgcolor: "black",
                                            color: "green",
                                            fontWeight: "bold",
                                            minWidth: "80px",
                                            "&:hover": {
                                                color: "snow",
                                                bgcolor: "#119D13"
                                            },
                                        }}
                                        type="submit"
                                        size="small"
                                    >
                                        Speichern
                                    </Button>
                                    <Button
                                        sx={{
                                            bgcolor: "black",
                                            color: "red",
                                            fontWeight: "bold",
                                            minWidth: "80px",
                                            "&:hover": {
                                                color: "snow", bgcolor: "#9D1911"
                                            },
                                        }}
                                        size="small"
                                        onClick={() => navigate(`/games/`)}
                                    >
                                        Abbrechen
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box sx={{display: "flex", justifyContent: "center", gap: 8}}>
                                <Button
                                    sx={{
                                        bgcolor: "black",
                                        color: "deepskyblue",
                                        fontWeight: "bold",
                                        minWidth: "80px",
                                        "&:hover": {
                                            color: "black", bgcolor: "deepskyblue"
                                        },
                                    }}
                                    size="small"
                                    onClick={editOnClick}
                                >
                                    Bearbeiten
                                </Button>
                                <Button
                                    sx={{
                                        bgcolor: "black",
                                        color: "red",
                                        fontWeight: "bold",
                                        minWidth: "80px",
                                        "&:hover": {
                                            color: "snow", bgcolor: "#9D1911"
                                        },
                                    }}
                                    size="small"
                                    onClick={onDeleteClick}
                                >
                                    Spiel Löschen
                                </Button>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}