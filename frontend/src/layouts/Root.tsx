import { Link, Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div className="flex flex-col flex-nowrap min-h-screen relative">
            <header className="flex flex-col md:flex-row flex-nowrap justify-between md:items-center sticky top-0 p-12">
                <h1 className="text-4xl mb-6 md:mb-0">Project Management Tool</h1>
                <nav className="border-t md:border-0 pt-6 md:pt-0">
                    <ul className="flex flex-row flex-nowrap items-center gap-4 md:gap-8">
                        <li>
                            <Link 
                                to={"/"} 
                                className="bg-black rounded text-white px-4 py-1.5 focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 transition"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to={"/create"} 
                                className="bg-black rounded text-white px-4 py-1.5 focus-visible:outline-0 focus-visible:bg-neutral-900 hover:bg-neutral-900 active:bg-neutral-800 transition"
                            >
                                New
                            </Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <main className="flex flex-col grow flex-nowrap p-12 pt-0">
                <Outlet />
            </main>
        </div>
    )
}
