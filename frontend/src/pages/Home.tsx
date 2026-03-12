import { Link } from "react-router-dom";

export default function Home() {
	const projects: Project[] = [
		{
			title: "Placeholder project",
			description:
				"this is just a placeholder, folks. Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit. Longer description, act like this is important. This is definitely important.",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		},
	];
    // some role based API fetch that gets all projects

	return projects.length > 0 ? (
		projects.map((project) => (
			<div
				className="min-w-80 max-w-xl md:w-4/5 mb-6 p-6 shadow-bold rounded-2xl relative"
				key={project.title}
			>
                <div className="flex flex-row justify-between items-center flex-nowrap mb-3">
                    <p className="text-2xl font-semibold mb-2 text-primary mr-6">{project.title}</p>
                    <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-sm shadow-pressed bg-gradient px-3 py-0.5 ${project.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                        <span className={`rounded-full w-2 h-2 inline-block mr-2 ${project.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                        {project.status}
                    </p>
                </div>
				<p className="mb-6 text-secondary">{project.description}</p>
                <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                    <Link
                        to={`project/${project.id}`}
                        className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent flex flex-row flex-nowrap items-center stroke-neutral-800/50 hover:stroke-accent"
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
			<p className="text-center text-2xl text-neutral-900 mb-2">
				There are no projects yet.
			</p>
			<p className="relative text-center text-xl text-neutral-900">
				Create a new project by clicking the{" "}
				<span className="relative bottom-0.75 text-xs bg-black text-white rounded px-2.5 py-1">
					New
				</span>{" "}
				button!
			</p>
		</>
	);
}
