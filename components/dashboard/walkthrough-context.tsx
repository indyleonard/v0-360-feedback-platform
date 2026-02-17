"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface WalkthroughContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const WalkthroughContext = createContext<WalkthroughContextType>({
  isOpen: true,
  open: () => {},
  close: () => {},
})

export function useWalkthrough() {
  return useContext(WalkthroughContext)
}

export function WalkthroughProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <WalkthroughContext.Provider value={{ isOpen, open, close }}>
      {children}
    </WalkthroughContext.Provider>
  )
}
