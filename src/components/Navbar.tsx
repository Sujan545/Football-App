import { NavLink } from "react-router-dom";


export default function Navbar() {
    return (
        <header className=" w-full  bg-white">
            <nav className=" max-w-7xl mx-auto px-6 pb-2 pt-4">
                {/* Top Bar */}
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2  text-md">
                        <span className="">Elias</span>
                        <span className="text-primary">#</span>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-6 text-md">
                            <li><NavLink to="/" className="text-white flex  "> <p className="text-primary">#</p>home</NavLink></li>
                            <li><NavLink to="/competitions" className="text-gray flex"><p className="text-primary">#</p>competitions</NavLink></li>
                            <li><NavLink to="/area" className="text-gray flex"><p className="text-primary">#</p>area</NavLink></li>
                            <li><NavLink to="/contact" className="text-gray flex"><p className="text-primary">#</p>contacts</NavLink></li>
                        </ul>

                        {/* Language */}
                        <div className="flex gap-2 text-sm text-gray">
                            <select
                                defaultValue="EN"
                                className="bg-black text-xs text-gray  outline-none cursor-pointer"
                            >
                                <option value="EN">EN</option>
                                <option value="RU">RU</option>
                                <option value="UA">UA</option>
                            </select>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};