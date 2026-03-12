import { useState } from "react";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	return (
		<div className="flex justify-center items-center md:min-h-screen min-h-[75vh] bg-default">
			<main className="flex flex-col flex-nowrap justify-center w-2/3 max-w-md">
				<h1 className="text-4xl mb-8 text-primary">Log in to your account</h1>
				<form
					action=""
					className="flex flex-col gap-6"
					autoComplete="false"
				>
					<div className="flex flex-col gap-1">
						<label htmlFor="emailInput" className="text-primary">Email</label>
						<input
							required
							autoComplete="false"
							type="text"
							name="email"
							id="emailInput"
							placeholder="Email"
							className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-default focus-visible:shadow-pressed focus-visible:outline-0 transition-custom-all"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="passwordInput" className="text-primary">Password</label>
						<input
							required
							autoComplete="false"
							type="password"
							name="password"
							id="passwordInput"
							placeholder="Password"
							className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-default focus-visible:shadow-pressed focus-visible:outline-0 transition-custom-all"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<input
						type="submit"
						value="Submit"
						className="bg-gradient-dark text-light px-4 py-2 rounded-lg shadow-default-dark hover:shadow-hover-dark active:bg-gradient-dark-pressed transition-custom-all"
					/>
				</form>
			</main>
		</div>
	);
}
