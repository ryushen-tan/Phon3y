export async function fetchJson<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
}

export async function fetchNoContent(input: RequestInfo, init?: RequestInit): Promise<void> {
    const response = await fetch(input, init);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
}