import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-6">Blockchain Gaming Platform</h1>
        <div className="space-x-4">
          <Link 
            href="/admin" 
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100 transition"
          >
            Admin Panel
          </Link>
          <Link 
            href="/games" 
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition"
          >
            Play Games
          </Link>
        </div>
      </div>
    </main>
  );
}
