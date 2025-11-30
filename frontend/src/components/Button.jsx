import React from "react";

const Button = ({ children, onClick, className = "", primary = true }) => (
    <button
        onClick={onClick}
        className={`
            px-4 py-2 rounded-lg font-semibold transition shadow 
            ${primary
                ? "bg-orange-500 text-white hover:bg-orange-600"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}
            ${className}
        `}
    >
        {children}
    </button>
);

export default Button;
