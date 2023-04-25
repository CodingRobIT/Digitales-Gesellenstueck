import {useNavigate} from "react-router-dom";
import {Box, Button, Card, CardContent, CardHeader, TextField, Typography} from "@mui/material";
import useGameDetail from "./useGameDetail";
import {Game} from "./Game";

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
                    <CardHeader title={game.title}/>
                    <CardContent>
                        <Box sx={{display: "flex", justifyContent: "center", gap: 8}}>
                            <Typography variant="body1" color="text.secondary">
                                {game.genre}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {game.publisher}
                            </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{marginTop: 2, paddingBottom: 2, maxWidth: 600, mx: "auto"}}>
                            {game.note}
                        </Typography>
                        {editing ? (
                            <form onSubmit={handleFormSubmit}>
                                <Box sx={{display: "flex", flexDirection: "column", paddingBottom: 2, gap: 2, maxWidth: 600, mx: "auto"}}>
                                <TextField
                                    label="Title"
                                    name="title"
                                    variant="filled"
                                    value={editedGame.title}
                                    onChange={gameInputChange}
                                />
                                <TextField
                                    label="Genre"
                                    name="genre"
                                    variant="filled"
                                    value={editedGame.genre}
                                    onChange={gameInputChange}
                                />
                                <TextField
                                    label="Publisher"
                                    name="publisher"
                                    variant="filled"
                                    value={editedGame.publisher}
                                    onChange={gameInputChange}
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
                                />
                                </Box>

                                <Box sx={{display: "flex", justifyContent: "center", gap: 8}}>
                                    <Button
                                        sx={{
                                            bgcolor: "#1E2432",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            minWidth: "80px",
                                            "&:hover": {
                                                color: "black",
                                            },
                                        }}
                                        type="submit"
                                        size="small"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        sx={{
                                            bgcolor: "#1E2432",
                                            color: "#fff",
                                            fontWeight: "bold",
                                            minWidth: "80px",
                                            "&:hover": {
                                                color: "black",
                                            },
                                        }}
                                        size="small"
                                        onClick={() => navigate(`/games/`)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </form>
                        ) : (
                            <Box sx={{display: "flex", justifyContent: "center", gap: 8}}>
                                <Button
                                    sx={{
                                        bgcolor: "#1E2432",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        minWidth: "80px",
                                        "&:hover": {
                                            color: "black",
                                        },
                                    }}
                                    size="small"
                                    onClick={editOnClick}
                                >
                                    Edit
                                </Button>
                                <Button
                                    sx={{
                                        bgcolor: "#1E2432",
                                        color: "#fff",
                                        fontWeight: "bold",
                                        minWidth: "80px",
                                        "&:hover": {
                                            color: "black",
                                        },
                                    }}
                                    size="small"
                                    onClick={onDeleteClick}
                                >
                                    Delete Game
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