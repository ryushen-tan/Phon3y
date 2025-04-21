import { signUp } from "../services/account-services";
import React from "react";

export function useSignUp() {
    const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            await signUp({ email, password });
            window.location.href = '/login'; 
        } catch (error) {
            console.error('Sign Up Failed:', error);
        }
    };

    return { handleSignUp };
}