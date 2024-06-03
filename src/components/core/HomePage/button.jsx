import React from "react";
import { Link } from "react-router-dom";

const Button = ({children , active , linkto}) => {
    return (
        <Link to = {linkto}>
            <div className={`text-center text-[13px] px-6 py-3 font-bold  rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]
        ${active ? "bg-yellow-50 text-black  ": "bg-richblack-800 text-white"} hover:scale-95 transition-all duration-200 `}>{children}</div>
        </Link>
    )
}

export default Button;