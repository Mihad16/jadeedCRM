/**
 * Sidebar navigation for the CRM.
 *
 * Nav items are grouped by section. Each item maps to a route.
 * Active route is highlighted with a green accent.
 *
 * Props:
 *   isOpen   boolean  — controls mobile drawer visibility
 *   onClose  fn       — called when user taps the backdrop on mobile
 */
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Package,
  Warehouse,
  ShoppingCart,
  Truck,
  FileText,
  CreditCard,
  BarChart3,
  Receipt,
  ChevronRight,
  X,
  Egg,
} from 'lucide-react'

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'People',
    items: [
      { to: '/customers', icon: Users, label: 'Customers & Suppliers' },
    ],
  },
  {
    label: 'Inventory',
    items: [
      { to: '/products', icon: Egg, label: 'Egg Products' },
      { to: '/warehouse', icon: Warehouse, label: 'Warehouse Stock' },
      { to: '/salesman-stock', icon: Package, label: 'Salesman Stock' },
    ],
  },
  {
    label: 'Sales',
    items: [
      { to: '/orders', icon: ShoppingCart, label: 'Sales Orders' },
      { to: '/direct-sales', icon: Receipt, label: 'Direct Sales' },
      { to: '/deliveries', icon: Truck, label: 'Deliveries' },
    ],
  },
  {
    label: 'Finance',
    items: [
      { to: '/invoices', icon: FileText, label: 'Invoices' },
      { to: '/payments', icon: CreditCard, label: 'Payments' },
      { to: '/expenses', icon: Receipt, label: 'Expenses' },
    ],
  },
  {
    label: 'Reports',
    items: [
      { to: '/reports', icon: BarChart3, label: 'Daily Reports' },
    ],
  },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed top-0 left-0 z-30 h-full w-64 flex flex-col',
          'bg-[#0f172a] text-slate-300',
          'transform transition-transform duration-200 ease-in-out',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-700">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-600">
            <Egg size={18} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">Jadeed Al Jazeera</p>
            <p className="text-xs text-slate-400">Egg Trading LLC</p>
          </div>
          {/* Mobile close button */}
          <button
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.items.map(({ to, icon: Icon, label }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={to === '/'}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-green-700/30 text-green-400'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white',
                        ].join(' ')
                      }
                      onClick={onClose}
                    >
                      <Icon size={16} className="shrink-0" />
                      <span className="flex-1">{label}</span>
                      {location.pathname === to && (
                        <ChevronRight size={14} className="text-green-500" />
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-700">
          <p className="text-xs text-slate-500">© 2026 Jadeed Al Jazeera</p>
          <p className="text-xs text-slate-600">v1.0.0 — Day 1</p>
        </div>
      </aside>
    </>
  )
}

