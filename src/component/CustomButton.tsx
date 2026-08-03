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
    fullWidth?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Spinner = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="loader"></div>

            <style>{`
        .loader {
          width: 36px;
          --b: 8px;
          aspect-ratio: 1;
          border-radius: 50%;
          padding: 1px;
          background: conic-gradient(#0000 10%, #ffffff) content-box;

          -webkit-mask:
            repeating-conic-gradient(
              #0000 0deg,
              #000 1deg 20deg,
              #0000 21deg 36deg
            ),
            radial-gradient(
              farthest-side,
              #0000 calc(100% - var(--b) - 1px),
              #000 calc(100% - var(--b))
            );

          -webkit-mask-composite: destination-in;
          mask-composite: intersect;

          animation: loaderSpin 1s infinite steps(10);
        }

        @keyframes loaderSpin {
          to {
            transform: rotate(1turn);
          }
        }
      `}</style>
        </div>
    );
};

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    variant = "primary",
    size = "md",
    type = "button",
    disabled = false,
    loading = false,
    className = "",
    fullWidth = false,
    onClick,
}) => {
    const variants: Record<
        NonNullable<CustomButtonProps["variant"]>,
        string
    > = {
        primary: "bg-gradient-to-r from-red-500 to-rose-600 h-[50px]  hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red-500/40 text-white",
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
        disabled:opacity-80
        disabled:cursor-not-allowed
         flex items-center justify-center
        ${variants[variant]}
        ${sizes[size]}
          ${fullWidth ? "w-full" : "w-auto"}
         ${className}
      `}
        >
            {loading ? (

                <Spinner />

            ) : (
                label
            )}
        </button>
    );
};

export default CustomButton;