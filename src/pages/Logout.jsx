import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../services/operations/authAPI";


const LogOut = () => {
    const dispatch = useDispatch();

    dispatch(logout());
    return (
        <div>
            <p>you have been logout!!</p>
            <button onSubmit={logout()}>LogOut</button>
        </div>
    )
}


export default LogOut;