import { Route, Routes } from "react-router-dom";
import Login from "./../pages/Login";
import Root from "./../layouts/Root";
import Project from "../pages/Project";
import View from "../pages/View";

export default function AppRoutes() {
    return (<>
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="project" element={<Project />} />
                <Route path="view" element={<View />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    </>);
}
