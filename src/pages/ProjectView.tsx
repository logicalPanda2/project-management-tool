import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import useComments from "../hooks/useComments";
import useProject from "../hooks/useProject";

export default function ProjectView() {
    const params = useParams();
    const navigate = useNavigate();

    if(!("id" in params) || !("account" in params)) navigate("/404", {
        replace: true,
    });

    const allProjects: Project[] = JSON.parse(localStorage.getItem("projects")!);
    const filtered: Project | Project[] = allProjects.filter(p => p.id === params.id);
    const target: Project = Array.isArray(filtered) ? filtered[0] : filtered;
    const project = useProject(target.title, target.description, target.status);
    const members: User[] = JSON.parse(localStorage.getItem(`project/${params.id}/members`)!);
    const tasks = useTasks([], params.id!);
	const comments = useComments([], params.id!);

    useEffect(() => {
        let exhausted = false;
        let encounteredInvitation = false;

        members.forEach((m, i) => {
            if(i === members.length - 1) exhausted = true;

            if(m.email.startsWith(params.account!)) encounteredInvitation = true;
            
            if(exhausted && !encounteredInvitation) navigate("/404", {
                replace: true,
            });
        });
    }, [members]);
    
    return <Content 
        project={project}
        tasks={tasks}
        comments={comments}
        updateProjectStatus={() => project.updateStatus(params.id!)}
        account={params.account!}
    />;
}

function Content({
    project,
    tasks,
    comments,
    updateProjectStatus,
    account,
}: {
    project: ReturnType<typeof useProject>,
    tasks: ReturnType<typeof useTasks>,
    comments: ReturnType<typeof useComments>,
    updateProjectStatus: () => void,
    account: string,
}) {
    const [commentField, setCommentField] = useState<string>("");
    const [toastVisible, setVisible] = useState<boolean>(false);
    const [undoCallback, setUndoCallback] = useState<Function | null>(null);
    const timeoutId = useRef<number>(-1);
    const softDeleteDelay = 8000;
    const role = account === "admin" ? localStorage.getItem("admin_role") : localStorage.getItem("contributor_role");
    const email = account === "admin" ? localStorage.getItem("admin_email")! : localStorage.getItem("contributor_email")!;

    const softDelete = (
        deleteCallback: (...args: any[]) => any,
        undoCallback: (...args: any[]) => any,
    ) => {
        setVisible(true);
        setUndoCallback(() => undoCallback);

        timeoutId.current = setTimeout(() => {
            deleteCallback();
            setVisible(false);
            setUndoCallback(null);
        }, softDeleteDelay);
    }

    return (
		<>
			<article className="relative">
				<section className="mb-10">
                    <h2 className="text-3xl text-primary font-semibold wrap-anywhere hyphens-auto min-w-0 max-w-2xl mb-4">
                        {project?.title}
                    </h2>
					<p className="text-xl max-w-2xl text-secondary">
						{project?.description}
					</p>
                    <div className="mt-6 justify-between flex flex-col sm:flex-row flex-nowrap items-start sm:items-center max-w-xl">
                        <p className={`flex flex-row flex-nowrap items-center rounded-xl font-semibold text-md shadow-pressed bg-gradient px-3 py-0.5 ${project.status === "INCOMPLETE" ? "text-neutral-800/50" : "text-success"}`}>
                            <span className={`rounded-full w-2 h-2 inline-block mr-2 ${project.status === "INCOMPLETE" ? "bg-neutral-800/40" : "bg-text-success"}`}></span>
                            {project.status}
                        </p>
                        {role === "CREATOR" && <button
                            className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-success-dark hover:transform-[translateY(-1px)] text-success font-semibold stroke-success hover:stroke-success-dark mt-4 sm:mt-0"
                            onClick={(e) => {
                                e.preventDefault();
                                updateProjectStatus();
                            }}
                        >
                            <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            Finish project
                        </button>}
                    </div>
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
									<p className="mb-2 text-secondary">{c.email}</p>
									<p className="text-lg">{c.title}</p>
								</div>
								{(role === "CREATOR" || email === c.email) && <button
                                    className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-danger-dark hover:transform-[translateY(-1px)] text-danger text-sm font-semibold stroke-danger hover:stroke-danger-dark"
                                    onClick={() => {
                                        softDelete(
                                            () => comments.remove(c), 
                                            () => comments.setList([...comments.list])
                                        );
                                        comments.setList([...comments.list.filter(comment => comment.id !== c.id)]);
                                    }}
                                >
                                    <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                        <polyline points="3 6 5 6 21 6"/>
                                        <path d="M19 6l-1 14H6L5 6"/>
                                        <path d="M10 11v6M14 11v6"/>
                                        <path d="M9 6V4h6v2"/>
                                    </svg>
                                    Delete
                                </button>}
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
							onClick={() => {
                                if(!commentField.trim()) return;
        
                                comments.post(commentField, email);
                                setCommentField("");
                            }}
						>
							Post
						</button>
					</div>
				</section>
				{role === "CREATOR" && <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                    <Link
                        to={`edit`}
                        className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent flex flex-row flex-nowrap items-center stroke-neutral-800 hover:stroke-accent"
                    >
                        Edit
                        <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 ml-1.5 mt-0.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                    </Link>
                </div>}
                {toastVisible && <button 
                    onClick={() => {
                        clearTimeout(timeoutId.current);
                        timeoutId.current = -1;
                        setVisible(false);
                        if(undoCallback) undoCallback();
                    }}
                    className="fixed left-8 bottom-6 bg-gradient shadow-default text-primary px-3 text-sm py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary"
                >
                    Comment deleted. Undo
                </button>}
			</article>
		</>
	);
}
