import useFormData from "../hooks/useFormData";
import useTasks from "../hooks/useTasks";
import useMembers from "../hooks/useMembers";
import { useParams } from "react-router-dom";

export default function ProjectEdit() {
    const params = useParams();

    if(!("id" in params)) return <p>Project Creation Placeholder</p>;
    // if there is no id, return as is. if there is an id, populate hooks with fetched project data from (project(params.id));
    
	const formData = useFormData();
	const tasks = useTasks();
	const members = useMembers();

	const sendData = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
		e.preventDefault();

		validate();
	};

	const validate = () => {
		formData.setTitleErr("");
		formData.setDescriptionErr("");
		formData.setTaskFieldErr("");
		formData.setEmailFieldErr("");

		if (!tasks.list.length)
			formData.setTaskFieldErr("A project must have at least one task");

		if (!formData.title.trim()) formData.setTitleErr("Cannot be empty");
		if (!formData.description.trim()) formData.setDescriptionErr("Cannot be empty");
		tasks.list.forEach((t, i) => {
			if (!t.title.trim())
				formData.setTaskFieldErr(
					`All tasks must have a title. Check Task ${i + 1}`,
				);
		});
        members.emails.forEach((m, i) => {
            if(!m.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
                formData.setEmailFieldErr(`All member emails must have a valid pattern. Check email ${i + 1}`);
        });

		if (
            formData.titleErr || 
            formData.descriptionErr || 
            formData.taskFieldErr ||
            formData.emailFieldErr
        ) {
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
						value={formData.title}
						onChange={(e) => {
                            formData.setTitleErr("");
                            formData.setTitle(e.target.value)
                        }}
					/>
					{formData.titleErr && (
						<span className="mt-1 text-red-600">{formData.titleErr}</span>
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
						value={formData.description}
						onChange={(e) => {
                            formData.setDescriptionErr("");
                            formData.setDescription(e.target.value)
                        }}
					/>
					{formData.descriptionErr && (
						<span className="mt-1 text-red-600">
							{formData.descriptionErr}
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
                        formData.setTaskFieldErr("");
						tasks.add();
					}}
				>
					Add task
				</button>
				{formData.taskFieldErr && (
					<span className="mb-4 text-red-600 block">
						{formData.taskFieldErr}
					</span>
				)}
				{tasks.list.map((task, index) => {
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
                                    formData.setTaskFieldErr("");
									tasks.editTitle(task, e.target.value);
								}}
							/>
							<p className="mt-2">Status: {task.status}</p>
							<button
								className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
									e.preventDefault();
									tasks.remove(task);
								}}
							>
								Remove
							</button>
							<button
								className="bg-black rounded text-white hover:bg-neutral-800 focus-visible:outline-0 focus-visible:bg-neutral-800 active:bg-neutral-700 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
									e.preventDefault();
									tasks.editStatus(task, "COMPLETE");
								}}
							>
								Mark as done
							</button>
							<button
								className="bg-black rounded text-white hover:bg-neutral-800 focus-visible:outline-0 focus-visible:bg-neutral-800 active:bg-neutral-700 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
									e.preventDefault();
									tasks.editStatus(task, "INCOMPLETE");
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
					<h2 className="text-2xl mb-4">Members</h2>
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
							value={formData.emailField}
							onChange={(e) => formData.setEmailField(e.target.value)}
						/>
						<button
							className="bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800 py-1 px-3 ml-4"
							onClick={(e) => {
								e.preventDefault();
                                formData.setEmailFieldErr("");
                                if (!formData.emailField.trim()) {
                                    formData.setEmailFieldErr("Cannot be empty");
                                    return;
                                }
                                if (
                                    !formData.emailField.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                                ) {
                                    formData.setEmailFieldErr("Invalid email pattern");
                                    return;
                                }
								members.add(formData.emailField);
                                formData.setEmailField("");
							}}
						>
							Add
						</button>
					</div>
					{formData.emailFieldErr && (
						<span className="mb-4 text-red-600 block">
							{formData.emailFieldErr}
						</span>
					)}
				</div>
				{members.emails.length > 0 ? (
					members.emails.map((u) => (
						<div
							className="flex flex-row flex-nowrap justify-between items-center mb-4 border max-w-2xl p-4 rounded"
							key={u.id}
						>
							<input
								type="text"
								id={`${u.id}`}
								name={`${u.id}`}
								value={u.email}
								onChange={(e) => {
                                    e.preventDefault();
                                    formData.setEmailFieldErr("");
                                    if (
                                        !e.target.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                                    ) {
                                        formData.setEmailFieldErr("All member emails must have a valid email pattern.");
                                    }
									members.edit(u, e.target.value);
								}}
							></input>
							<button
								className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2"
								onClick={(e) => {
									e.preventDefault();
									members.remove(u);
								}}
							>
								Remove
							</button>
						</div>
					))
				) : (
					<p className="text-xl text-neutral-900">
						There are no added members yet.
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
