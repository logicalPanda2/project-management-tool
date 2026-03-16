import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import validateEmail from "../utils/validateEmail";
import api from "../api/api";

const LOGIN_PATH = "/login";

export default function Login() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if(token) 
            navigate("/", {
                replace: true,
            });
    }, [token]);

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
    const [emailErr, setEmailErr] = useState<string>("");
    const [passwordErr, setPasswordErr] = useState<string>("");
    const [registerToastVisible, setVisibility] = useState<boolean>(false);
    const location = useLocation();
    const mode: "REGISTER" | "LOGIN" = location.pathname === LOGIN_PATH ? "LOGIN" : "REGISTER";

    const switchMode = () => {
        navigate(mode === "LOGIN" ? "/register" : "/login", {
            replace: true,
        });
        setEmailErr("");
        setPasswordErr("");
        setEmail("");
        setPassword("");
    }

    const validate = (): boolean => {
        setEmailErr("");
        setPasswordErr("");

        let isInvalid = false;

        if(!email.trim()) {
            setEmailErr("Email cannot be empty");
            isInvalid = true;
        }
        
        if(email.trim() && !validateEmail(email)) {
            setEmailErr("Invalid email pattern");
            isInvalid = true;
        }

        if(!password.trim()) {
            setPasswordErr("Password cannot be empty");
            isInvalid = true;
        }

        if(isInvalid) return false;

        return true;
    }

    const sendData = async () => {
        if(!validate()) return false;

        if(mode === "LOGIN") {
            try {
                const res = await api.post("/api/auth/login", { email, password });
                if(res.status !== 200) throw new Error(`${res.status} ${res.statusText}`);
                const token = res.data;
                localStorage.setItem("token", JSON.stringify(token));
                navigate("/", {
                    replace: true,
                });
            } catch(e) {
                console.error(e);
                setPasswordErr("Invalid password");
            }
        } else if(mode === "REGISTER") {
            const res = await api.post("/api/auth/register", { email, password });
            if(res.status === 204) setVisibility(true);
            setEmail("");
            setPassword("");
        }

        return false;
    }

    useEffect(() => {
        if(email.trim() && emailErr !== "Invalid email pattern") setEmailErr("");
        if(validateEmail(email) && emailErr !== "Email cannot be empty") setEmailErr("");
        if(password.trim()) setPasswordErr("");
    }, [email, password]);

	return !token ? (
		<div className="flex justify-center items-center min-h-screen bg-default relative">
            {registerToastVisible && mode === "REGISTER" && <Link
                to={"/login"}
                className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent flex flex-row flex-nowrap items-center stroke-neutral-800 hover:stroke-accent absolute top-12 hover:transform-[translateY(-1px)]"
            >
                Success! Go to login
                <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 ml-1 mt-0.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
            </Link>}
			<main className="flex flex-col flex-nowrap justify-center w-2/3 max-w-md relative">
				<h1 className="text-4xl mb-8 text-primary">{mode === "LOGIN" ? "Log in to your account" : "Create a new account"}</h1>
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
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
						/>
                        {passwordErr && <span className="text-sm text-danger-dark">
                            {passwordErr}
                        </span>}
					</div>
					<input
						type="submit"
						value={mode === "LOGIN" ? "Submit" : "Register"}
						className="bg-gradient-dark text-light px-4 py-2 rounded-lg shadow-default-dark hover:shadow-hover-dark active:bg-gradient-dark-pressed transition-custom-all focus-visible:outline-[1.5px] focus-visible:outline-accent"
                        onClick={async (e) => {
                            e.preventDefault();
                            await sendData();
                        }}
					/>
				</form>
                <button
                    onClick={switchMode}
                    className="text-accent-dark inline hover:text-accent mt-4 no-underline hover:underline focus-visible:underline focus-visible:outline-0 self-start transition"
                >
                    {mode === "LOGIN" ? "Make a new account" : "Log in instead"}
                </button>
			</main>
		</div>
	) : <div className="min-h-screen min-w-screen bg-default"></div>;
}
