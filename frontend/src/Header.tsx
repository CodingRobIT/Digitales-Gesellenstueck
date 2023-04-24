import {Link} from "react-router-dom";

export default function Header() {
    return (
        <div>
            <h1>Hier entsteht meine Video Game Library</h1>
            <Link to="/games">Zu den Games</Link>
        </div>
    )
}