import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

//eslint-disable-next-line
export default function useUser(loadAllGames: () => void) {
    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        function checkLoggedInUser() {
            axios
                .get("/api/users/me")
                .then((response) => {
                    if (response.data && response.data !== "anonymousUser") {
                        setUser(response.data);
                    }
                })
                .catch(() => {
                    toast.error("Kein User gefunden");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
        //eslint-disable-next-line
        checkLoggedInUser();
    }, []);

    function login(username: string, password: string): Promise<void> {
        return axios.post("/api/users/login", undefined, {
            auth: { username, password },
        })
            .then(response => {
                setUser(response.data);
                toast.success("Login erfolgreich!");
            })
            .catch(() => {
                toast.error("Login fehlgeschlagen: Bitte Benutzernamen und/oder Passwort überprüfen.");
            });
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUser(undefined);
            })
            .catch(() => {
                toast.error("Logout hat nicht funktioniert:");
            });
    }

    return { user, login, logout, isLoading };
}