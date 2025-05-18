import { useAuthStore } from "../../store/AuthStore";

export function useNavbar() {

    const { isSignedIn, setUser } = useAuthStore(); // Assuming you have a global store for authentication
    const userValue = isSignedIn ? "SIGN OUT" : "LOGIN | SIGNUP";
    const userDesitinationUrl = isSignedIn ? `/` : "/login";
    
    const handleUserClick = () => {
        if (isSignedIn) {
            setUser(null, false); // Clear user data and set isSignedIn to false
            window.location.href = "/";
        } else {
            window.location.href = "/login";
        }
    }


    return { userValue, userDesitinationUrl, handleUserClick };
}