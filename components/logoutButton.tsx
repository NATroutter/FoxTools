'use client'

import React from "react";
import {FiLogOut} from "react-icons/fi";
import {deleteCookie} from "cookies-next";

export function LogoutButton() {

	const logout = () => {
		deleteCookie('auth');
		localStorage.clear();
		window.location.reload();
	}

	return (
		<FiLogOut onClick={logout}/>
	)
}
