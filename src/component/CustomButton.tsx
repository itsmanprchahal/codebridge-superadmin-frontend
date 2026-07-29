import React from "react";

interface CustomButtonProps {
    label: string;
    variant?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "outline"
    | "ghost";
    size?: "sm" | "md" | "lg";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    loading = false,
    className = "",
    onClick,
}) => {
    const variants: Record<
        NonNullable<CustomButtonProps["variant"]>,
        string
    > = {
        primary: "bg-gradient-to-r w-full from-red-500 to-rose-600  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40 text-white",
        secondary: "bg-gray-600 hover:bg-gray-700 text-white",
        success: "bg-green-600 hover:bg-green-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
    };

    const sizes: Record<NonNullable<CustomButtonProps["size"]>, string> = {
        sm: "px-3 py-2 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    };

    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`
        rounded-lg
        font-medium
        transition-all
        duration-300
        cursor-pointer
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        >
            {loading ? "Loading..." : label}
        </button>
    );
};

export default CustomButton;