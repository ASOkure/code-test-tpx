import { useEffect, useState } from 'react';
import UrlForm from './components/UrlForm';
import UrlTable from './components/UrlTable';
import { getUrls, UrlResponse } from './api/urlApi';

function App() {
  const [urls, setUrls] = useState<UrlResponse[]>([]);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    const data = await getUrls();
    setUrls(data);
  };

  const handleUrlCreated = (url: UrlResponse) => {
    setUrls([url, ...urls]);
  };

  const handleDelete = (alias: string) => {
    setUrls(urls.filter((u) => u.alias !== alias));
  };

  return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">URL Shortener</h1>
        <UrlForm onUrlCreated={handleUrlCreated} />
        <UrlTable urls={urls} onDelete={handleDelete} />
      </div>
  );
}

export default App;

