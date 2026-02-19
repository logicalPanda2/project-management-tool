import { useState } from "react";

export default function Project() {
    const [placeholderProject, setProject] = useState<Project>({
        title: "Placeholder project",
        description: "this is just a placeholder, folks. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
        status: "INCOMPLETE",
        tasks: [
            {
                title: "Task 1",
                status: "INCOMPLETE",
                id: crypto.randomUUID(),
            },
            {
                title: "Task 2",
                status: "INCOMPLETE",
                id: crypto.randomUUID(),
            },
            {
                title: "Task 3",
                status: "INCOMPLETE",
                id: crypto.randomUUID(),
            },
        ]
    }); // will be replaced by fetch based on parameters

    const markTaskAsDone = (task: Task): void => {
        const taskStatus: Status = "COMPLETE";
        const target = placeholderProject.tasks.find(t => t.id === task.id);

        if(!target) throw new Error("Cannot mark as done; task not found.");

        const newTask = {
            ...target,
            status: taskStatus,
        }

        const newTasks = [
            newTask,
            ...placeholderProject.tasks.filter(t => t.id !== task.id),
        ]

        setProject({
            ...placeholderProject,
            tasks: newTasks,
        });
    }

    return (<>
        <article>
            <section className="mb-8">
                <header>
                    <h2 className="text-3xl mb-4">{placeholderProject.title}</h2>
                </header>
                <p className="text-xl mb-2 max-w-2xl">{placeholderProject.description}</p>
                <p className="text-xl max-w-2xl">This project is <span className="font-semibold">{placeholderProject.status.toLowerCase()}</span>.</p>
            </section>
            <section>
                <header>
                    <h2 className="text-3xl mb-4">Tasks</h2>
                </header>
                {placeholderProject.tasks.length > 0
                    ? placeholderProject.tasks.map((task) => (
                        <div className="flex flex-row justify-between items-center relative mb-4 border max-w-2xl p-4 rounded">
                            <p className="text-xl ml-6">{task.title}</p>
                            <div className={`absolute top-2 left-2 border w-3 h-3 rounded-full ${task.status === "INCOMPLETE" ? "bg-black" : "bg-white"}`}></div>
                            {task.status === "INCOMPLETE" 
                                ? <button className="mr-6 px-2 py-0.5 bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800" onClick={() => markTaskAsDone(task)}>Mark as done</button>
                                : <p className="mr-6">Finished</p>
                            }
                        </div>
                    ))
                    : <p className="text-xl bg-neutral-900">There are no tasks yet.</p>
                }
            </section>
        </article>
    </>);
}
