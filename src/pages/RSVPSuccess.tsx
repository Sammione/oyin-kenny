import { useState, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { CheckCircle2, Home, Download, Loader2 } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default function RSVPSuccess() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const attending = searchParams.get('attending') === 'true'

  const [downloading, setDownloading] = useState(false)
  const ivCardRef = useRef<HTMLDivElement>(null)

  const downloadPDF = async () => {
    if (!ivCardRef.current) return
    setDownloading(true)
    try {
      const canvas = await html2canvas(ivCardRef.current, { scale: 2, useCORS: true })
      const imgData = canvas.toDataURL('image/jpeg', 1.0)
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })
      
      pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height)
      pdf.save('Oyinkansiye_Kehinde_Wedding_Invitation.pdf')
    } catch (error) {
      console.error('Failed to generate PDF', error)
      alert('Failed to download the invitation. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

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
        {/* Hidden IV Card strictly for PDF Download */}
        <div className="fixed -left-[9999px] top-0">
          <div ref={ivCardRef} className="w-[800px] bg-white text-center flex flex-col items-center justify-center relative overflow-hidden" style={{ height: '1200px' }}>
            <div className="absolute inset-0 bg-[#556B2F] opacity-10"></div>
            
            <div className="z-10 bg-white/90 p-12 rounded-3xl m-8 shadow-2xl border-4 border-[#CC5500]/20 flex flex-col items-center">
              <h3 className="uppercase tracking-[0.2em] text-sm text-[#556B2F] font-semibold mb-2">The Families Of</h3>
              <h2 className="uppercase tracking-[0.1em] text-md text-[#CC5500] font-bold mb-1">Pastor and Pastor (Mrs) Adeleke Abon</h2>
              <h3 className="uppercase tracking-[0.1em] text-sm text-[#556B2F] font-semibold my-1">AND</h3>
              <h2 className="uppercase tracking-[0.1em] text-md text-[#CC5500] font-bold mb-6">Surveyor Oludiran Owolabi</h2>

              <p className="text-lg text-stone-700 mb-6 italic px-8">request the honour of your presence at the<br/>Traditional Wedding Ceremony of their beloved children</p>
              
              <h1 className="text-6xl font-serif text-[#556B2F] mb-4">Oyinkansiye Favour</h1>
              <h2 className="text-4xl font-serif text-[#CC5500] mb-4">&amp;</h2>
              <h1 className="text-6xl font-serif text-[#556B2F] mb-8">Kehinde Joseph</h1>
              
              <div className="w-48 h-[2px] bg-[#CC5500] mb-8"></div>
              
              <div className="text-2xl text-[#556B2F] font-semibold mb-2">Saturday, 14th of November, 2026</div>
              <div className="text-xl text-stone-600 mb-8">Time: 10:00 A.M.</div>
              
              <div className="text-2xl text-[#556B2F] font-semibold mb-2">Venue:</div>
              <div className="text-xl text-stone-600 font-medium">Oba Sir Olateru Olagbegi II, K.B.E. Civic Centre</div>
              <div className="text-lg text-stone-600 mb-8">Fajuyi Road, Owo, Ondo State</div>

              <div className="bg-[#CC5500] text-white px-6 py-2 rounded-full font-semibold tracking-wider text-sm">
                STRICTLY BY INVITATION (ADMITS ONE)
              </div>
            </div>
            
            <img src="/DSC_1918-Edit.jpg" alt="Couple" className="absolute bottom-0 left-0 w-full h-[500px] object-cover opacity-60 mix-blend-overlay" />
          </div>
        </div>

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
            
            <button 
              onClick={downloadPDF}
              disabled={downloading}
              className="w-full flex items-center justify-center bg-[#CC5500] hover:bg-[#994000] text-white py-4 rounded-xl font-bold transition-colors shadow-lg disabled:opacity-70 mb-4"
            >
              {downloading ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2" size={20} />}
              Download Official e-IV Card
            </button>
            
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
