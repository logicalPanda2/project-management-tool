import { useEffect } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

export default function Root() {
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(!("account" in params)) redirect();
    }, [params]);

    const assignDifferentRole = () => {
        const url = window.location.pathname;
        const currentRole = localStorage.getItem("current");
        if(currentRole === "CREATOR") {
            localStorage.setItem("current", "CONTRIBUTOR");
            return navigate(url.replace("admin", "contributor"), {
                replace: true,
            });
        } else if(currentRole === "CONTRIBUTOR") {
            localStorage.setItem("current", "CREATOR");
            return navigate(url.replace("contributor", "admin"), {
                replace: true,
            });
        }

        return navigate("/404", {
            replace: true,
        });
    }
    
    function redirect() {
        const currentRole = localStorage.getItem("current");
        if(currentRole === "CREATOR")
            return navigate("/admin", {
                replace: true,
            });
        else if(currentRole === "CONTRIBUTOR")
            return navigate("/contributor", {
                replace: true,
            });
    }

	return (
		<div className="flex flex-col flex-nowrap min-h-screen relative bg-default">
			<header className="flex flex-col md:flex-row flex-nowrap justify-between md:items-center sticky top-0 px-12 py-6 z-10 bg-transparent backdrop-blur-lg border-b-neutral-200 border-b">
				<h1 className="text-3xl md:text-4xl mb-6 md:mb-0 text-primary">
					Project Management Tool
				</h1>
				<nav className="border-t-neutral-400 border-t md:border-0 pt-6 md:pt-0">
					<ul className="flex flex-row flex-nowrap items-center gap-4 md:gap-8">
						<li>
                            <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                                <Link
                                    to={"/"}
                                    className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary"
                                >
                                    Home
                                </Link>
                            </div>
						</li>
						<li>
                            <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                                <button
                                    onClick={assignDifferentRole}
                                    className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary"
                                >
                                    Switch user
                                </button>
                            </div>
						</li>
					</ul>
				</nav>
			</header>
			<main className="flex flex-col grow flex-nowrap p-12">
				<Outlet />
			</main>
		</div>
	);
}
