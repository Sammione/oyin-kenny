import { Download } from 'lucide-react'

export default function ExportCsvButton({ guests }: { guests: any[] }) {
  const downloadCSV = () => {
    const headers = ['Name,Phone,Attending,Checked In,Registered Date']
    
    const rows = guests.map(guest => {
      const attending = guest.attending ? 'Yes' : 'No'
      const checkedIn = guest.checkedIn ? 'Yes' : 'No'
      const date = new Date(guest.createdAt).toLocaleDateString()
      const name = `"${(guest.name || '').replace(/"/g, '""')}"`
      return `${name},${guest.phone},${attending},${checkedIn},${date}`
    })
    
    const csvContent = [headers, ...rows].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'wedding_guest_list.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button 
      onClick={downloadCSV}
      className="inline-flex items-center text-sm bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-lg transition-colors border border-stone-200 font-medium cursor-pointer"
    >
      <Download size={16} className="mr-2" />
      Export as CSV
    </button>
  )
}
