import useEditing from "../hooks/useEditing";
import useTasks from "../hooks/useTasks";

export default function CreateEdit() {
	const {
        title, setTitle,
        titleErr, setTitleErr,
        description, setDescription,
        descriptionErr, setDescriptionErr,
        userEmail, setUserEmail,
        userCounter, setUserCounter,
        userErr, setUserErr,
        userEmails, setUserEmails
    } = useEditing();
    const {
        add, 
        editStatus,
        editTitle,
        remove,
        taskErr,
        tasks,
        setTaskErr,
    } = useTasks();

	const addUser = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	): void => {
		e.preventDefault();
		setUserErr("");

		if (!userEmail.trim()) {
			setUserErr("Cannot be empty");
			return;
		}

		if (
			!userEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		) {
			setUserErr("Invalid email pattern");
			return;
		}

		setUserEmails([
			...userEmails,
			{
				email: userEmail,
				id: userCounter,
			},
		]);

		setUserEmail("");
        setUserCounter(c => c + 1);
	};

	const deleteUser = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
		user: User,
	): void => {
		e.preventDefault();

		setUserEmails([...userEmails.filter((u) => u.id !== user.id)]);
	};

	const sendData = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		e.preventDefault();

		validate();
	};

	const validate = () => {
		setTitleErr("");
		setDescriptionErr("");
		setTaskErr("");
		setUserErr("");

		if (!tasks.length) setTaskErr("A project must have at least one task");

		if (!title.trim()) setTitleErr("Cannot be empty");
		if (!description.trim()) setDescriptionErr("Cannot be empty");
		tasks.forEach((task, i) => {
			if (!task.title.trim())
				setTaskErr(`All tasks must have a title. Check Task ${i + 1}`);
		});

		if (titleErr || descriptionErr || taskErr) {
			return false;
		}

		return true;
	};

	return (
		<form action="" className="max-w-xl">
			<section className="mb-6">
				<header>
					<h2 className="text-2xl mb-4">Project details</h2>
				</header>
				<div className="flex flex-col gap-1 mb-4">
					<label htmlFor="titleInput">TITLE</label>
					<input
						autoComplete="false"
						type="text"
						name="title"
						id="titleInput"
						placeholder="Title"
						className="border rounded focus-visible:outline-1 px-4 py-2"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					{titleErr && (
						<span className="mt-1 text-red-600">{titleErr}</span>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="descriptionInput">DESCRIPTION</label>
					<input
						autoComplete="false"
						type="text"
						name="description"
						id="descriptionInput"
						placeholder="Description"
						className="border rounded focus-visible:outline-1 px-4 py-2"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					{descriptionErr && (
						<span className="mt-1 text-red-600">
							{descriptionErr}
						</span>
					)}
				</div>
			</section>
			<section className="mb-6">
				<header>
					<h2 className="text-2xl mb-4">Tasks</h2>
				</header>
				<button
					className="bg-black rounded text-white px-3 py-1.5 focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 transition mb-4"
					onClick={(e) => {
                        e.preventDefault();
                        add()
                    }}
				>
					Add task
				</button>
				{taskErr && (
					<span className="mb-4 text-red-600 block">{taskErr}</span>
				)}
				{tasks.map((task, index) => {
					return (
						<div className="mb-4" key={task.id}>
							<label
								htmlFor={task.id}
								className="mb-1 inline-block"
							>{`Task ${index + 1}`}</label>
							<input
								autoComplete="false"
								type="text"
								name={task.id}
								id={task.id}
								placeholder="Title"
								className="border rounded focus-visible:outline-1 px-4 py-2 max-w-xl w-full"
								value={task.title}
								onChange={(e) => {
									e.preventDefault();
                                    editTitle(task, e.target.value);
								}}
							/>
                            <p className="mt-2">Status: {task.status}</p>
                            <button
								className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
                                    e.preventDefault();
                                    remove(task)
                                }}
							>
								Remove
							</button>
                            <button
								className="bg-black rounded text-white hover:bg-neutral-800 focus-visible:outline-0 focus-visible:bg-neutral-800 active:bg-neutral-700 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
                                    e.preventDefault();
                                    editStatus(task, "COMPLETE")
                                }}
							>
								Mark as done
							</button>
                            <button
								className="bg-black rounded text-white hover:bg-neutral-800 focus-visible:outline-0 focus-visible:bg-neutral-800 active:bg-neutral-700 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
                                    e.preventDefault();
                                    editStatus(task, "INCOMPLETE")
                                }}
							>
								Mark as todo
							</button>
						</div>
					);
				})}
			</section>
			<section className="mb-6">
				<header>
					<h2 className="text-2xl mb-4">Users</h2>
				</header>
				<div>
					<div className="flex flex-row flex-nowrap items-center mb-4">
						<input
							autoComplete="false"
							type="text"
							name="userEmail"
							id="userEmailInput"
							placeholder="Add someone.."
							className="border rounded focus-visible:outline-1 px-4 py-2"
							value={userEmail}
							onChange={(e) => setUserEmail(e.target.value)}
						/>
						<button
							className="bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800 py-1 px-3 ml-4"
							onClick={(e) => addUser(e)}
						>
							Add
						</button>
					</div>
					{userErr && (
						<span className="mb-4 text-red-600 block">
							{userErr}
						</span>
					)}
				</div>
				{userEmails.length > 0 ? (
					userEmails.map((u) => (
						<div
							className="flex flex-row flex-nowrap justify-between items-center mb-4 border max-w-2xl p-4 rounded"
							key={u.id}
						>
							<p>{u.email}</p>
							<button
								className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2"
								onClick={(e) => deleteUser(e, u)}
							>
								Remove
							</button>
						</div>
					))
				) : (
					<p className="text-xl text-neutral-900">
						There are no added users yet.
					</p>
				)}
			</section>
			<input
				type="submit"
				value="Confirm"
				className="bg-black text-white px-4 py-2 rounded focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 transition max-w-md w-full"
				onClick={(e) => sendData(e)}
			/>
		</form>
	);
}
