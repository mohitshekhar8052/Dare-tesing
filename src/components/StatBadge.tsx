import React from 'react'

export const StatBadge = ({ value, label, icon }: { value: string, label: string, icon?: string }) => {
  return (
    <div className="px-3 py-2 rounded-lg bg-muted flex items-center gap-3">
      <div className="text-lg">{icon}</div>
      <div>
        <div className="font-bold">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  )
}

export default StatBadge
