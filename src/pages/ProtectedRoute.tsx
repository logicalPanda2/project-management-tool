import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: {
    children: React.ReactNode
}) {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if(!token)
            navigate("/login", {
                replace: true,
            });
    }, [token]);

    return token ? children : <div className="min-h-screen min-w-screen bg-default"></div>;
}
