import { Route, Routes } from "react-router-dom";
import Root from "./../layouts/Root";
import Login from "./../pages/Login";
import Project from "../pages/Project";
import Create from "../pages/Create";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="project" element={<Project />} />
                <Route path="create" element={<Create />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
