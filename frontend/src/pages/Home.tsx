import { Link } from "react-router-dom";

export default function Home() {
	const projects: Project[] = [
		{
			title: "Placeholder project",
			description:
				"this is just a placeholder, folks. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		},
	];
    // some role based API fetch that gets all projects

	return projects.length > 0 ? (
		projects.map((project) => (
			<div
				className="max-w-2xl md:w-4/5 mb-6 p-6 border rounded-lg relative"
				key={project.title}
			>
				<p className="text-2xl mb-2">{project.title}</p>
				<p className="mb-1">{project.description}</p>
				<p className="mb-6">
					This project is{" "}
					<span className="font-semibold">
						{project.status.toLowerCase()}
					</span>
					.
				</p>
				<Link
					to={"project"}
					className="bg-black text-white rounded focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 px-3 py-1"
				>
					View
				</Link>
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
