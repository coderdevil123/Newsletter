import Image from "next/image";
import SubscribeForm from "@/components/SubscribeForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-12 bg-gray-50 dark:bg-black text-gray-900 dark:text-white">
      {/* Logo (optional) */}
      <div className="mb-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={160}
          height={40}
          priority
        />
      </div>

      {/* Newsletter Form Section */}
      <main className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">📬 Join Our Newsletter</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          Subscribe to get the latest updates directly in your inbox.
        </p>
        <SubscribeForm />
      </main>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-500 flex gap-6 flex-wrap justify-center">
        <a
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:underline"
        >
          <Image src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
