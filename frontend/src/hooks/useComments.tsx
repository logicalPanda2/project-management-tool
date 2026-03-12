import { useState } from "react";

export default function useComments(initial: ProjectComment[] = []) {
    const [list, setList] = useState<ProjectComment[]>(initial);
	const [commentField, setCommentField] = useState<string>("");
    const [commentFieldErr, setCommentFieldErr] = useState<string>("");

	const post = (): void => {
        setCommentFieldErr("");

        if(!commentField.trim()) setCommentFieldErr("Cannot be empty");

        const newComment = {
            user: "User 1",
            title: commentField,
            id: crypto.randomUUID(),
        };

		setList([...list, newComment]);
		setCommentField("");
	};

	const remove = (comment: ProjectComment): void => {
		setList([...list.filter((c) => c.id !== comment.id)]);
	};

    return {
        list,
        commentField,
        setCommentField,
        commentFieldErr,
        setCommentFieldErr,
        post,
        remove,
    };
}
