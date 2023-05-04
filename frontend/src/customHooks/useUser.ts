import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {User} from "../model/User";

export default function useUser() {
    const [user, setUser] = useState<User>()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username , setUsername] = useState("");


    const login = async (username: string, password: string)=> {
        return await axios.post("/api/users/login", undefined, {
            withCredentials: true,
            auth: {
                username,
                password
            }})
            .then(response => {
                setIsLoggedIn(true)
                setUsername(username)
                return true;
                toast.success("Erfolgreich eingeloggt")
            })
            .catch((error) => {
                console.error(error);
                return false;
                toast.error("Login fehlgeschlagen!");
            })
    }

    useEffect(() => {
        const data = window.localStorage.getItem('CURRENT_USER_ACTIVE');
        if (data) {
            setIsLoggedIn(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem('CURRENT_USER_ACTIVE', JSON.stringify(isLoggedIn))
    }, [isLoggedIn]);

    useEffect(() => {
        if (!username) {
            return;
        }
        loadUser(username).catch((e) => console.error(e));
    }, [username]);

    // useEffect(() => {
    //
    //     console.log(user?.id);
    // }, [user]);

    const loadUser = async (username: string) => {
        return await axios.get(`http://localhost:8080/api/users/${username}`, {
            withCredentials: true
        }).then((response) => {
            setUser(response.data)

        }).catch((error) => {
            console.error(error);
        })
    }

    return {user, login, isLoggedIn}

}