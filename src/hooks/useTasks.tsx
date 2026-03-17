import useLocalStorage from "./useLocalStorage";

export default function useTasks(initial: Task[] = [], projectId: string) {
	const [list, setList] = useLocalStorage<Task[]>(`project/${projectId}/tasks`, initial ?? []);

	const add = (): void => {
		const newTask: Task = {
			title: "",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		};

		setList([...list, newTask]);
	};

	const editStatus = async (task: Task, status: Status): Promise<void> => {
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
