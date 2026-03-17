import { useState } from "react";
import api from "../api/api";

export default function useTasks(initial: Task[] = []) {
	const [list, setList] = useState<Task[]>(initial ?? []);

	const add = (): void => {
		const newTask: Task = {
			title: "",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		};

		setList([...list, newTask]);
	};

	const editStatus = (task: Task, projectId: string, status: Status): void => {
        api.post(`/api/projects/${projectId}/tasks/${task.id}`, {
            task: {
                title: task.title,
                status: task.status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE",
                id: task.id,
            }
        });

		setList([
			...list.map((t) =>
				t.id === task.id
					? {
							...task,
							status: status,
						}
					: t,
			),
		]);
	};

	const editTitle = (task: Task, title: string): void => {
		setList([
			...list.map((t) =>
				t.id === task.id
					? {
							...task,
							title: title,
						}
					: t,
			),
		]);
	};

	const remove = (task: Task): void => {
		setList([...list.filter((t) => t.id !== task.id)]);
	};

	return {
		add,
		editStatus,
		editTitle,
		remove,
		list,
        setList
	};
}
