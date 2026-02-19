import { useState } from "react";

export default function Create() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskTitles, setTaskTitles] = useState<Record<string, string>>({});

    const addNewTask = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();

        const newTask: Task = {
            title: `Task ${tasks.length + 1}`,
            status: "INCOMPLETE",
            formName: `task${tasks.length + 1}`,
        };

        setTaskTitles({
            ...taskTitles,
            [`task${tasks.length + 1}`]: "",
        });

        setTasks([...tasks, newTask]);
    }
    
    return (
        <form action="" className="max-w-xl">
            <section className="mb-6">
                <header>
                    <h2 className="text-2xl mb-4">Project details</h2>
                </header>
                <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="titleInput">TITLE</label>
                    <input 
                        required
                        autoComplete="false"
                        type="text"
                        name="title"
                        id="titleInput"
                        placeholder="Title"
                        className="border rounded focus-visible:outline-1 px-4 py-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="descriptionInput">DESCRIPTION</label>
                    <input
                        required
                        autoComplete="false"
                        type="text"
                        name="description"
                        id="descriptionInput"
                        placeholder="Description"
                        className="border rounded focus-visible:outline-1 px-4 py-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </section>
            <section className="mb-6">
                <header>
                    <h2 className="text-2xl mb-4">Project tasks</h2>
                </header>
                <button className="bg-black rounded text-white px-3 py-1.5 focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 transition mb-4" onClick={(e) => addNewTask(e)}>Add task</button>
                {tasks.map((task) => {
                    console.log(tasks);

                    return <div className="mb-4" key={task.title}>
                        <label htmlFor={task.formName} className="mb-1 inline-block">{task.title}</label>
                        <input
                            required
                            autoComplete="false"
                            type="text"
                            name={task.formName}
                            id={task.formName}
                            placeholder="Title"
                            className="border rounded focus-visible:outline-1 px-4 py-2 max-w-xl w-full"
                            value={taskTitles[`${task.formName}`]}
                            onChange={(e) => {setTaskTitles({
                                ...taskTitles,
                                [`${task.formName}`]: e.target.value
                            }); console.log(taskTitles)}}
                        />
                    </div>
                })}
            </section>
        </form>
    );
}
