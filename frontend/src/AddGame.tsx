import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {NewGame} from "./Game";
import {FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type AddGameProps = {
    addGame: (newGame: NewGame) => void
}
export default function AddGame(props: AddGameProps) {

    const navigate = useNavigate()
    const [titel , setTitel] = useState<string>('')
    const [publisher , setPublisher] = useState<string>('')
    const [genre , setGenre] = useState<string>('')
    const [note , setNote] = useState<string>('')

    function onSaveGame(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const newGame: NewGame = {titel: titel, publisher: publisher, genre: genre, note: note}

        props.addGame(newGame)

        navigate('/games')
    }

    return (
        <Form onSubmit={onSaveGame}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Spiel Titel</Form.Label>
                <Form.Control type="text"
                              placeholder="Spiel Titel"
                              value={titel}
                              onChange={(event) => {
                                  setTitel(event.target.value)
                              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Publisher</Form.Label>
                <Form.Control type="text"
                              placeholder="Hersteller des Spiels"
                              value={publisher}
                              onChange={(event) => {
                                  setPublisher(event.target.value)
                              }}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text"
                              placeholder="Zu welchem Genre gehört das Spiel"
                              value={genre}
                              onChange={(event) => {
                                  setGenre(event.target.value)
                              }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Notiz</Form.Label>
                <Form.Control type="text"
                              placeholder="Freie Notiz für dich (für welche Platform du das Game besitzt.)"
                              value={note}
                              onChange={(event) => {
                                  setNote(event.target.value)
                              }}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Game
            </Button>
        </Form>
    );
}