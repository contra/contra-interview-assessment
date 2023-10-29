import classNames from 'classnames';
/**
 * Create custom button in order to have uniform styling and functionality in our app
 */

type Props = {
    children: React.ReactNode,
    className?: string
    onClick?: React.MouseEventHandler,
    type?: ButtonType,
}

type ButtonType = "primary" | "secondary" | "submit";

type Style = {
    [key:string]: string
}

const baseStyle = "transition ease-in-out duration-300 active:bg-black hover:bg-violet-400 hover:shadow-xl focus:bg-black font-medium text-lg min-w-[130px] px-4 h-14 rounded-full shadow outline-none";
const styles:Style = {
    "primary": "bg-violet-700 text-white",
    "secondary": "border border-violet-200 text-gray-800 hover:text-white focus:text-white",
    "submit": "bg-violet-700 text-white",
};

const Button = ({children, className = "", onClick = () => {}, type = "primary"}: Props) => {
    return <button 
        className={classNames(baseStyle, styles[type], className)} 
        onClick={onClick} 
        type={type === "submit"?"submit":"button"}
        >
            {children}
        </button>
}

export default Button;