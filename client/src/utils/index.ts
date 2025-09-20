import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export function isLoggedIn(): boolean {

    const token = useSelector((state: RootState) => state.auth.token);

    if (!token) return false;

    try {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // check expiration
    } catch {
        return false;
    }
}