import { useState } from "react";

export default function useTasks(initial: Task[] = []) {
	const [list, setList] = useState<Task[]>(initial);

	const add = (): void => {
		const newTask: Task = {
			title: "",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		};

		setList([...list, newTask]);
	};

	const editStatus = (task: Task, status: Status): void => {
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
	};
}
