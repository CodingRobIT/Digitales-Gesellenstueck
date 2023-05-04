import {Navigate, Outlet} from "react-router-dom";

type Props = {
    isLoggedIn: boolean
}

export default function ProtectedRoutes(props: Props) {

    return (
        props.isLoggedIn ? <Outlet /> : <Navigate to={"/login"} />
    )
}