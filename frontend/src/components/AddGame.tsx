import React, {FormEvent, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import { NewGame } from '../model/Game';
import './AddGame.css'

type AddGameProps = {
    addGame: (newGame: NewGame) => void;
};

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '400px',
    margin: '0 auto',
});

export default function AddGame(props: AddGameProps) {
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [publisher, setPublisher] = useState<string>('');
    const [genre, setGenre] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');
    const [userId, setUserId] = useState<string>('');

    useEffect(() => {
        fetch('/api/users/me')
            .then((response) => response.json())
            .then((data) => setUserId(data.id))
            .catch((error) => console.error('Error fetching user ID:', error));
    }, []);

    function onSaveGame(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (title === undefined || title === '') {
            console.error('Title required');
            return;
        }

        const newGame: NewGame = {
            title: title,
            publisher: publisher,
            genre: genre,
            note: note,
            imageUrl: imageUrl,
            userId: userId,
        };

        props.addGame(newGame);

        navigate('/games');
    }

    return (
        <FormContainer className="form-container" onSubmit={onSaveGame} sx={{maxWidth: 600, mx: "auto"}}>
            <TextField
                label="Game Title"
                required
                variant="filled"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                InputProps={{sx: {color: "deepskyblue", fontWeight: "bold"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />

            <TextField
                label="Publisher"
                variant="filled"
                value={publisher}
                onChange={(event) => setPublisher(event.target.value)}
                InputProps={{sx: {color: "cadetblue"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />

            <TextField
                label="Genre"
                variant="filled"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
                InputProps={{sx: {color: "cadetblue"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />

            <TextField
                label="Bild-Link"
                variant="filled"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                InputProps={{sx: {color: "cadetblue"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />

            <TextField
                id="filled-multiline-static"
                label="Notiz"
                multiline
                rows={10}
                value={note}
                variant="filled"
                onChange={(event) => setNote(event.target.value)}
                InputProps={{sx: {color: "cadetblue"}}}
                InputLabelProps={{sx: {color: "Snow"}}}
            />

            <Button variant="contained"
                    type="submit"
                    sx={{
                        bgcolor: "black",
                        color: "green",
                        fontWeight: "bold",
                        minWidth: "80px",
                        "&:hover": {
                            color: "snow",
                            bgcolor: "#119D13"
                        },
                    }}>
                Spiel Speichern
            </Button>
        </FormContainer>
    );
}