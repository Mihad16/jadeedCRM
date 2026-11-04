/**
 * Generic placeholder page shown for modules not yet built.
 * Props: title, description, icon (Lucide component)
 */
import { Construction } from 'lucide-react'

export default function PlaceholderPage({ title, description, icon: Icon }) {
  return (
    <div className="max-w-lg mx-auto mt-16 text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-4">
        {Icon ? <Icon size={24} /> : <Construction size={24} />}
      </div>
      <h2 className="text-base font-semibold text-slate-700">{title ?? 'Coming Soon'}</h2>
      <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
        {description ?? 'This module will be built in a future development day.'}
      </p>
      <div className="mt-6 inline-block rounded-full bg-slate-100 text-slate-500 text-xs px-3 py-1 font-medium">
        Under Construction
      </div>
    </div>
  )
}

