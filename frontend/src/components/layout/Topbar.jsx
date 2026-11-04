/**
 * Top navigation / header bar.
 *
 * Shows:
 *  - Hamburger menu (mobile)
 *  - Current page title
 *  - UAE local time (live clock)
 *  - Placeholder user avatar / name
 */
import { useState, useEffect } from 'react'
import { Menu, Bell, User, Clock } from 'lucide-react'

/** Format a Date to UAE local time (Asia/Dubai = UTC+4). */
function formatUAETime(date) {
  return date.toLocaleTimeString('en-AE', {
    timeZone: 'Asia/Dubai',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function formatUAEDate(date) {
  return date.toLocaleDateString('en-AE', {
    timeZone: 'Asia/Dubai',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function Topbar({ onMenuClick, title = 'Dashboard' }) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 h-14 px-4 lg:px-6 bg-white border-b border-slate-200">
      {/* Hamburger — mobile only */}
      <button
        className="lg:hidden p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="text-sm font-semibold text-slate-800 tracking-tight">
        {title}
      </h1>

      <div className="ml-auto flex items-center gap-4">
        {/* UAE Clock */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={13} />
          <span>
            {formatUAEDate(now)} · {formatUAETime(now)} GST
          </span>
        </div>

        {/* Notifications placeholder */}
        <button
          className="relative p-1.5 rounded-md text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-green-500" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-200">
            <User size={14} />
          </div>
          <span className="hidden sm:inline font-medium text-xs">Admin</span>
        </button>
      </div>
    </header>
  )
}

