import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Blockchain Gaming Platform</h1>
        <div className="space-x-4">
          <Link 
            href="/admin" 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Admin Panel
          </Link>
          <Link 
            href="/games" 
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Play Games
          </Link>
        </div>
      </div>
    </div>
  )
}
