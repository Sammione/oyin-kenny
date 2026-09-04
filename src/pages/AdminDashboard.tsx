import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Users, CheckCircle, XCircle, QrCode, ScanLine, LogOut, Loader2, RefreshCw } from 'lucide-react'
import { getDashboardStats } from '../lib/actions'
import ExportCsvButton from '../components/ExportCsvButton'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [data, setData] = useState<{
    stats: {
      totalRegistered: number
      totalAttending: number
      totalNotAttending: number
      totalCheckedIn: number
    }
    guests: any[]
  }>({
    stats: { totalRegistered: 0, totalAttending: 0, totalNotAttending: 0, totalCheckedIn: 0 },
    guests: []
  })

  const loadStats = async () => {
    setLoading(true)
    setFetchError(null)
    const res = await getDashboardStats()
    if (res.error) {
      setFetchError(res.error)
    } else {
      setData(res)
    }
    setLoading(false)
  }

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth')
    if (!auth) {
      navigate('/admin/login')
      return
    }
    loadStats()
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-[#37461E]">Wedding Admin</h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={loadStats}
              className="p-2 text-stone-500 hover:text-stone-800 rounded-lg hover:bg-stone-100 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
            <Link 
              to="/admin/scan" 
              className="inline-flex items-center text-sm bg-[#CC5500] hover:bg-[#994000] text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <ScanLine size={16} className="mr-2" />
              Open Scanner
            </Link>
            <button 
              onClick={handleLogout}
              className="text-stone-500 hover:text-stone-800 p-2 cursor-pointer" 
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Banner */}
        {fetchError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-5 mb-6 flex flex-col gap-2">
            <p className="font-bold">⚠️ Could not load guest data</p>
            <p className="text-sm font-mono">{fetchError}</p>
            <p className="text-sm text-red-500 mt-1">
              This is usually a <strong>Row Level Security (RLS)</strong> issue. Please run the SQL fix in your{' '}
              <a href="https://supabase.com/dashboard/project/wwimzywqkeiadgymhidq/sql" target="_blank" rel="noreferrer" className="underline font-semibold">Supabase SQL Editor</a>.
            </p>
          </div>
        )}
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-stone-500 mb-2">
              <Users size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Total Registered</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{data.stats.totalRegistered}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-green-600 mb-2">
              <CheckCircle size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Attending</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{data.stats.totalAttending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-red-500 mb-2">
              <XCircle size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Not Attending</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{data.stats.totalNotAttending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-[#556B2F] mb-2">
              <QrCode size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Checked In</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{data.stats.totalCheckedIn}</p>
          </div>
        </div>

        {/* Guest Table */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-800">Guest List</h2>
            <ExportCsvButton guests={data.guests} />
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-sm border-b border-stone-200">
                  <th className="p-4 font-medium">Name</th>
                  <th className="p-4 font-medium">Phone</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Check-in</th>
                  <th className="p-4 font-medium">Registered Date</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-stone-500">
                      <Loader2 className="animate-spin inline-block mr-2" size={20} />
                      Loading guest list...
                    </td>
                  </tr>
                ) : data.guests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-stone-500">
                      No guests registered yet.
                    </td>
                  </tr>
                ) : (
                  data.guests.map((guest: any) => (
                    <tr key={guest.id} className="border-b border-stone-100 hover:bg-stone-50 transition-colors">
                      <td className="p-4 font-medium text-stone-800">{guest.name}</td>
                      <td className="p-4 text-stone-600">{guest.phone}</td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          guest.attending 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {guest.attending ? 'Attending' : 'Not Attending'}
                        </span>
                      </td>
                      <td className="p-4">
                        {guest.attending ? (
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            guest.checkedIn 
                              ? 'bg-[#556B2F]/20 text-[#37461E]' 
                              : 'bg-stone-100 text-stone-500'
                          }`}>
                            {guest.checkedIn ? 'Checked In' : 'Pending'}
                          </span>
                        ) : (
                          <span className="text-stone-400">-</span>
                        )}
                      </td>
                      <td className="p-4 text-stone-500">
                        {new Date(guest.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
