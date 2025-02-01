"use client";
import { useState } from "react";
import { createShortUrl } from "../services/url/url";
import { ClipboardCopy, Loader2 } from "lucide-react";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    console.log("🚀 ~ isValidUrl ~ error:", error);
    return false;
  }
};
export default function UrlShortenerForm() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isValidUrl(longUrl)) {
      setError("❌ Please enter a valid URL (e.g., https://example.com)");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const { shortCode } = await createShortUrl(longUrl);

      if (shortCode) {
        setShortUrl(`${window.location.origin}/${shortCode}`);
      }
    } catch (error) {
      console.error("Error shortening URL:", error);
      setError("❌ Failed to shorten the URL. Please try again.");
    }
    setIsLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="longUrl"
          >
            Long URL
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            id="longUrl"
            type="url"
            placeholder="https://example.com/very/long/url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
          />
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin inline-block mr-2" size={20} />
                Loading...
              </>
            ) : (
              "Shorten URL"
            )}{" "}
          </button>
        </div>
      </form>
      {shortUrl && (
        <div
          className="bg-white border border-black text-black px-4 py-3 rounded relative"
          role="alert"
        >
          <div className="flex items-center justify-between">
            <div>
              <strong className="font-bold">Shortened URL: </strong>
              <span className="block sm:inline break-all">
                <a
                  href={shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {shortUrl}
                </a>
              </span>
            </div>
            <button
              onClick={handleCopy}
              className="ml-2 p-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              title="Copy to clipboard"
            >
              <ClipboardCopy size={20} />
            </button>
          </div>
          {copied && (
            <p className="mt-2 text-sm text-green-600">Copied to clipboard!</p>
          )}
        </div>
      )}
    </div>
  );
}
