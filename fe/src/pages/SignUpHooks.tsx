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

    const [formValues, setFormValues] = React.useState({
            email: "",
            password: "",
            confirmPassword: ""
        });
    
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = event.target;
            setFormValues(prev => ({ ...prev, [name]: value }));
        };
        
        const submitDisabled = !formValues.email || formValues.password.length < 6 || (formValues.password !== formValues.confirmPassword);

    return { handleSignUp, formValues, handleChange, submitDisabled };
}