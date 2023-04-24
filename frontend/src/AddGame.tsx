import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { NewGame } from './Game';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AddGameProps = {
    addGame: (newGame: NewGame) => void;
};

const FormContainer = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '500px',
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

        const newGame: NewGame = {title: title, publisher: publisher, genre: genre, note: note};

        props.addGame(newGame);

        navigate('/games');
    }

    return (
        <FormContainer onSubmit={onSaveGame}>
            <TextField
                label="Spiel Titel"
                variant="outlined"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <TextField
                label="Publisher"
                variant="outlined"
                value={publisher}
                onChange={(event) => setPublisher(event.target.value)}
            />

            <TextField
                label="Genre"
                variant="outlined"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
            />

            <TextField
                label="Notiz"
                variant="outlined"
                value={note}
                onChange={(event) => setNote(event.target.value)}
            />

            <Button variant="contained" type="submit">
                Save Game
            </Button>
        </FormContainer>
    );
}
