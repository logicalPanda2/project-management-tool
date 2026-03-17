import { useState } from "react";
import api from "../api/api";
import type useTasks from "./useTasks";
import type useMembers from "./useMembers";

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
        tasks: ReturnType<typeof useTasks>,
        members: ReturnType<typeof useMembers>
    ) {
        try {
            await api.post(`/api/projects/${id}`, { 
                project: {
                    title: title,
                    description: description,
                    status: status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE",
                    id: id,
                },
                tasks: tasks.list,
                members: members.emails 
            });
            setStatus(status === "INCOMPLETE" ? "COMPLETE" : "INCOMPLETE");
        } catch(e) {
            console.error(e);
        }
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
