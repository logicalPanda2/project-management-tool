import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <>
            <p>Root layout for shared state</p>
            <Outlet />
        </>
    )
}
