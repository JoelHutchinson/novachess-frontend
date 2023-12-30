import NavLinks from "./nav-links";

export default function SideNav () {
    return (
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4">
                <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">Novachess</h5>
            </div>
            <NavLinks />
        </div>
    );
};