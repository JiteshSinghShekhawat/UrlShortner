import { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortenedUrl('');

    try {
      const response = await fetch('http://localhost:8001/api/create-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      setShortenedUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <div className="form-container">
        <h1>URL Shortener</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="Enter your URL here"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <button type="submit">Shorten</button>
        </form>
        {shortenedUrl && (
          <div className="result">
            <p>Shortened URL:</p>
            <a href={"http://localhost:8001/api/"+shortenedUrl} target="_blank" rel="noopener noreferrer">
              {shortenedUrl}
            </a>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default App;
