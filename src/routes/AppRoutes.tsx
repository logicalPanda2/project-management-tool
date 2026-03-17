import { Route, Routes } from "react-router-dom";
import Root from "./../layouts/Root";
import Login from "./../pages/Login";
import ProjectView from "../pages/ProjectView";
import ProjectEdit from "../pages/ProjectEdit";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../pages/ProtectedRoute";

export default function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Root />}>
				<Route index element={<ProtectedRoute children={<Home />} />} />
				<Route path="project/:id" element={<ProtectedRoute children={<ProjectView />} />} />
                <Route path="project/:id/edit" element={<ProtectedRoute children={<ProjectEdit />} />} />
                <Route path="project/new" element={<ProtectedRoute children={<ProjectEdit />} />} />
			</Route>
            <Route path="/register" element={<Login />} />
			<Route path="/login" element={<Login />} />
            <Route path="/404" element={<NotFound />} /> 
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}
