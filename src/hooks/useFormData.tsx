import { useState } from "react";

export default function useFormData() {
    const [titleErr, setTitleErr] = useState<string>("");
    const [descriptionErr, setDescriptionErr] = useState<string>("");
    const [taskField, setTaskField] = useState<string>("");
    const [emailField, setEmailField] = useState<string>("");
    const [taskFieldErr, setTaskFieldErr] = useState<string>("");
    const [emailFieldErr, setEmailFieldErr] = useState<string>("");

	return {
        titleErr,
        setTitleErr,
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
