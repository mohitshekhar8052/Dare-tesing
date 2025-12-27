import React from 'react'

export const FeatureCard = ({ title, children }: { title?: string, children?: React.ReactNode }) => {
  return (
    <div className="soft-card p-6 text-center">
      {title && <h3 className="font-bold mb-2">{title}</h3>}
      <div>{children}</div>
    </div>
  )
}

export default FeatureCard
