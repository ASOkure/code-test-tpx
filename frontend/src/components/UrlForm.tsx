import { useState } from 'react';
import { createShortUrl, UrlRequest, UrlResponse } from '../api/urlApi';

interface Props {
    onUrlCreated: (url: UrlResponse) => void;
}

export default function UrlForm({ onUrlCreated }: Props) {
    const [fullUrl, setFullUrl] = useState('');
    const [customAlias, setCustomAlias] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const result = await createShortUrl({ fullUrl, customAlias });
            onUrlCreated(result);
            setFullUrl('');
            setCustomAlias('');
        } catch (err: any) {
            setError(err.message || 'Error creating short URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
            {error && <p className="text-red-600 mb-2">{error}</p>}
            <div className="flex gap-2">
                <input
                    type="url"
                    placeholder="Enter full URL"
                    value={fullUrl}
                    onChange={(e) => setFullUrl(e.target.value)}
                    required
                    className="border rounded px-2 py-1 flex-1"
                />
                <input
                    type="text"
                    placeholder="Custom alias (optional)"
                    value={customAlias}
                    onChange={(e) => setCustomAlias(e.target.value)}
                    className="border rounded px-2 py-1"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Shorten'}
                </button>
            </div>
        </form>
    );
}
