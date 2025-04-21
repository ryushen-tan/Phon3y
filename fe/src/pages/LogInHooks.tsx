import { signIn } from "../services/account-services";
import React from "react";

export function useSignIn() {

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {

            await signIn({ email, password });
            window.location.href = '/dashboard'; 
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