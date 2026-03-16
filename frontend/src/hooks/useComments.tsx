import { useState } from "react";
import api from "../api/api";

export default function useComments(initial: ProjectComment[] = []) {
    const [list, setList] = useState<ProjectComment[]>(initial ?? []);

	const post = async (content: string, projectId: string, userEmail: string): Promise<void> => {
        const newComment: ProjectComment = {
            title: content,
            id: crypto.randomUUID(),
            email: userEmail,
        };

        await api.post(`/api/projects/${projectId}/comments`, { comment: newComment });
        
		setList([...list, newComment]);
	};

	const remove = async (comment: ProjectComment, projectId: string): Promise<void> => {
        await api.delete(`/api/projects/${projectId}/comments/${comment.id}`);

		setList([...list.filter((c) => c.id !== comment.id)]);
	};

    return {
        list,
        setList,
        post,
        remove,
    };
}
