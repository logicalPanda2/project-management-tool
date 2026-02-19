import { useState } from "react";

interface Comment {
    user: string,
    text: string,
}

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
        ],
        id: crypto.randomUUID(),
    }); // will be replaced by fetch based on parameters
    const [comments, setComments] = useState<Comment[]>([
        {
            user: "User 1",
            text: "Cool project my guy",
        },
        {
            user: "User 2",
            text: "Looks good dude, good luck!",
        }
    ]);
    const [comment, setComment] = useState<string>(""); 

    const markTaskAsDone = (task: Task): void => {
        const taskStatus: Status = "COMPLETE";
        const target = placeholderProject.tasks.find(t => t.id === task.id);

        if(!target) throw new Error("Cannot mark as done; task not found.");

        const newTask = {
            ...target,
            status: taskStatus,
        }

        const copy = [...placeholderProject.tasks];

        const newTasks = copy.map(t => t.id === task.id ? newTask : t);

        setProject({
            ...placeholderProject,
            tasks: newTasks,
        });
    }

    const postComment = (): void => {
        setComments([
            ...comments,
            {
                user: "User 1",
                text: comment,   
            }
        ]);

        setComment("");
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
            <section className="mb-8">
                <header>
                    <h2 className="text-3xl mb-4">Tasks</h2>
                </header>
                {placeholderProject.tasks.length > 0
                    ? placeholderProject.tasks.map((task) => (
                        <div className="flex flex-row justify-between items-center relative mb-4 border max-w-2xl p-4 rounded">
                            <p className="text-xl ml-2">{task.title}</p>
                            {task.status === "INCOMPLETE" 
                                ? <button className="mr-2 px-2 py-0.5 bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800" onClick={() => markTaskAsDone(task)}>Mark as done</button>
                                : <p className="mr-6">Finished</p>
                            }
                        </div>
                    ))
                    : <p className="text-xl bg-neutral-900">There are no tasks yet.</p>
                }
            </section>
            <section>
                <header>
                    <h2 className="text-3xl mb-4">Comments</h2>
                </header>
                {comments.length > 0
                    ? comments.map((c) => (
                        <div className="relative mb-4 border max-w-2xl p-4 rounded">
                            <p className="mb-2">{c.user}</p>
                            <p className="text-xl">{c.text}</p>
                        </div>
                    ))
                    : <p className="text-xl bg-neutral-900">There are no comments yet.</p>
                }
                <div className="flex flex-row flex-nowrap items-center mt-8">
                    <input
                        required
                        autoComplete="false"
                        type="text"
                        name="comment"
                        id="commentInput"
                        placeholder="Say something.."
                        className="border rounded focus-visible:outline-1 px-4 py-2"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800 py-1 px-3 ml-4" onClick={postComment}>Post</button>
                </div>
            </section>
        </article>
    </>);
}
