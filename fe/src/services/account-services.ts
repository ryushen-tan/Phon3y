import { useMutation } from '@tanstack/react-query';
import { fetchJson } from './base-fetch';

export interface accountData {
    email: string;
    password: string;
}

export async function signUp(data: accountData): Promise<void> {
    const response: any = await fetchJson('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response;
}

export async function signIn(data: accountData): Promise<void> {
    const response: any = await fetchJson('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response;
}

export function useLoginMutation() {
    return useMutation<void, Error, accountData>({ mutationFn: signIn });
}

export function useSignupMutation() {
    return useMutation<void, Error, accountData>({ mutationFn: signUp });
}