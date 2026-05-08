import {Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions} from "@mui/material";
import {styled} from "@mui/material/styles";
import React, {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const FormContainer = styled("form")({
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    padding: "2rem",
    boxSizing: "border-box",
});

type Props = {
    onLogin: (username: string, password: string) => Promise<void>
}

export const LoginPage = (props: Props) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [impressumOpen, setImpressumOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        props.onLogin(username, password)
            .then(() => {
                navigate("/games");
            })
            .catch((error) => {
                console.error("Error occurred:", error);
            });
    }

    return (
        <>
            <FormContainer className="form-container" onSubmit={onSubmit} sx={{maxWidth: 400, mx: "auto"}}>
                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                    <TextField
                        id="input-with-sx"
                        label="Username"
                        variant="filled"
                        value={username}
                        InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                        InputLabelProps={{sx: {color: "Snow"}}}
                        onChange={(event) => setUsername(event.target.value)}
                    />

                    <TextField
                        label="Password"
                        variant="filled"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}, type: "password"}}
                        InputLabelProps={{sx: {color: "Snow"}}}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            bgcolor: "black",
                            color: "green",
                            fontWeight: "bold",
                            minWidth: "100px",
                            maxWidth: "200px",
                            mx: "auto",
                            "&:hover": {
                                color: "black",
                                bgcolor: "deepskyblue",
                            },
                        }}
                    >
                        Login
                    </Button>

                    <Button
                        sx={{
                            bgcolor: "black",
                            color: "deepskyblue",
                            fontWeight: "bold",
                            minWidth: "100px",
                            maxWidth: "200px",
                            mx: "auto",
                            "&:hover": {
                                color: "black",
                                bgcolor: "deepskyblue",
                            },
                        }}
                        size="small"
                        onClick={() => navigate("/signup")}
                    >
                        Anmelden
                    </Button>

                    <Paper
                        elevation={7}
                        sx={{
                            bgcolor: "darkgrey",
                            color: "black",
                            p: 2,
                        }}
                    >
                        <Typography variant="h6">Willkommen auf meiner Website.</Typography>
                        <Typography>
                            Damit Sie sich nicht erst Registrieren müssen, <br/>
                            können Sie sich hier zum testen der seite mit dem <br/>
                            test Konto anmelden,
                        </Typography>
                        <br/>
                        <Typography>Username: "test"</Typography>
                        <Typography>und Passwort: "test"</Typography>
                    </Paper>
                </div>

                <Button
                    type="button"
                    size="small"
                    onClick={() => setImpressumOpen(true)}
                    sx={{
                        color: "deepskyblue",
                        textDecoration: "underline",
                        mt: "auto",
                        mx: "auto",
                        textTransform: "none",
                    }}
                >
                    Impressum
                </Button>
            </FormContainer>

            <Dialog
                open={impressumOpen}
                onClose={() => setImpressumOpen(false)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: "#050b14",
                        color: "white",
                        border: "2px solid deepskyblue",
                        borderRadius: "18px",
                        boxShadow: `
                          0 0 8px deepskyblue,
                          0 0 18px rgba(0, 191, 255, 0.75),
                          0 0 36px rgba(0, 191, 255, 0.45)
                        `,
                    },
                }}
            >
                <DialogTitle sx={{ color: "deepskyblue", fontWeight: "bold" }}>
                    Impressum
                </DialogTitle>

                <DialogContent dividers>
                    <Typography paragraph>
                        Angaben gemäß § 5 TMG
                    </Typography>

                    <Typography paragraph>
                        Robin Schatz<br/>
                        Schillerstraße 13/2<br/>
                        73642 Welzheim<br/>
                        Deutschland
                    </Typography>

                    <Typography paragraph>
                        E-Mail: tmai02476@gmail.com
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Hinweis zum Projekt
                    </Typography>

                    <Typography paragraph>
                        Bei dieser Website handelt es sich um ein nicht-kommerzielles Ausbildungs- und
                        Demonstrationsprojekt im Rahmen eines Gesellenstücks. Es werden keine kostenpflichtigen
                        Leistungen angeboten.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Haftung für Inhalte
                    </Typography>

                    <Typography paragraph>
                        Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit,
                        Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen.
                    </Typography>
                </DialogContent>

                <DialogActions>
                    <Button
                        onClick={() => setImpressumOpen(false)}
                        sx={{
                            color: "deepskyblue",
                            fontWeight: "bold",
                            "&:hover": {
                                bgcolor: "deepskyblue",
                                color: "black",
                            },
                        }}
                    >
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
