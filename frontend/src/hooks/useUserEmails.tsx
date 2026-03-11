import { useState } from "react";

export default function useUserEmails() {
    const [userEmail, setUserEmail] = useState<string>("");
    const [userCounter, setUserCounter] = useState<number>(0);
    const [userErr, setUserErr] = useState<string>("");
    const [userEmails, setUserEmails] = useState<User[]>([]);

    const add = (): void => {
		setUserErr("");

		if (!userEmail.trim()) {
			setUserErr("Cannot be empty");
			return;
		}

		if (
			!userEmail.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		) {
			setUserErr("Invalid email pattern");
			return;
		}

		setUserEmails([
			...userEmails,
			{
				email: userEmail,
				id: userCounter,
			},
		]);

		setUserEmail("");
        setUserCounter(c => c + 1);
	};

    const editEmail = (user: User, email: string): void => {
        setUserErr("");

        if (
			!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		) {
			setUserErr("Invalid email pattern");
		}

        setUserEmails([
            ...userEmails.map(u => u.id === user.id ? {
                ...user,
                email: email,
            } : u)
        ]);
    }

	const remove = (
		user: User,
	): void => {
		setUserEmails([...userEmails.filter((u) => u.id !== user.id)]);
	};

    return {
        userEmail,
        setUserEmail,
        userEmails,
        userErr,
        setUserErr,
        add,
        editEmail,
        remove,
    }
}