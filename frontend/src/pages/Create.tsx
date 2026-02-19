import { useState } from "react";

export default function Create() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([])
    
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
            
        </form>
    );
}
