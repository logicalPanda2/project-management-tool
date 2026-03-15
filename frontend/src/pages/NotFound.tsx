import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<main className="min-h-screen flex justify-center items-center">
			<h1 className="flex flex-col flex-nowrap items-center text-center">
                <span className="text-8xl text-primary mb-6">404</span>
                <span className="text-2xl text-secondary mx-12 mb-8 max-w-4/5">The page you were looking for does not exist or you do not have the necessary privileges.</span>
                <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                    <Link
                        to={"/"}
                        className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent flex flex-row flex-nowrap items-center stroke-neutral-800 hover:stroke-accent"
                    >
                        Go back
                        <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 ml-1 mt-0.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                    </Link>
                </div>
            </h1>
		</main>
	);
}
