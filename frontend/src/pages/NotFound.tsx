import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="min-h-screen p-12">
            <h1 className="text-4xl mb-4">404 Not Found</h1>
            <p className="text-2xl mb-8">The page you were looking for does not exist.</p>
            <Link to={"/"} className="text-2xl underline hover:no-underline focus-visible:outline-0 focus-visible:no-underline">Back to Home</Link>
        </main>
    );
}
