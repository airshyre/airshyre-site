import { ComponentProps } from "react";
import { MdOutlineMenu, MdArrowBack } from "react-icons/md";

type Props = {
  isOpen: boolean;
  onClick: ComponentProps<"button">["onClick"];
};

export const BurgerButton = ({ isOpen, onClick }: Props) => {
  return (
    <button onClick={onClick} className="rounded w-8 h-8 flex items-center justify-center hover:bg-gray-100">
      {isOpen ? <MdArrowBack className="h-6 w-6"/> : <MdOutlineMenu className="h-8 w-8" />}
    </button>
  );
};
