'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + 1;
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  // Auth Check
  useEffect(() => {
    const isLoggedIn = false;

    if (isLoggedIn) {
      router.replace('/chat');
    } else {
      router.replace('/login');
    }
  }, [router]);

  return (
    <main className="flex items-center justify-center h-screen bg-white">
      <div className="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </main>
  );
}
