import React from "react";
import { signIn } from "../services/account-services";
import { useAuthStore } from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
    const navigate = useNavigate();
    const { setUser, message, setMessage } = useAuthStore(); 
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setMessage(""); // Clear previous message
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        try {
            const response = await signIn({ email, password });
            const data = JSON.parse(response.data);

            setUser({
                id: data.user.id,
                email: data.user.email,
                name: data.user.user_metadata.full_name,
            }, true);

            setMessage(data.message); // Set the message in the store

            navigate("/dashboard"); // Redirect to home page after successful sign-in

        } catch (error: any) {
            console.error('Sign In Failed:', error);
            // Try to extract error message from backend response
            let msg = "Login failed";
            if (error?.response) {
                try {
                    const errData = await error.response.json?.();
                    msg = errData?.error || errData?.message || msg;
                } catch {
                    msg = error.response.statusText || msg;
                }
            } else if (error?.message) {
                msg = error.message;
            }
            setMessage(msg);
        }
    };

    const [formValues, setFormValues] = React.useState({
        email: "",
        password: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const submitDisabled = !formValues.email || !formValues.password;

    return { handleSignIn, handleChange, submitDisabled, formValues, message };
}