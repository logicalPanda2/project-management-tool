import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Home() {
    const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
        api.get("/api/projects")
        .then((res) => {
            setProjects(res.data.projects);
        })
        .catch((err) => {
            console.error(err);
        });
    }, []);

	return projects.length > 0 ? (
		projects.map((project) => (
			<div
				className="max-w-xl md:w-4/5 mb-6 p-6 shadow-bold rounded-2xl relative hover:shadow-bold-hover transition-custom-all"
				key={project.id}
			>
                <div className="flex flex-col sm:flex-row justify-between md:items-center items-start flex-nowrap mb-4 gap-4">
                    <p className="text-2xl font-semibold text-primary">{project.title}</p>
                    <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-sm shadow-pressed bg-gradient px-3 py-0.5 ${project.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                        <span className={`rounded-full w-2 h-2 inline-block mr-2 ${project.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                        {project.status}
                    </p>
                </div>
				<p className="mb-6 text-secondary">{project.description}</p>
                <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                    <Link
                        to={`project/${project.id}`}
                        className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent flex flex-row flex-nowrap items-center stroke-neutral-800 hover:stroke-accent"
                    >
                        View
                        <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 ml-1 mt-0.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                    </Link>
                </div>
			</div>
		))
	) : (
		<>
			<p className="text-center text-2xl text-primary mb-6">
				There are no projects yet.
			</p>
			<div className="self-center hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                <Link
                    to={"/project/new"}
                    className="bg-gradient shadow-default text-primary px-4 py-2 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary"
                >
                    New project
                </Link>
            </div>
		</>
	);
}
