import useLocalStorage from "./useLocalStorage";

export default function useComments(initial: ProjectComment[] = [], projectId: string) {
    const [list, setList] = useLocalStorage<ProjectComment[]>(`project/${projectId}/comments`, initial ?? []);

	const post = async (content: string, userEmail: string): Promise<void> => {
        const newComment: ProjectComment = {
            title: content,
            id: crypto.randomUUID(),
            email: userEmail,
        };
        
		setList([...list, newComment]);
	};

	const remove = async (comment: ProjectComment): Promise<void> => {
		setList([...list.filter((c) => c.id !== comment.id)]);
	};

    return {
        list,
        setList,
        post,
        remove,
    };
}
