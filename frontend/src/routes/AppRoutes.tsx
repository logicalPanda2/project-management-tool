import { Route, Routes } from "react-router-dom";
import Root from "./../layouts/Root";
import Login from "./../pages/Login";
import Project from "../pages/Project";
import View from "../pages/View";
import Home from "../pages/Home";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Root />}>
                <Route index element={<Home />} />
                <Route path="project" element={<Project />} />
                <Route path="view" element={<View />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    );
}
