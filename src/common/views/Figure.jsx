import React, { memo } from 'react'

export const Figure = memo(({ figure }) => {
  if (!figure) {
    return null
  }
  return (
    <img src={figure.image} alt={figure.id} />
  )
})
