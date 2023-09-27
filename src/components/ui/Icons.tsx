import { ReactNode } from "react";
import {
	AiOutlineClose,
	AiOutlineLeft,
	AiOutlineMenu,
	AiOutlinePlus,
	AiOutlineHome,
	AiOutlineUpload,
	AiOutlineEdit,
	AiOutlineOrderedList,
	AiOutlineSetting,
	AiOutlineBars,
} from "react-icons/ai";

const Icons = ({ children }: { children: ReactNode }) => children;
Icons.error = AiOutlineClose;
Icons.burgerMenu = AiOutlineMenu;
Icons.plus = AiOutlinePlus;
Icons.home = AiOutlineHome;
Icons.upload = AiOutlineUpload;
Icons.edit = AiOutlineEdit;
Icons.list = AiOutlineOrderedList;
Icons.setting = AiOutlineSetting;
Icons.arrowLeft = AiOutlineLeft;
Icons.linebars = AiOutlineBars;
export default Icons;
