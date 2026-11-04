/**
 * Root application router.
 *
 * All routes are wrapped in <AppShell> which provides the sidebar + topbar.
 * Pages not yet built render <PlaceholderPage>.
 */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import PlaceholderPage from './pages/PlaceholderPage'
import {
  Users,
  Egg,
  Warehouse,
  Package,
  ShoppingCart,
  Receipt,
  Truck,
  FileText,
  CreditCard,
  BarChart3,
} from 'lucide-react'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route
            path="customers"
            element={
              <PlaceholderPage
                title="Customers & Suppliers"
                description="Manage your customers, suppliers, contact details, credit limits and balances."
                icon={Users}
              />
            }
          />
          <Route
            path="products"
            element={
              <PlaceholderPage
                title="Egg Products"
                description="Define egg grades, packaging units (trays, boxes, cartons) and prices."
                icon={Egg}
              />
            }
          />
          <Route
            path="warehouse"
            element={
              <PlaceholderPage
                title="Warehouse Stock"
                description="Track egg inventory by product and packaging unit. Every movement is logged."
                icon={Warehouse}
              />
            }
          />
          <Route
            path="salesman-stock"
            element={
              <PlaceholderPage
                title="Salesman Stock"
                description="Allocate stock to salesmen and track their on-hand inventory separately."
                icon={Package}
              />
            }
          />
          <Route
            path="orders"
            element={
              <PlaceholderPage
                title="Sales Orders"
                description="Create, manage and track customer sales orders through to delivery."
                icon={ShoppingCart}
              />
            }
          />
          <Route
            path="direct-sales"
            element={
              <PlaceholderPage
                title="Direct Sales"
                description="Record walk-in and over-the-counter direct sales transactions."
                icon={Receipt}
              />
            }
          />
          <Route
            path="deliveries"
            element={
              <PlaceholderPage
                title="Deliveries"
                description="Manage delivery schedules, routes and confirmation of delivered orders."
                icon={Truck}
              />
            }
          />
          <Route
            path="invoices"
            element={
              <PlaceholderPage
                title="Invoices"
                description="Generate, view and print customer invoices. Completed invoices are preserved."
                icon={FileText}
              />
            }
          />
          <Route
            path="payments"
            element={
              <PlaceholderPage
                title="Payments"
                description="Record cash, card, bank transfer and credit payments. Track customer balances."
                icon={CreditCard}
              />
            }
          />
          <Route
            path="expenses"
            element={
              <PlaceholderPage
                title="Expenses & Cash Handovers"
                description="Log operational expenses and daily cash handover records."
                icon={Receipt}
              />
            }
          />
          <Route
            path="reports"
            element={
              <PlaceholderPage
                title="Daily Reports"
                description="View daily closing reports, revenue summaries and stock movement logs."
                icon={BarChart3}
              />
            }
          />
          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <PlaceholderPage
                title="Page Not Found"
                description="The page you're looking for doesn't exist yet."
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
