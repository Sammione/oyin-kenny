import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, XCircle, AlertCircle, RefreshCcw, Loader2 } from 'lucide-react'
import { verifyQrToken } from '../lib/actions'
import { Html5QrcodeScanner } from 'html5-qrcode'

type ScanResult = {
  status: 'VALID' | 'INVALID' | 'ALREADY_CHECKED_IN'
  guest?: string
  message: string
  checkInTime?: string | Date | null
} | null

export default function AdminScan() {
  const [scanResult, setScanResult] = useState<ScanResult>(null)
  const [loading, setLoading] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)
  const scannerRegionId = 'qr-reader'

  useEffect(() => {
    if (!scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        scannerRegionId,
        { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 },
        false
      )
      
      scanner.render(handleScanSuccess, handleScanError)
      scannerRef.current = scanner
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error)
        })
      }
    }
  }, [])

  const handleScanSuccess = async (decodedText: string) => {
    if (loading) return
    
    if (scannerRef.current) {
      scannerRef.current.pause()
    }
    
    setLoading(true)
    
    try {
      const result = await verifyQrToken(decodedText)
      // @ts-ignore
      setScanResult(result)
    } catch (error) {
      setScanResult({
        status: 'INVALID',
        message: 'Network error. Please try again.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleScanError = () => {
    // Expected while looking for codes
  }

  const handleReset = () => {
    setScanResult(null)
    if (scannerRef.current) {
      scannerRef.current.resume()
    }
  }

  return (
    <div className="min-h-screen bg-stone-900 text-white flex flex-col">
      <header className="p-4 flex items-center justify-between bg-stone-950 border-b border-stone-800">
        <Link to="/admin/dashboard" className="text-stone-400 hover:text-white flex items-center">
          <ArrowLeft size={20} className="mr-2" />
          Dashboard
        </Link>
        <h1 className="font-semibold tracking-wide">Event Check-in</h1>
        <div className="w-20"></div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 size={48} className="animate-spin text-[#CC5500] mb-4" />
            <p className="text-stone-400">Verifying Pass...</p>
          </div>
        ) : scanResult ? (
          <div className="w-full max-w-sm bg-white text-stone-900 rounded-2xl p-8 text-center shadow-2xl">
            {scanResult.status === 'VALID' && (
              <>
                <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-700 mb-1">APPROVED</h2>
                <h3 className="text-xl font-medium mb-4">{scanResult.guest}</h3>
                <p className="text-stone-500 mb-8">{scanResult.message}</p>
              </>
            )}

            {scanResult.status === 'ALREADY_CHECKED_IN' && (
              <>
                <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={40} className="text-yellow-600" />
                </div>
                <h2 className="text-2xl font-bold text-yellow-700 mb-1">ALREADY CHECKED IN</h2>
                <h3 className="text-xl font-medium mb-4">{scanResult.guest}</h3>
                <p className="text-stone-500 mb-2">{scanResult.message}</p>
                {scanResult.checkInTime && (
                  <p className="text-sm text-stone-400 mb-8">
                    Time: {new Date(scanResult.checkInTime).toLocaleTimeString()}
                  </p>
                )}
              </>
            )}

            {scanResult.status === 'INVALID' && (
              <>
                <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <XCircle size={40} className="text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-red-700 mb-4">INVALID PASS</h2>
                <p className="text-stone-500 mb-8">{scanResult.message}</p>
              </>
            )}

            <button
              onClick={handleReset}
              className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer"
            >
              <RefreshCcw size={18} className="mr-2" />
              Scan Next Guest
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md">
            <div className="bg-stone-800 rounded-2xl overflow-hidden p-4 shadow-2xl">
              <div id={scannerRegionId} className="w-full rounded-xl overflow-hidden bg-black" />
            </div>
            <p className="text-center text-stone-400 mt-6 text-sm">
              Point camera at the guest's QR code pass
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
