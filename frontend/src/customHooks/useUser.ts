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
                    toast.error("Error checking logged-in user:");
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
                toast.success("Login Successful!");
            })
            .catch(() => {
                toast.error("Login Failed: Please check your username and password.");
            });
    }

    function logout() {
        axios.post("/api/users/logout")
            .then(() => {
                setUser(undefined);
                toast.success("Logout Successful!");
            })
            .catch(() => {
                toast.error("Logout failed:");
            });
    }

    return { user, login, logout, isLoading };
}

// import {useEffect, useState} from "react";
// import axios from "axios";
// import {User} from "../model/User";
//
// export default function useUser() {
//     const [user, setUser] = useState<User>()
//     const [error, setError] = useState<boolean>();
//     const [isLoggedIn, setIsLoggedIn] = useState(true);
//     const [username , setUsername] = useState("");
//
//     const login = async (username: string, password: string)=> {
//         return await axios.post("/api/users/login", undefined, {
//             withCredentials: true,
//             auth: {
//                 username,
//                 password
//             }})
//             .then(response => {
//                 setIsLoggedIn(true)
//                 setUsername(username)
//                 return true;
//             })
//             .catch((error) => {
//                 console.error(error);
//                 return false;
//             })
//     }
//
//     useEffect(() => {
//         const data = window.localStorage.getItem('CURRENT_USER_ACTIVE');
//         if (data) {
//             setIsLoggedIn(JSON.parse(data));
//         }
//     }, []);
//
//     useEffect(() => {
//         window.localStorage.setItem('CURRENT_USER_ACTIVE', JSON.stringify(isLoggedIn))
//     }, [isLoggedIn]);
//
//     useEffect(() => {
//         if (!username) {
//             return;
//         }
//         loadUser(username).catch((e) => console.error(e));
//     }, [username]);
//
//     useEffect(() => {
//
//         console.log(user?.id);
//     }, [user]);
//
//     const loadUser = async (username: string) => {
//         return await axios.get(`http://localhost:8080/api/users/${username}`, {
//             withCredentials: true
//         }).then((response) => {
//             setUser(response.data)
//
//         }).catch((error) => {
//             console.error(error);
//         })
//     }
//
//     return {user, login, isLoggedIn, error, setError}
//
// }