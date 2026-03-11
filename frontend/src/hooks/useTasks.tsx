import { useState } from "react";

export default function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskErr, setTaskErr] = useState<string>("");

    const add = (): void => {
		setTaskErr("");

		const newTask: Task = {
			title: "",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		};

		setTasks([...tasks, newTask]);
	};

    const editStatus = (
        task: Task,
        status: Status,
    ): void => {
        setTaskErr("");

        setTasks([...tasks.map(t => t.id === task.id ? {
            ...task,
            status: status,
        } : t)]);
    }

    const editTitle = (task: Task, title: string): void => {
        setTasks([
            ...tasks.map((t) =>t.id === task.id 
                ? {
                    ...task,
                    title: title,
                } : t
            )
        ]);
    }

    const remove = (
        task: Task
    ): void => {
        setTaskErr("");

        setTasks([...tasks.filter(t => t.id !== task.id)]);
    }

    return {
        add, 
        editStatus,
        editTitle,
        remove,
        taskErr,
        setTaskErr,
        tasks,
        setTasks
    };
}
