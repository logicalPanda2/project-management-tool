import { useState } from "react";

export default function useComments(initial: ProjectComment[] = []) {
    const [list, setList] = useState<ProjectComment[]>(initial);

	const post = (content: string): void => {
        const newComment = {
            user: "User 1",
            title: content,
            id: crypto.randomUUID(),
        };

		setList([...list, newComment]);
	};

	const remove = (comment: ProjectComment): void => {
		setList([...list.filter((c) => c.id !== comment.id)]);
	};

    return {
        list,
        post,
        remove,
    };
}
