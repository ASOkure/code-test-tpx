export interface UrlRequest {
    fullUrl: string;
    customAlias?: string;
}

export interface UrlResponse {
    alias: string;
    fullUrl: string;
    shortUrl: string;
}

// <-- updated here
const BASE_URL = '/api/urls';

export async function createShortUrl(data: UrlRequest): Promise<UrlResponse> {
    const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create short URL');
    return res.json();
}

export async function getUrls(): Promise<UrlResponse[]> {
    const res = await fetch(`${BASE_URL}`);
    if (!res.ok) throw new Error('Failed to fetch URLs');
    return res.json();
}

export async function deleteUrl(alias: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${alias}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete URL');
}
