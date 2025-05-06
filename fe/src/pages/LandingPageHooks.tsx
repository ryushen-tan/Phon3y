import { useAuthStore } from "../store/globalStore";

export function useLandingPage() {
    // const destinationUrl = "/dashboard";
    const { isSignedIn } = useAuthStore();

    const destinationUrl = isSignedIn ? "/dashboard" : "/login";

    return { destinationUrl };
}