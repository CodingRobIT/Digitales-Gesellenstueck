import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import {Button, paperClasses, TextField} from '@mui/material';
import { styled } from '@mui/material/styles';
import { NewGame } from './Game';
// import classes from "addGame.module.css";
import Paper from "@material-ui/core/Paper";

type AddGameProps = {
    addGame: (newGame: NewGame) => void;
};

type ImageUploadResponse = {
    imageUrl: string;
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
    const [image, setImage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const onDrop = async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post<ImageUploadResponse>(
                '/api/images/upload',
                formData
            );
            setImage(response.data.imageUrl);
        } catch (error) {
            setErrorMessage('Error uploading image');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
            image: image,
        };

        props.addGame(newGame);

        navigate('/games');
    }

    return (
        <FormContainer onSubmit={onSaveGame}>
            <TextField
                label="Game Title"
                required
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
                label="Note"
                variant="outlined"
                value={note}
                onChange={(event) => setNote(event.target.value)}
            />

            <Paper className="addGame" variant="outlined">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Bild für Upload hier her ziehen ...</p>
                ) : (
                    <p>Drag and drop oder Klick um aus dem Ordner auszuwählen</p>
                )}
            </div>
            {errorMessage && <p>{errorMessage}</p>}
            {image && (
                <img src={image} alt="Game" style={{ maxWidth: '100%' }} />
            )}
            </Paper>

            <Button variant="contained" type="submit">
                Save Game
            </Button>
        </FormContainer>
    );
}
