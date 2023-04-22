import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {NewGame} from "./Game";

type AddGameProps = {
    addGame: (newGame: NewGame) => void
}
export default function AddGame(props: AddGameProps) {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Spiel Titel</Form.Label>
                <Form.Control type="text" placeholder="Spiel Titel" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Publisher</Form.Label>
                <Form.Control type="text" placeholder="Hersteller des Spiels" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Genre</Form.Label>
                <Form.Control type="text" placeholder="Zu welchem Genre gehört das Spiel" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Notiz</Form.Label>
                <Form.Control type="text" placeholder="Freie Notiz für dich (für welche Platform du das Game besitzt.)" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

// export default AddGame;