import { getDashboardStats } from '@/app/actions'
import Link from 'next/link'
import { Users, CheckCircle, XCircle, QrCode, ScanLine, LogOut } from 'lucide-react'
import ExportCsvButton from './ExportCsvButton'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const { stats, guests } = await getDashboardStats()

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      <header className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-serif font-bold text-[#37461E]">Wedding Admin</h1>
          <div className="flex items-center gap-4">
            <Link 
              href="/admin/scan" 
              className="inline-flex items-center text-sm bg-[#CC5500] hover:bg-[#994000] text-white px-4 py-2 rounded-lg transition-colors"
            >
              <ScanLine size={16} className="mr-2" />
              Open Scanner
            </Link>
            <button className="text-stone-500 hover:text-stone-800 p-2" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-stone-500 mb-2">
              <Users size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Total Registered</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{stats.totalRegistered}</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-green-600 mb-2">
              <CheckCircle size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Attending</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{stats.totalAttending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-red-500 mb-2">
              <XCircle size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Not Attending</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{stats.totalNotAttending}</p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <div className="flex items-center text-[#556B2F] mb-2">
              <QrCode size={18} className="mr-2" />
              <h3 className="text-sm font-medium">Checked In</h3>
            </div>
            <p className="text-3xl font-bold text-stone-800">{stats.totalCheckedIn}</p>
          </div>
        </div>

        {/* Guest Table */}
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-stone-200 flex justify-between items-center">
            <h2 className="text-xl font-bold text-stone-800">Guest List</h2>
            <ExportCsvButton guests={guests} />
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
                {guests.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-stone-500">
                      No guests registered yet.
                    </td>
                  </tr>
                ) : (
                  guests.map((guest: any) => (
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
                              ? 'bg-[--color-brand-olive]/20 text-[--color-brand-olive-dark]' 
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
