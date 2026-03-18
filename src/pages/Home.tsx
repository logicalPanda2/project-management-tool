import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Home() {
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(!("account" in params)) navigate("/404", {
            replace: true,
        });
    }, [params]);

    const allProjects: Project[] = JSON.parse(localStorage.getItem("projects")!);
    const projects: Project[] | null = [];
    allProjects.map((p) => {
        const members: User[] = JSON.parse(localStorage.getItem(`project/${p.id}/members`)!);
        let invited = false;

        members.forEach(m => {
            if(m.email.startsWith(params.account!)) invited = true;
        });

        if(invited) projects.push(p);
    });

	return projects && projects.length > 0 
    ? (
		projects.map((project) => (
			<div
				className="max-w-xl md:w-4/5 mb-6 p-6 shadow-bold rounded-2xl relative hover:shadow-bold-hover transition-custom-all"
				key={project.id}
			>
                <div className="flex flex-col sm:flex-row justify-between md:items-center items-start flex-nowrap mb-4 gap-4">
                    <p className="text-2xl font-semibold text-primary whitespace-nowrap text-ellipsis overflow-hidden max-w-full">{project.title}</p>
                    <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-sm shadow-pressed bg-gradient px-3 py-0.5 ${project.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                        <span className={`rounded-full w-2 h-2 inline-block mr-2 ${project.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                        {project.status}
                    </p>
                </div>
				<p className="mb-6 text-secondary whitespace-nowrap text-ellipsis overflow-hidden">{project.description}</p>
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
	)
    : (projects && <p className="text-center text-2xl text-primary mb-6">
        <span className="max-w-xl inline-block">There are no projects yet. Refresh the page to create the projects again!</span>
    </p>);
}
