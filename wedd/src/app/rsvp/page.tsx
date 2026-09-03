'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { registerGuest } from '../actions'
import { ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RSVPPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    
    try {
      const result = await registerGuest(formData)
      
      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }

      if (result.success && result.guest) {
        // Redirect to success page with token
        router.push(`/rsvp/success?token=${result.guest.qrToken}&attending=${result.guest.attending}`)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto">
        <Link href="/" className="inline-flex items-center text-[#556B2F] hover:text-[#37461E] mb-8 font-medium">
          <ArrowLeft size={18} className="mr-2" />
          Back to Invitation
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-stone-100"
        >
          <div className="bg-[#556B2F] p-6 text-center text-white">
            <h1 className="text-3xl font-serif mb-2">RSVP</h1>
            <p className="text-white/80">Please let us know if you can make it</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none transition-all"
                  placeholder="e.g. Jane Doe"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#CC5500] focus:border-transparent outline-none transition-all"
                  placeholder="e.g. 08012345678"
                />
                <p className="text-xs text-stone-500 mt-2">We'll use this to find your reservation if you come back.</p>
              </div>

              <div className="pt-2">
                <p className="block text-sm font-medium text-stone-700 mb-3">
                  Will you be joining us?
                </p>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                    <input type="radio" name="attending" value="true" required className="w-5 h-5 text-[#CC5500] focus:ring-[#CC5500] border-gray-300" />
                    <span className="ml-3 text-stone-800 font-medium">Yes, I will be attending</span>
                  </label>
                  
                  <label className="flex items-center p-4 border border-stone-200 rounded-lg cursor-pointer hover:bg-stone-50 transition-colors">
                    <input type="radio" name="attending" value="false" required className="w-5 h-5 text-[#556B2F] focus:ring-[#556B2F] border-gray-300" />
                    <span className="ml-3 text-stone-800 font-medium">Sorry, I won't be able to attend</span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#CC5500] hover:bg-[#994000] text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center shadow-lg disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  'Confirm Attendance'
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
