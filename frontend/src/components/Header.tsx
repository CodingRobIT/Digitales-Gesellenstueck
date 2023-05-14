import {Link, useNavigate} from "react-router-dom";
import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import '../Header.css'
import {useState} from "react";

type Props = {
    onLogout: () => Promise<void>;
};

export default function Header(props: Props) {

    const [, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        setIsLoading(true);
        props
            .onLogout()
            .then(() => {
                navigate("/login");
            })
    }

    return (
        <AppBar className="header" position="static" sx={{bgcolor: "#1E2432"}}>
            <Toolbar sx={{justifyContent: "center"}}>
                <div>
                    <Typography variant="h6" component="div" align="center">
                        Die Video Game Library
                    </Typography>
                    <div>
                        <Typography component="div" align="center">
                            <Button color="inherit" component={Link} to="/games">
                                Zu den Games
                            </Button>
                            <Button color="inherit" component={Link} to="/games/add">
                                Neues Game Hinzufügen
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Typography>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    );
}