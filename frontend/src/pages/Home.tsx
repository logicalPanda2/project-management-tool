type Status = "COMPLETE" | "INCOMPLETE";

interface Task {
    title: string,
    status: Status
}

interface Project {
    title: string,
    description: string,
    status: Status,
    tasks: Task[],
}

export default function Home() {
    const projects: Project[] = [
        {
            title: "Placeholder project",
            description: "A project made to simplify the frontend workflow",
            status: "INCOMPLETE",
            tasks: [],
        }
    ]; // some role based API fetch that gets all projects

    return (
        projects.map((project) => (
            <div className="max-w-2xl w-4/5 p-6 border rounded-lg relative" key={project.title}>
                <p className="text-2xl mb-2">{project.title}</p>
                <p className="mb-6">{project.description}</p>
                <div className={`absolute top-6 right-6 border w-4 h-4 rounded-full ${project.status === "INCOMPLETE" ? "bg-black" : "bg-white"}`}></div>
                <button className="bg-black text-white rounded focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 px-3 py-1">View</button>
            </div>
        ))
    );
}
