import { useState } from "react";

export default function useProject(
    initialTitle: string = "",
    initialDescription: string = "",
    initialStatus: Status = "INCOMPLETE",
) {
    const [title, setTitle] = useState<string>(initialTitle ?? "");
	const [description, setDescription] = useState<string>(initialDescription ?? "");
    const [status, setStatus] = useState<Status>(initialStatus ?? "INCOMPLETE");

    async function updateStatus(
        id: string,
    ) {
        localStorage.setItem(`project/${id}`, JSON.stringify({
            title: title,
            description: description,
            status: status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE",
            id: id,
        }));
        setStatus(status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE");
    }

    return {
        title,
        description,
        status,
        setTitle,
        setDescription,
        setStatus,
        updateStatus, 
    };
}
