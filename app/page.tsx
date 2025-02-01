import Image from "next/image";
import UrlShortenerForm from "./components/UrlShortenerForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">URL Shortener</h1>
      <UrlShortenerForm />
    </main>
  );
}
