"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignOut from "../Auth/SignOut";

const links = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Technologies", url: "#technologies" },
    { id: 3, title: "Contact", url: "/contact" },
];

const Menu = () => {
    const [open, setOpen] = useState(false);

    const { data: session } = useSession();

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <div>
            {/* Open/Close button */}
            <div
                className="cursor-pointer bg hover:scale-110"
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "25px",
                    zIndex: "1000",
                }}
            >
                {/* You can adjust the styling further as needed */}
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    {open ? (
                        <>
                            <path d="M6 18L18 6M6 6l12 12" />
                        </>
                    ) : (
                        <>
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </>
                    )}
                </svg>
            </div>

            {/* Menu */}
            {open && (
                <div className="bg-[#050214] text-white font-poppins fixed inset-0 flex flex-col gap-8 items-center justify-center text-3xl z-10">
                    {links.map((item) => (
                        <Link
                            href={item.url}
                            prefetch={true}
                            key={item.id}
                            onClick={() => setOpen(false)}
                        >
                            {item.title}
                        </Link>
                    ))}

                    {!session ? (
                        <Link onClick={() => setOpen(false)} href="/signin">
                            SignIn
                        </Link>
                    ) : (
                        <div className="flex flex-col gap-8 items-center justify-center text-3xl">
                            <Link href="/profile" onClick={() => setOpen(false)} className="flex gap-2">
                                <span>Profile</span>
                            </Link>
                            <div className="flex gap-2">
                                <SignOut onClick={() => setOpen(false)} href="/" />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Menu;
