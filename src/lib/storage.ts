import { initialData } from '../data/seed'
import type { AppData } from '../types'

const STORAGE_KEY = 'gokul-jadhav-catering-v1'

export function loadAppData(): AppData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...initialData, ...JSON.parse(stored) } as AppData : initialData
  } catch {
    return initialData
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}