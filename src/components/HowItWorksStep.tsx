import React from 'react'

export const HowItWorksStep = ({ step, title, description }: { step?: number, title?: string, description?: string }) => {
  return (
    <div className="p-4">
      <div className="text-2xl font-bold">{step}</div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default HowItWorksStep
