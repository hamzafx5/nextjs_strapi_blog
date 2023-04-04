import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const [open, setOpen] = useState(false);
    return (
        <nav className="container">
            <div className=" py-4 lg:py-[30px] flex items-center justify-between gap-4">
                <Link href="/">
                    <Image width={145} height={40} src="/images/logo.svg" alt="Logo" />
                </Link>
                <div
                    style={{
                        right: open ? "0" : "-255px",
                    }}
                    className="fixed transition-all duration-300 z-50 md:static top-0 right-0 border-r border md:border-none w-[250px] h-screen md:h-auto md:w-auto bg-white p-4 md:p-0 "
                >
                    <button
                        onClick={(_) => setOpen(false)}
                        className="md:hidden rounded-full p-[1px] bg-[#f1f2f3] hover:bg-[#ebebeb]"
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="32"
                            width="32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                        </svg>
                    </button>
                    <ul className="flex md:items-center flex-col md:flex-row gap-4 lg:gap-[52px] pt-14 pb-8 md:p-0">
                        <LinkItem href="/" label="Anatomie" />
                        <LinkItem href="/" label="Präpkurs" />
                        <LinkItem href="/" label="Histologie" />
                        <LinkItem href="/" label="Quiz" />
                    </ul>
                    <div className="md:hidden">
                        <FreeTrailButton />
                    </div>
                </div>

                <div className="flex gap-[11px]">
                    <div className="hidden md:block">
                        <FreeTrailButton />
                    </div>
                    <Link href="/">
                        <Image width={32} height={32} src="/images/profile.svg" alt="Profile" />
                    </Link>
                    <button className="md:hidden" onClick={(_) => setOpen(true)}>
                        <Image width={32} height={32} src="/images/menu.svg" alt="Menu" />
                    </button>
                </div>
            </div>
        </nav>
    );
}

function FreeTrailButton() {
    return (
        <button className="bg-black h-[32px] pr-4 pl-[4px] rounded-[32px] text-white flex gap-[6px] items-center">
            <Image width={24} height={24} src="/images/crown.svg" alt="Crown" />
            <span className="text-[14px] font-semibold leading-none whitespace-nowrap">
                Free Trial ends in 2 days
            </span>
        </button>
    );
}

function LinkItem({ label, href }) {
    return (
        <li>
            <Link className="font-semibold hover:opacity-70 text-[14px] lg:text-base" href={href}>
                {label}
            </Link>
        </li>
    );
}
