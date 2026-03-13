import { useState } from "react";
import validateEmail from "../utils/validateEmail";

export default function Login() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");

    const validate = (): boolean => {
        setEmailErr("");
        setPasswordErr("");

        if(!email.trim()) 
            setEmailErr("Email cannot be empty");
        
        if(email.trim() && !validateEmail(email)) 
            setEmailErr("Invalid email pattern");

        if(!password.trim())
            setPasswordErr("Password cannot be empty");

        if(emailErr || passwordErr) return false;

        return true;
    }

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
							className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
							value={email}
							onChange={(e) => {
                                if(email.trim() && emailErr !== "Invalid email pattern") setEmailErr("");
                                if(validateEmail(email) && emailErr !== "Email cannot be empty") setEmailErr("");
                                setEmail(e.target.value);
                            }}
						/>
                        {emailErr && <span className="text-sm text-danger-dark">
                            {emailErr}
                        </span>}
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="passwordInput" className="text-primary">Password</label>
						<input
							required
							autoComplete="false"
							type="password"
							name="password"
							id="passwordInput"
							className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
							value={password}
							onChange={(e) => {
                                if(password.trim()) setPasswordErr("");
                                setPassword(e.target.value)
                            }}
						/>
                        {passwordErr && <span className="text-sm text-danger-dark">
                            {passwordErr}
                        </span>}
					</div>
					<input
						type="submit"
						value="Submit"
						className="bg-gradient-dark text-light px-4 py-2 rounded-lg shadow-default-dark hover:shadow-hover-dark active:bg-gradient-dark-pressed transition-custom-all focus-visible:outline-[1.5px] focus-visible:outline-accent focus-visible:border-white focus-visible:border"
                        onClick={(e) => {
                            e.preventDefault();
                            validate();
                        }}
					/>
				</form>
			</main>
		</div>
	);
}
