import { useState } from "react";

export default function useProject(
    initialTitle: string = "",
    initialDescription: string = "",
    initialStatus: Status = "INCOMPLETE",
) {
    const [title, setTitle] = useState<string>(initialTitle ?? "");
	const [description, setDescription] = useState<string>(initialDescription ?? "");
    const [status, setStatus] = useState<Status>(initialStatus ?? "INCOMPLETE");

    return {
        title,
        description,
        status,
        setTitle,
        setDescription,
        setStatus, 
    };
}
