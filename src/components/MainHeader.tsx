import { Btn, Icons } from "./ui";
import { FC, useState } from "react";

interface MainHeaderProps {}

const MainHeader: FC<MainHeaderProps> = ({}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<header
			data-isopen={isOpen}
			className=" group data-[isopen=false]:-translate-x-full transition-transform sm:!translate-x-0 z-40 flex flex-col bg-white  justify-between items-center py-12 fixed top-0 left-0 h-screen w-[113px] shadow "
		>
			<Btn variant="ghost" className=" text-black">
				<Icons.burgerMenu className="h-8 w-8" />
			</Btn>
			<Btn
				onClick={() => setIsOpen((prev) => !prev)}
				className=" sm:hidden rounded-e-full absolute top-10 left-full"
			>
				<Icons.arrowLeft className=" group-data-[isopen=false]:rotate-180 transition-transform" />
			</Btn>
			<nav className=" my-8 h-full">
				<ul className=" flex flex-col gap-4">
					<li>
						<Icons.home className="h-8 w-8" />
					</li>
					<li>
						<Icons.list className="h-8 w-8" />
					</li>
				</ul>
			</nav>
			<Btn variant="ghost" className=" text-black">
				<Icons.setting className="h-8 w-8" />
			</Btn>
		</header>
	);
};

export default MainHeader;
