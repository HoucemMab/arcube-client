"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { getOriginalUrl } from "../services/url/url";

export default function RedirectPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (!params.shortUrl) return;

    const fetchOriginalUrl = async () => {
      try {
        const { originalUrl } = await getOriginalUrl(params.shortUrl as string);

        if (originalUrl) {
          router.push(originalUrl);
        } else {
          setError("Short URL not found");
          setIsLoading(false);
        }
      } catch (err) {
        setError("An error occurred while fetching the original URL");
        setIsLoading(false);
      }
    };

    fetchOriginalUrl();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Loader2 className="animate-spin mb-4" size={48} />
        <p>Redirecting to the original URL...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return null;
}
