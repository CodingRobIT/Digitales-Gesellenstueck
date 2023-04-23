import {Link} from "react-router-dom";
import {NavLink} from "react-bootstrap";

export default function Header() {
    return (
        <div>
            <h1>Hier entsteht meine Video Game Library</h1>
            <Link to="/games">Zu den Games</Link>
            <Link to="/games/add">Neues Game Hinzufügen</Link>
        </div>
    )
}