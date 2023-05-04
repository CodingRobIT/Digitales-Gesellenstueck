import {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export default function useUser() {
    const [user, setUser] = useState<string>()

    function login(username: string, password: string) {
        return axios.post("/api/users/login", undefined, {auth: {username, password}})
            .then(response => {
                setUser(response.data)
                toast.success("Erfolgreich eingeloggt")
            })
            .catch((error) => {
                console.error('Login fehlgeschlagen', error);
                toast.error("Login fehlgeschlagen!");
            })
    }

    return {user, login}
}