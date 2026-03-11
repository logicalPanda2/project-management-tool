import { useState } from "react";

export default function useEditing() {
    const [title, setTitle] = useState<string>("");
    const [titleErr, setTitleErr] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [descriptionErr, setDescriptionErr] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskErr, setTaskErr] = useState<string>("");
    const [userEmail, setUserEmail] = useState<string>("");
    const [userCounter, setUserCounter] = useState<number>(0);
    const [userErr, setUserErr] = useState<string>("");
    const [userEmails, setUserEmails] = useState<User[]>([]);

    return {
        title, setTitle,
        titleErr, setTitleErr,
        description, setDescription,
        descriptionErr, setDescriptionErr,
        tasks, setTasks,
        taskErr, setTaskErr,
        userEmail, setUserEmail,
        userCounter, setUserCounter,
        userErr, setUserErr,
        userEmails, setUserEmails
    };
}
