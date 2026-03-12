import { useState } from "react";

export default function useMembers(initialEmails: User[] = [], memberCount: number = 0) {
	const [count, setCount] = useState<number>(memberCount);
	const [emails, setEmails] = useState<User[]>(initialEmails);

	const add = (email: string): void => {
		setEmails([
			...emails,
			{
				email: email,
				id: count,
			},
		]);

		setCount((c) => c + 1);
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
