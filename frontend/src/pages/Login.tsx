import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className="flex justify-center items-center md:min-h-screen min-h-[75vh]">
            <main className="flex flex-col flex-nowrap justify-center w-2/3 max-w-md">
                <h1 className="text-4xl mb-8">Log in to your account</h1>
                <form action="" className="flex flex-col gap-6" autoComplete="false">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="emailInput">EMAIL</label>
                        <input 
                            required
                            autoComplete="false"
                            type="text"
                            name="email"
                            id="emailInput"
                            placeholder="Email"
                            className="border rounded focus-visible:outline-1 px-4 py-2"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="passwordInput">PASSWORD</label>
                        <input
                            required
                            autoComplete="false"
                            type="password"
                            name="password"
                            id="passwordInput"
                            placeholder="Password"
                            className="border rounded focus-visible:outline-1 px-4 py-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Submit"
                        className="bg-black text-white px-4 py-2 rounded mt-2 focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 transition"
                    />
                </form>
            </main>
        </div>
    );
}
