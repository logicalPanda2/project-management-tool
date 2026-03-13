import { Link, useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useState } from "react";
import useTasks from "../hooks/useTasks";
import useComments from "../hooks/useComments";

export default function ProjectView() {
    const params = useParams();

    if(!("id" in params)) return <NotFound />;

    // replace all data below with a fetch for project(params.id)
	const project = {
        title: "Placeholder project",
        description:
            "this is just a placeholder, folks. Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit. Longer description, act like this is important. This is definitely important.",
        status: "INCOMPLETE",
        id: crypto.randomUUID(),
    };
    const tasks = useTasks([
        {
            title: "This is a very very long text title made for the purposes of testing the wrapping capability of the task card.",
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
    ]);
	const comments = useComments([
		{
			user: "User 1",
			title: "Cool project my guy",
			id: crypto.randomUUID(),
		},
		{
			user: "User 2",
			title: "Looks good dude, good luck!",
			id: crypto.randomUUID(),
		},
	]);
	const [commentField, setCommentField] = useState<string>("");

    const postComment = (userEmail: string, content: string): void => {
        if(!commentField.trim()) return;
        
        comments.post(userEmail, content);
        setCommentField("");
    }

	return (
		<>
			<article>
				<section className="mb-10">
					<header className="max-w-2xl flex flex-col sm:flex-row justify-between md:items-center items-start flex-nowrap mb-5 gap-4">
                        <h2 className="text-3xl text-primary font-semibold">
                            {project.title}
                        </h2>
                        <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-md shadow-pressed bg-gradient px-3 py-0.5 ${project.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                            <span className={`rounded-full w-2 h-2 inline-block mr-2 ${project.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                            {project.status}
                        </p>
					</header>
					<p className="text-xl max-w-2xl text-secondary">
						{project.description}
					</p>
				</section>
				<section className="mb-10">
					<header>
						<h2 className="text-2xl mb-5">Tasks</h2>
					</header>
					{tasks.list.map((t) => (
                        <div
                            className="flex flex-col justify-between items-start relative mb-4 max-w-lg p-4 rounded-lg bg-default shadow-default hover:shadow-bold-hover transition-custom-all"
                            key={t.id}
                        >
                            <div className="flex sm:flex-row flex-col justify-between w-full items-start flex-nowrap mb-8 sm:mb-5 gap-4 sm:gap-0">
                                <p className="text-primary text-lg max-w-full sm:max-w-2/3">
                                    {t.title}
                                </p>
                                <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-[13px] shadow-pressed bg-gradient px-2.5 py-[2.5px] ${t.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                                    <span className={`rounded-full w-1.5 h-1.5 inline-block mr-2 ${t.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                                    {t.status}
                                </p>
                            </div>
                            <button
                                className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-success-dark hover:transform-[translateY(-1px)] text-success text-sm font-semibold stroke-success hover:stroke-success-dark"
                                onClick={() => tasks.editStatus(t, t.status === "COMPLETE" ? "INCOMPLETE" : "COMPLETE")}
                            >
                                <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                Done
                            </button>
                        </div>
                    ))}
				</section>
				<section className="mb-8">
					<header>
						<h2 className="text-2xl mb-5">Comments</h2>
					</header>
					{comments.list.length > 0 ? (
						comments.list.map((c) => (
							<div
								className="flex flex-col justify-between items-start relative mb-4 max-w-xl p-4 rounded-lg bg-default shadow-default gap-3 hover:shadow-bold-hover transition-custom-all"
								key={c.id}
							>
								<div className="mb-2">
									<p className="mb-2 text-secondary">{c.user}</p>
									<p className="text-lg">{c.title}</p>
								</div>
								<button
                                    className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-danger-dark hover:transform-[translateY(-1px)] text-danger text-sm font-semibold stroke-danger hover:stroke-danger-dark"
                                    onClick={() => comments.remove(c)}
                                >
                                    <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6l-1 14H6L5 6"/>
                                        <path d="M10 11v6M14 11v6"/>
                                        <path d="M9 6V4h6v2"/>
                                    </svg>
                                    Delete
                                </button>
							</div>
						))
					) : (
						<p className="text-lg text-secondary">
							There are no comments yet.
						</p>
					)}
					<div className="flex flex-row flex-nowrap items-center mt-8">
						<input
							required
							autoComplete="false"
							type="text"
							name="comment"
							id="commentInput"
							placeholder="Say something.."
							className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
							value={commentField}
							onChange={(e) => setCommentField(e.target.value)}
						/>
						<button
							className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary ml-4 hover:transform-[translateY(-1px)] "
							onClick={() => postComment("placeholderEmail", commentField)}
						>
							Post
						</button>
					</div>
				</section>
				<div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                    <Link
                        to={`edit`}
                        className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent flex flex-row flex-nowrap items-center stroke-neutral-800 hover:stroke-accent"
                    >
                        Edit
                        <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 ml-1.5 mt-0.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                    </Link>
                </div>
			</article>
		</>
	);
}
