import { Navigate, Outlet } from "react-router-dom";
import {CircularProgress} from "@mui/material";

type Props = {
    user?: string;
    isLoading: boolean;
};

export default function ProtectedRoutes({ user, isLoading }: Props) {
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30vh",
                }}
            >
                <CircularProgress />
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
}