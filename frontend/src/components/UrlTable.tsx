import { UrlResponse, deleteUrl } from '../api/urlApi';

interface Props {
    urls: UrlResponse[];
    onDelete: (alias: string) => void;
}

export default function UrlTable({ urls, onDelete }: Props) {
    const handleDelete = async (alias: string) => {
        try {
            await deleteUrl(alias);
            onDelete(alias);
        } catch (err) {
            alert('Failed to delete URL');
        }
    };

    if (urls.length === 0) return <p>No URLs yet.</p>;

    return (
        <table className="min-w-full border">
            <thead>
            <tr className="bg-gray-100">
                <th className="border px-2 py-1">Original URL</th>
                <th className="border px-2 py-1">Short URL</th>
                <th className="border px-2 py-1">Alias</th>
                <th className="border px-2 py-1">Actions</th>
            </tr>
            </thead>
            <tbody>
            {urls.map((url) => (
                <tr key={url.alias}>
                    <td className="border px-2 py-1">{url.fullUrl}</td>
                    <td className="border px-2 py-1">
                        <a href={url.shortUrl} target="_blank" className="text-blue-600 hover:underline">
                            {url.shortUrl}
                        </a>
                    </td>
                    <td className="border px-2 py-1">{url.alias}</td>
                    <td className="border px-2 py-1">
                        <button
                            onClick={() => handleDelete(url.alias)}
                            className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
