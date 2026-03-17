import { Link, Outlet, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useState } from "react";

export default function Root() {
    const navigate = useNavigate();
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const logOut = async (): Promise<void> => {
        await api.post("/api/auth/logout");
        localStorage.removeItem("token");
        navigate("/login", {
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
                                <Link
                                    to={"/project/new"}
                                    className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary"
                                >
                                    New
                                </Link>
                            </div>
						</li>
					</ul>
				</nav>
			</header>
			<main className="flex flex-col grow flex-nowrap p-12">
				<Outlet />
			</main>
            <button
                className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-danger-dark hover:transform-[translateY(-1px)] text-danger text-sm font-semibold stroke-danger hover:stroke-danger-dark self-end mb-6 mr-8"
                onClick={() => setModalVisible(true)}
            >
                Log out
            </button>
            {modalVisible && <div className="absolute min-h-screen min-w-screen inset-0 bg-[rgba(0,0,0,0.2)] z-10 flex justify-center items-center">
                <div
                    className="max-w-sm md:w-4/5 mb-6 p-6 bg-gradient rounded-2xl relative"
                >
                    <p className="text-primary text-2xl mb-8">Are you sure you want to log out?</p>
                    <div className="flex flex-row gap-12 justify-center flex-nowrap">
                        <button
                            className="bg-gradient shadow-default px-5 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-danger-dark hover:transform-[translateY(-1px)] text-danger font-semibold stroke-danger hover:stroke-danger-dark"
                            onClick={logOut}
                        >
                            Log out
                        </button>
                        <button
                            className="bg-gradient shadow-default text-primary px-5 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary hover:transform-[translateY(-1px)]"
                            onClick={() => setModalVisible(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>}
		</div>
	);
}
