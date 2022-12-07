import React from "react";
import Link from "next/link";

interface FloatingButtonProps {
	children: React.ReactNode;
	href: string;
}

export default function FloatingButton({children, href}: FloatingButtonProps) {
	return (
		<Link href={href} legacyBehavior>
			<a
				className={"fixed bg-pantone-light hover:bg-pantone border-0 aspect-square border-transparent transition-colors cursor-pointer bottom-24 right-5 shadow-xl  rounded-full w-14 flex items-center justify-center text-white"}>
				{children}
			</a>
		</Link>
	);
}