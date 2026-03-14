import { useEffect, useState } from "react";

export default function useFormData(initialTitle: string = "", initialDescription: string = "") {
	const [title, setTitle] = useState<string>(initialTitle);
	const [titleErr, setTitleErr] = useState<string>("");
	const [description, setDescription] = useState<string>(initialDescription);
	const [descriptionErr, setDescriptionErr] = useState<string>("");
    const [taskField, setTaskField] = useState<string>("");
    const [emailField, setEmailField] = useState<string>("");
    const [taskFieldErr, setTaskFieldErr] = useState<string>("");
    const [emailFieldErr, setEmailFieldErr] = useState<string>("");

    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
    }, [initialTitle, initialDescription]);

	return {
		title,
		setTitle,
		titleErr,
		setTitleErr,
		description,
		setDescription,
		descriptionErr,
		setDescriptionErr,
        taskField,
        setTaskField,
        emailField, 
        setEmailField,
        taskFieldErr, 
        setTaskFieldErr,
        emailFieldErr, 
        setEmailFieldErr,
	};
}
