import useClickOutside from "../../hooks/useClickOutside";
import Btn, { BtnProps } from "./Btn";
import {
	ComponentProps,
	PropsWithChildren,
	ReactNode,
	createContext,
	useContext,
	useRef,
	useState,
	ElementType,
	useEffect,
} from "react";
import { createPortal } from "react-dom";

const Context = createContext<{
	isOpen: boolean;
	setIsOpen: (_val: boolean) => void;
}>({ isOpen: false, setIsOpen: () => {} });
function useModale() {
	return useContext(Context);
}
interface ModaleProps {
	children: ReactNode;
	open?: boolean;
}
const root = ({ children, open = false }: ModaleProps) => {
	const [isOpen, setOpen] = useState(open);
	const setIsOpen = (val: boolean) => {
		setOpen(val);
		if (val) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}
	};
	return (
		<Context.Provider value={{ isOpen, setIsOpen }}>
			{children}
		</Context.Provider>
	);
};
const Portal = ({ children }: PropsWithChildren) => {
	const { isOpen } = useModale();
	if (isOpen == false) return null;
	return createPortal(children, window.document.body);
};
const Overlayer = ({ children, ...props }: ComponentProps<"div">) => {
	return (
		<div
			className=" bg-gray-700/30 flex  justify-center items-center backdrop-blur-lg fixed inset-0 z-50"
			{...props}
		>
			{children}
		</div>
	);
};
const Close = ({ children, onClick, ...props }: BtnProps) => {
	const { setIsOpen } = useModale();
	return (
		<Btn
			{...props}
			onClick={(e) => {
				setIsOpen(false);
			}}
		>
			{children}
		</Btn>
	);
};
const Open = ({ children, ...props }: BtnProps) => {
	const { setIsOpen } = useModale();
	return (
		<Btn {...props} onClick={() => setIsOpen(true)}>
			{children}
		</Btn>
	);
};
const Content = <T extends ElementType>({
	as = "div",
	...props
}: { as?: T } & ComponentProps<T>) => {
	const { setIsOpen } = useModale();
	const ref = useRef(null);
	useClickOutside(ref, (e) => {
		e.stopPropagation();
		setIsOpen(false);
	});
	const Component = as;
	return <Component ref={ref} {...props} />;
};
let Modale = {
	root,
	Portal,
	Overlayer,
	Open,
	Close,
	Content,
};
export default Modale;
