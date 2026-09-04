import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { CheckCircle2, Home } from 'lucide-react'

export default function RSVPSuccess() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const attending = searchParams.get('attending') === 'true'



  if (!token) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <p>Invalid registration details.</p>
          <Link to="/" className="text-[#CC5500] hover:underline mt-4 inline-block font-medium">Return home</Link>
        </div>
      </div>
    )
  }

  if (!attending) {
    return (
      <div className="min-h-screen bg-stone-50 py-12 px-4 flex flex-col justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-[#556B2F]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center p-8"
          >
            <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-stone-400" size={32} />
            </div>
            <h2 className="text-2xl font-serif text-[#37461E] mb-4">Thank you for letting us know!</h2>
            <p className="text-stone-600 mb-8">We will miss you at the celebration, but we appreciate you taking the time to RSVP.</p>
            
            <Link to="/" className="inline-flex items-center text-[#556B2F] hover:text-[#37461E] font-medium">
              <Home className="mr-2" size={18} />
              Return to Invitation
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-t-8 border-[#556B2F]">


        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-8"
        >
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="text-green-600" size={32} />
          </div>
          <h2 className="text-3xl font-serif text-[#37461E] mb-2">You're Confirmed!</h2>
          <p className="text-stone-600 mb-8">Your entry pass is ready. Please present this QR code at the venue.</p>
          
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 inline-block mb-8 shadow-sm">
            <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
              <QRCodeSVG 
                value={token} 
                size={200}
                bgColor="#ffffff"
                fgColor="#171717"
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-stone-500 uppercase tracking-widest font-semibold">Official Entry Pass</p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-stone-500 max-w-xs mx-auto mb-4">
              Take a screenshot of this page or save the QR code to your phone.
            </p>
            

            
            <div className="pt-2 flex justify-center space-x-4">
              <Link to="/" className="inline-flex items-center px-6 py-3 rounded-xl border-2 border-[#556B2F] text-[#556B2F] font-semibold hover:bg-[#556B2F] hover:text-white transition-colors">
                <Home size={18} className="mr-2" />
                Return Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
