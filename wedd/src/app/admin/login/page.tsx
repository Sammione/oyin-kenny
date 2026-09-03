'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string

    // Super simple auth for MVP: 
    // In a real app we'd use NextAuth or verify against DB + set httpOnly cookie.
    // Here we'll do a basic check and set a client cookie for simplicity.
    if (password === 'admin123') { // Replace with env var in prod
      document.cookie = "admin_auth=true; path=/; max-age=86400"
      router.push('/admin/dashboard')
    } else {
      setError('Invalid password')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#556B2F]/10 text-[#556B2F] rounded-full mb-4">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-serif text-[#37461E]">Admin Portal</h1>
          <p className="text-stone-500 mt-2">Enter the admin password to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none transition-all text-center text-lg"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#556B2F] hover:bg-[#37461E] text-white py-4 rounded-xl font-bold transition-colors flex items-center justify-center shadow-md disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
