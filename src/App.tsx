import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import RSVP from './pages/RSVP'
import RSVPSuccess from './pages/RSVPSuccess'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminScan from './pages/AdminScan'
import { ErrorBoundary } from './components/ErrorBoundary'

const missingEnv = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY

export default function App() {
  return (
    <ErrorBoundary>
      {missingEnv && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
          background: '#7f1d1d', color: '#fef2f2', padding: '10px 16px',
          fontSize: '13px', textAlign: 'center', fontFamily: 'monospace'
        }}>
          ⚠️ VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Add them in Vercel → Project Settings → Environment Variables.
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/rsvp/success" element={<RSVPSuccess />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/scan" element={<AdminScan />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}
