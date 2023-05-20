import React from "react";

export default function Footer() {
    return (
        <footer className="bg-black text-white p-6">
            <p className="text-center text-sm">
                {new Date().getFullYear()} &copy; Alle Rechte vorbehalten Anatomian
            </p>
        </footer>
    );
}
