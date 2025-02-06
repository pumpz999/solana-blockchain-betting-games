import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6">Blockchain Gaming Platform</h1>
        <p className="text-xl mb-8">Revolutionizing Gaming with Blockchain Technology</p>
        
        <div className="flex space-x-4 justify-center">
          <Link 
            href="/admin/configuration" 
            className="bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-lg transition duration-300 font-semibold"
          >
            Admin Configuration
          </Link>
          
          <Link 
            href="/games" 
            className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg transition duration-300 font-semibold"
          >
            Play Games
          </Link>
        </div>
      </div>
    </main>
  );
}
