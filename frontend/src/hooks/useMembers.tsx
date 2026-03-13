import { useState } from "react";

export default function useMembers(initialEmails: User[] = []) {
	const [emails, setEmails] = useState<User[]>(initialEmails);

	const add = (email: string): void => {
		setEmails([
            {
				email: email,
				id: crypto.randomUUID(),
			},
			...emails,
		]);
	};

	const edit = (user: User, email: string): void => {
		setEmails([
			...emails.map((u) =>
				u.id === user.id
					? {
							...user,
							email: email,
						}
					: u,
			),
		]);
	};

	const remove = (user: User): void => {
		setEmails([...emails.filter((u) => u.id !== user.id)]);
	};

	return {
		add,
		edit,
		remove,
        emails,
	};
}
