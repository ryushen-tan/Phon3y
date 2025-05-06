import React from "react";
import { signIn } from "../services/account-services";
import { useAuthStore } from "../store/globalStore";
import { useNavigate } from "react-router-dom";

export function useSignIn() {
    const navigate = useNavigate();
    const { setUser } = useAuthStore(); 
    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            navigate("/dashboard"); // Redirect to home page after successful sign-in
        } catch (error) {
            console.error('Sign In Failed:', error);
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

    return { handleSignIn, handleChange, submitDisabled, formValues };
}