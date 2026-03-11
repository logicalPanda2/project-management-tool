import { useState } from "react";

export default function useEditing() {
    const [title, setTitle] = useState<string>("");
    const [titleErr, setTitleErr] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [descriptionErr, setDescriptionErr] = useState<string>("");

    return {
        title, setTitle,
        titleErr, setTitleErr,
        description, setDescription,
        descriptionErr, setDescriptionErr
    };
}
