import { useState } from "react";

export default function useEditing(initialTitle: string = "", initialDescription: string = "") {
	const [title, setTitle] = useState<string>(initialTitle);
	const [titleErr, setTitleErr] = useState<string>("");
	const [description, setDescription] = useState<string>(initialDescription);
	const [descriptionErr, setDescriptionErr] = useState<string>("");

	return {
		title,
		setTitle,
		titleErr,
		setTitleErr,
		description,
		setDescription,
		descriptionErr,
		setDescriptionErr,
	};
}
