import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

export default function Header() {
    return (
        <AppBar position="static" sx={{ bgcolor: "#1E2432" }}>
            <Toolbar sx={{ justifyContent: "center" }}>
                <div>
                    <Typography variant="h6" component="div" align="center">
                        Hier entsteht meine Video Game Library
                    </Typography>
                    <div>
                        <Typography component="div" align="center">
                            <Button color="inherit" component={Link} to="/games">
                                Zu den Games
                            </Button>
                            <Button color="inherit" component={Link} to="/games/add">
                                Neues Game Hinzufügen
                            </Button>
                        </Typography>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}
