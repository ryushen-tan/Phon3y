import { useAuthStore } from "../store/AuthStore";

export function useLandingPage() {
    const { isSignedIn } = useAuthStore();

    // const destinationUrl = isSignedIn ? "/dashboard" : "/login";

    const destinationUrl = "/transcribe";

    return { destinationUrl };
}