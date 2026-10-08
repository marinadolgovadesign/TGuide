import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from './storage'

export type Currency = 'EUR' | 'USD'
/** Fixed demo rate. */
export const EUR_TO_USD = 1.08

const CurrencyContext = createContext<{ currency: Currency; setCurrency: (c: Currency) => void }>({
  currency: 'EUR',
  setCurrency: () => {},
})

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useLocalStorage<Currency>('currency', 'EUR')
  return <CurrencyContext.Provider value={{ currency, setCurrency }}>{children}</CurrencyContext.Provider>
}

export const useCurrency = () => useContext(CurrencyContext)

/** Format a EUR amount in the chosen currency, Figma style: "€1 450". */
export function formatMoney(eur: number, currency: Currency) {
  const amount = Math.round(currency === 'USD' ? eur * EUR_TO_USD : eur)
  const grouped = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${currency === 'USD' ? '$' : '€'}${grouped}`
}

export function useMoney() {
  const { currency } = useCurrency()
  return (eur: number) => formatMoney(eur, currency)
}
