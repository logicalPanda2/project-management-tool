import useFormData from "../hooks/useFormData";
import useTasks from "../hooks/useTasks";
import useMembers from "../hooks/useMembers";
import { useEffect, useState } from "react";
import validateEmail from "../utils/validateEmail";
// import { useParams } from "react-router-dom";

export default function ProjectEdit() {
    // const params = useParams();

    // if(!("id" in params)) return <p>Project Creation Placeholder</p>;
    // if there is no id, return as is. if there is an id, populate hooks with fetched project data from (project(params.id));
    // set an additional mode inline flag to switch text depending on edit or create
    
	const formData = useFormData();
	const tasks = useTasks();
	const members = useMembers();
    const [projectStatus, setProjectStatus] = useState<Status>("INCOMPLETE");
    const isEditing = false;

	const sendData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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

        const taskErrString = "Title of task";
        const taskErrArray: string[] = [];
        const taskErrString2 = "cannot be empty";
		tasks.list.forEach((t, i) => {
			if (!t.title.trim())
				taskErrArray.push(`${i + 1}`);

            if(i === tasks.list.length - 1 && taskErrArray.length) {
                switch(taskErrArray.length) {
                    case 1:
                        formData.setTaskFieldErr(`${taskErrString} ${taskErrArray[0]} ${taskErrString2}`);
                        break;
                    case 2:
                        formData.setTaskFieldErr(`${taskErrString} ${taskErrArray[0]} and ${taskErrArray[1]} ${taskErrString2}`);
                        break;
                    default:
                        formData.setTaskFieldErr(
                            `${taskErrString} ${taskErrArray.slice(0, taskErrArray.length - 1).join(", ").concat(` and ${taskErrArray[taskErrArray.length - 1]}`)} ${taskErrString2}`
                        );
                }
            }
		});

        const emailErrString = "Email";
        const emailErrArray: string[] = [];
        const emailErrString2 = "has an invalid pattern";
        members.emails.forEach((m, i) => {
            if(!validateEmail(m.email))
                emailErrArray.push(`${i + 1}`);

            if(i === members.emails.length - 1 && emailErrArray.length) {
                switch(emailErrArray.length) {
                    case 1: 
                        formData.setEmailFieldErr(`${emailErrString} ${emailErrArray[0]} ${emailErrString2}`);
                        break;
                    case 2:
                        formData.setEmailFieldErr(`${emailErrString} ${emailErrArray[0]} and ${emailErrArray[1]} ${emailErrString2}`);
                        break;
                    default:
                        formData.setEmailFieldErr(
                            `${emailErrString} ${emailErrArray.slice(0, emailErrArray.length - 1).join(", ").concat(` and ${emailErrArray[emailErrArray.length - 1]}`)} ${emailErrString2}`
                        );
                }
            }
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

    useEffect(() => {
        if(!formData.emailFieldErr) return;

        if(formData.emailField.trim() && formData.emailFieldErr !== "Invalid email pattern") 
            formData.setEmailFieldErr("");
        if(validateEmail(formData.emailField) && formData.emailFieldErr !== "Cannot be empty") 
            formData.setEmailFieldErr("");
    }, [formData.emailField]);

	return (
		<form action="" className="max-w-xl">
			<section className="mb-10">
				<header>
					<h2 className="text-3xl mb-5 text-primary font-semibold">{isEditing ? "Edit project" : "New project"}</h2>
				</header>
				<div className="flex flex-col gap-1 mb-5">
					<label htmlFor="titleInput">Title</label>
					<input
						autoComplete="false"
						type="text"
						name="title"
						id="titleInput"
						className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
						value={formData.title}
						onChange={(e) => {
                            formData.setTitleErr("");
                            formData.setTitle(e.target.value)
                        }}
					/>
					{formData.titleErr && (
						<span className="text-sm text-danger-dark">{formData.titleErr}</span>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="descriptionInput">Description</label>
					<textarea
						autoComplete="false"
						name="description"
						id="descriptionInput"
						className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1 resize-none min-h-40 [scrollbar-width:none]"
						value={formData.description}
						onChange={(e) => {
                            formData.setDescriptionErr("");
                            formData.setDescription(e.target.value)
                        }}
					/>
					{formData.descriptionErr && (
						<span className="text-sm text-danger-dark">
							{formData.descriptionErr}
						</span>
					)}
				</div>
                {isEditing && <div className="mt-6 justify-between flex flex-row flex-nowrap items-center">
                    <button
                        className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-success-dark hover:transform-[translateY(-1px)] text-success font-semibold stroke-success hover:stroke-success-dark"
                        onClick={(e) => {
                            e.preventDefault();
                            setProjectStatus(projectStatus === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE");
                        }}
                    >
                        <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Finish project
                    </button>
                    <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-md shadow-pressed bg-gradient px-3 py-0.5 ${projectStatus === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                        <span className={`rounded-full w-2 h-2 inline-block mr-2 ${projectStatus === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                        {projectStatus}
                    </p>
                </div>}
			</section>
			<section className="mb-10">
				<header>
					<h2 className="text-2xl mb-5">Tasks</h2>
				</header>
                <button
                    className={`bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent-dark hover:transform-[translateY(-1px)] text-accent text-sm font-semibold stroke-accent hover:stroke-accent-dark ${formData.taskFieldErr ? "mb-2" : "mb-5"}`}
                    onClick={(e) => {
						e.preventDefault();
                        formData.setTaskFieldErr("");
						tasks.add();
					}}
                >
                    <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    New task
                </button>
				{formData.taskFieldErr && (
					<span className="text-sm text-danger-dark block mb-5">
						{formData.taskFieldErr}
					</span>
				)}
				{tasks.list.map((t) => {
					return (
						<div
                            className="flex flex-col justify-between items-start relative mb-4 max-w-lg p-4 rounded-lg bg-default shadow-default hover:shadow-bold-hover transition-custom-all"
                            key={t.id}
                            onClick={() => document.getElementById(t.id)?.focus()}
                        >
                            <div className="flex sm:flex-row flex-col justify-between w-full items-start flex-nowrap mb-8 sm:mb-5 gap-4 sm:gap-0">
                                <input
                                    type="text"
                                    autoComplete="false"
                                    className="text-primary text-lg focus-visible:outline-0 resize-none w-full sm:w-2/3 [scrollbar-width:none]"
                                    id={t.id}
                                    name={t.id}
                                    placeholder="Title"
                                    value={t.title}
                                    onChange={(e) => {
                                        formData.setTaskFieldErr("");
                                        tasks.editTitle(t, e.target.value);
                                    }}
                                />
                                <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-[13px] shadow-pressed bg-gradient px-2.5 py-[2.5px] ${t.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                                    <span className={`rounded-full w-1.5 h-1.5 inline-block mr-2 ${t.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                                    {t.status}
                                </p>
                            </div>
                            <div className="flex flex-row flex-nowrap gap-4">
                                <button
                                    className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-danger-dark hover:transform-[translateY(-1px)] text-danger text-sm font-semibold stroke-danger hover:stroke-danger-dark"
                                    onClick={() => {
                                        formData.setTaskFieldErr("");
                                        tasks.remove(t);
                                    }}
                                >
                                    <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6l-1 14H6L5 6"/>
                                        <path d="M10 11v6M14 11v6"/>
                                        <path d="M9 6V4h6v2"/>
                                    </svg>
                                    Delete
                                </button>
                                <button
                                    className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-success-dark hover:transform-[translateY(-1px)] text-success text-sm font-semibold stroke-success hover:stroke-success-dark"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        tasks.editStatus(t, t.status === "COMPLETE" ? "INCOMPLETE" : "COMPLETE");
                                    }}
                                >
                                    <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                    Done
                                </button>
                            </div>
                        </div>
					);
				})}
			</section>
			<section className="mb-10">
				<header>
					<h2 className="text-2xl mb-5">Members</h2>
				</header>
				<div>
					<div className={`flex flex-row flex-nowrap items-center ${formData.emailFieldErr ? "mb-1" : "mb-5"}`}>
						<input
							autoComplete="false"
							type="text"
							name="userEmail"
							id="userEmailInput"
							placeholder="Add someone.."
                            className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
							value={formData.emailField}
							onChange={(e) => formData.setEmailField(e.target.value)}
						/>
						<button
							className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent-dark hover:transform-[translateY(-1px)] text-accent text-sm font-semibold stroke-accent hover:stroke-accent-dark ml-4"
							onClick={(e) => {
								e.preventDefault();
                                formData.setEmailFieldErr("");
                                if (!formData.emailField.trim()) {
                                    formData.setEmailFieldErr("Cannot be empty");
                                    return;
                                }
                                if (
                                    !validateEmail(formData.emailField)
                                ) {
                                    formData.setEmailFieldErr("Invalid email pattern");
                                    return;
                                }

								members.add(formData.emailField);
                                formData.setEmailField("");
							}}
						>
                            <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
							Invite
						</button>
					</div>
					{formData.emailFieldErr && (
						<span className={`text-sm text-danger-dark inline-block ${members.emails.length ? "mb-5" : "mb-0"}`}>
							{formData.emailFieldErr}
						</span>
					)}
				</div>
				{(
					members.emails.map((u) => (
                        <div
                            className="flex flex-col justify-between items-start relative mb-4 max-w-lg p-4 rounded-lg bg-default shadow-default hover:shadow-bold-hover transition-custom-all"
                            key={u.id}
                            onClick={() => document.getElementById(u.id)?.focus()}
                        >
                            <div className="flex sm:flex-row flex-col justify-between w-full items-start flex-nowrap mb-8 sm:mb-5 gap-4 sm:gap-0">
                                <input
                                    type="text"
                                    autoComplete="false"
                                    className="text-primary text-lg focus-visible:outline-0 resize-none w-full sm:w-2/3 [scrollbar-width:none]"
                                    id={u.id}
                                    name={u.id}
                                    placeholder="Title"
                                    value={u.email}
                                    onChange={(e) => {
                                        formData.setEmailFieldErr("");
                                        members.edit(u, e.target.value);
                                    }}
                                />
                            </div>
                            <button
                                className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-danger-dark hover:transform-[translateY(-1px)] text-danger text-sm font-semibold stroke-danger hover:stroke-danger-dark"
                                onClick={() => {
                                    formData.setEmailFieldErr("");
                                    members.remove(u)
                                }}
                            >
                                <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6l-1 14H6L5 6"/>
                                    <path d="M10 11v6M14 11v6"/>
                                    <path d="M9 6V4h6v2"/>
                                </svg>
                                Remove
                            </button>
                        </div>
					))
				)}
			</section>
            <button
                className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-success-dark hover:transform-[translateY(-1px)] text-success text-sm font-semibold stroke-success hover:stroke-success-dark"
                onClick={(e) => sendData(e)}
                type="submit"
            >
                <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Confirm
            </button>
		</form>
	);
}
