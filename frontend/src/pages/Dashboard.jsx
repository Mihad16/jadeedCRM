/**
 * Dashboard page — Day 1 starter.
 *
 * Shows:
 *  - Summary stat cards (placeholders until modules are built)
 *  - Backend health-check status badge (live API call)
 *  - Quick action tiles
 */
import { useState, useEffect } from 'react'
import {
  Egg,
  Users,
  ShoppingCart,
  TrendingUp,
  Warehouse,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Package,
  CreditCard,
} from 'lucide-react'
import { fetchHealth } from '../api/health'

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({ icon: Icon, label, value, sub, accent = 'green' }) {
  const accents = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-600',
  }
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
      <div className={`flex items-center justify-center w-11 h-11 rounded-lg shrink-0 ${accents[accent]}`}>
        <Icon size={20} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium truncate">{label}</p>
        <p className="text-xl font-bold text-slate-800 leading-tight">{value}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

function QuickAction({ icon: Icon, label, description, to }) {
  return (
    <a
      href={to}
      className="group flex items-center gap-4 bg-white rounded-xl border border-slate-100 p-4 shadow-sm hover:border-green-200 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-50 text-green-600 shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-700 group-hover:text-green-700 transition-colors">
          {label}
        </p>
        <p className="text-xs text-slate-400 truncate">{description}</p>
      </div>
      <ArrowRight size={16} className="text-slate-300 group-hover:text-green-500 shrink-0 transition-colors" />
    </a>
  )
}

function HealthBadge({ health, loading, error }) {
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
        <Loader2 size={12} className="animate-spin" />
        Checking backend…
      </span>
    )
  }
  if (error || !health) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
        <AlertCircle size={12} />
        Backend unreachable
      </span>
    )
  }
  const isOk = health.status === 'ok'
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full ${isOk ? 'text-green-700 bg-green-50' : 'text-amber-700 bg-amber-50'}`}>
      <CheckCircle2 size={12} />
      Backend {isOk ? 'connected' : 'degraded'} · Django {health.django_version} · {health.database.engine.split('.').pop()}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Main Dashboard
// ---------------------------------------------------------------------------
export default function Dashboard() {
  const [health, setHealth] = useState(null)
  const [healthLoading, setHealthLoading] = useState(true)
  const [healthError, setHealthError] = useState(false)

  useEffect(() => {
    fetchHealth()
      .then((res) => setHealth(res.data))
      .catch(() => setHealthError(true))
      .finally(() => setHealthLoading(false))
  }, [])

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Good day 👋</h2>
          <p className="text-sm text-slate-500">
            Here's what's happening at Jadeed Al Jazeera today.
          </p>
        </div>
        <HealthBadge health={health} loading={healthLoading} error={healthError} />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Egg}
          label="Total Eggs in Warehouse"
          value="—"
          sub="Awaiting inventory module"
          accent="green"
        />
        <StatCard
          icon={ShoppingCart}
          label="Open Sales Orders"
          value="—"
          sub="Awaiting sales module"
          accent="blue"
        />
        <StatCard
          icon={Users}
          label="Active Customers"
          value="—"
          sub="Awaiting CRM module"
          accent="amber"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue This Month"
          value="AED —"
          sub="Awaiting finance module"
          accent="slate"
        />
      </div>

      {/* Quick actions */}
      <section>
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <QuickAction
            icon={ShoppingCart}
            label="New Sales Order"
            description="Create a new order for a customer"
            to="/orders"
          />
          <QuickAction
            icon={Package}
            label="Stock Allocation"
            description="Assign stock to a salesman"
            to="/salesman-stock"
          />
          <QuickAction
            icon={Warehouse}
            label="Warehouse Inventory"
            description="View and update warehouse stock"
            to="/warehouse"
          />
          <QuickAction
            icon={Users}
            label="Add Customer"
            description="Register a new customer or supplier"
            to="/customers"
          />
          <QuickAction
            icon={CreditCard}
            label="Record Payment"
            description="Log an incoming payment"
            to="/payments"
          />
          <QuickAction
            icon={TrendingUp}
            label="Daily Report"
            description="View or generate today's closing report"
            to="/reports"
          />
        </div>
      </section>

      {/* System info panel (shown only when backend is reachable) */}
      {health && (
        <section>
          <h3 className="text-sm font-semibold text-slate-700 mb-3">System Information</h3>
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-xs">
              <tbody>
                {[
                  ['Project', health.project],
                  ['Django version', health.django_version],
                  ['Database engine', health.database.engine],
                  ['Database connected', health.database.connected ? '✅ Yes' : '❌ No'],
                  ['Server timezone', health.timezone],
                  ['Debug mode', health.debug ? '⚠️ Enabled' : '✅ Disabled'],
                  ['Server timestamp (UTC)', health.timestamp_utc],
                ].map(([key, val]) => (
                  <tr key={key} className="border-b border-slate-50 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-slate-500 w-48">{key}</td>
                    <td className="px-4 py-2.5 text-slate-700 font-mono">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Placeholder notice */}
      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
        <p className="text-sm text-slate-500 font-medium">Day 1 Setup Complete</p>
        <p className="text-xs text-slate-400 mt-1">
          Modules will be built incrementally across subsequent days.
          Stat cards and tables will populate as data becomes available.
        </p>
      </div>
    </div>
  )
}

