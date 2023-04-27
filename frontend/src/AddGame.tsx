import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import { NewGame } from './model/Game';
import './AddGame.css'
import {ToastContainer} from "react-toastify";

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
            />

            <TextField
                label="Publisher"
                variant="filled"
                value={publisher}
                onChange={(event) => setPublisher(event.target.value)}
            />

            <TextField
                label="Genre"
                variant="filled"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
            />

            <TextField
                id="filled-multiline-static"
                label="Notiz"
                multiline
                rows={10}
                value={note}
                variant="filled"
                onChange={(event) => setNote(event.target.value)}
            />

            <Button variant="contained" type="submit">
                Save Game
            </Button>
        </FormContainer>
    );
}