/**
 * Root application shell.
 *
 * Layout: fixed sidebar (desktop) + scrollable main area.
 * On mobile, sidebar opens as a drawer triggered by the topbar hamburger.
 */
import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

/** Map route pathnames to human-readable page titles. */
const PAGE_TITLES = {
  '/': 'Dashboard',
  '/customers': 'Customers & Suppliers',
  '/products': 'Egg Products',
  '/warehouse': 'Warehouse Stock',
  '/salesman-stock': 'Salesman Stock',
  '/orders': 'Sales Orders',
  '/direct-sales': 'Direct Sales',
  '/deliveries': 'Deliveries',
  '/invoices': 'Invoices',
  '/payments': 'Payments',
  '/expenses': 'Expenses',
  '/reports': 'Daily Reports',
}

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const title = PAGE_TITLES[location.pathname] ?? 'CRM'

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar
          onMenuClick={() => setSidebarOpen(true)}
          title={title}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

